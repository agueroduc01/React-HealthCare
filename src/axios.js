import axios from "axios";
import _ from "lodash";
import { refreshToken } from "./services/userService";
import jwt_decode from "jwt-decode";
import { userLoginSuccess } from "./store/actions";
// nhờ store này mới dispatch được action userLoginSuccess để update userInfo
import { store } from "./index";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  proxy: process.env.REACT_APP_BACKEND_URL,
});

// const CancelToken = axios.CancelToken;

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

instance.interceptors.request.use(
  async (config) => {
    // const CancelToken = axios.CancelToken;
    if (
      config.url.indexOf("/login") >= 0 ||
      // config.url.indexOf("/home") >= 0 ||
      // config.url.indexOf("/doctor-home?limit=") >= 0 ||
      store.getState().user.isLoggedIn === false ||
      config.url.indexOf("/refreshToken") >= 0
    ) {
      console.log(store.getState());
      return {
        ...config,
        // , data
      };
    }
    console.log("config.url", config.url);
    // store.subscribe(async () => {
    let tokenTest = store.getState().user.userInfo.accessToken;
    let dataTest = jwt_decode(tokenTest);
    let timeNow = new Date().getTime();
    if (dataTest.exp < timeNow / 1000) {
      try {
        const { accessToken } = await refreshToken();
        if (accessToken) {
          const data = {
            id: dataTest.id,
            firstName: `${dataTest.name.split(" ")[0]} ${
              dataTest.name.split(" ")[1]
            }`,
            lastName: dataTest.name.split(" ")[2],
            roleId: dataTest.role,
            address: dataTest.address,
            accessToken: accessToken,
          };
          config.headers["Authorization"] = `Bearer ${accessToken}`;
          await store.dispatch(userLoginSuccess(data));
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    // });
    return {
      ...config,
    };
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  async (response) => {
    console.log("response from axios", response);
    response.data = {
      ...response.data,
    };
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
