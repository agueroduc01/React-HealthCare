import axios from "axios";
import _ from "lodash";
import { refreshToken } from "./services/userService";
import jwt_decode from "jwt-decode";
import { userLoginSuccess } from "./store/actions";
// nhờ store này mới dispatch được action userLoginSuccess để update userInfo
import { store } from "./index";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

const createError = (
  httpStatusCode,
  statusCode,
  errorMessage,
  problems,
  errorCode = ""
) => {
  const error = new Error();
  error.httpStatusCode = httpStatusCode;
  error.statusCode = statusCode;
  error.errorMessage = errorMessage;
  error.problems = problems;
  error.errorCode = errorCode + "";
  return error;
};

export const isSuccessStatusCode = (s) => {
  // May be string or number
  const statusType = typeof s;
  return (
    (statusType === "number" && s === 0) ||
    (statusType === "string" && s.toUpperCase() === "OK")
  );
};

instance.interceptors.response.use(
  async (response) => {
    // Thrown error for request with OK status code
    const { data, config } = response;
    if (
      config.url.indexOf("/login") >= 0 ||
      config.url.indexOf("/refreshToken") >= 0
    ) {
      // khong can check 2 route nay
      return response.data;
    }
    const { errCode, errMessage, token } = response.data;
    if (errCode & (errCode === 401)) {
      if (errMessage && errMessage === "jwt expired") {
        console.log("truong hop jwt het han", errMessage);
        let data = jwt_decode(token);
        try {
          const { accessToken } = await refreshToken();
          if (accessToken) {
            data = {
              id: data.id,
              firstName: `${data.name.split(" ")[0]} ${
                data.name.split(" ")[1]
              }`,
              lastName: data.name.split(" ")[2],
              roleId: data.role,
              address: data.address,
              accessToken: accessToken,
            };
            response.headers["Authorization"] = `Bearer ${accessToken}`;
            store.dispatch(userLoginSuccess(data));
            response.data = data;
            return response.data;
          }
        } catch (error) {
          console.error("check error axiosJWT system", error);
        }
      }
    }
    if (
      data.hasOwnProperty("s") &&
      !isSuccessStatusCode(data["s"]) &&
      data.hasOwnProperty("errmsg")
    ) {
      return Promise.reject(
        createError(
          response.status,
          data["s"],
          data["errmsg"],
          null,
          data["errcode"] ? data["errcode"] : ""
        )
      );
    }

    // Return direct data to callback
    if (data.hasOwnProperty("s") && data.hasOwnProperty("d")) {
      return data["d"];
    }
    // Handle special case
    if (data.hasOwnProperty("s") && _.keys(data).length === 1) {
      return null;
    }
    return response.data;
  },
  (error) => {
    const { response } = error;
    if (response == null) {
      return Promise.reject(error);
    }

    const { data } = response;

    if (data.hasOwnProperty("s") && data.hasOwnProperty("errmsg")) {
      return Promise.reject(
        createError(response.status, data["s"], data["errmsg"])
      );
    }

    if (data.hasOwnProperty("code") && data.hasOwnProperty("message")) {
      return Promise.reject(
        createError(
          response.status,
          data["code"],
          data["message"],
          data["problems"]
        )
      );
    }

    return Promise.reject(createError(response.status));
  }
);

export default instance;
