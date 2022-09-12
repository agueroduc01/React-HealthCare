import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/v1/login", { email, password });
};

const handleLogoutApi = (accessToken) => {
  return axios.post(
    "/api/v1/logout",
    {},
    {
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );
};

const getAllUsers = (accessToken) => {
  return axios.get("/api/v1/users", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
};

const getAUser = (id) => {
  return axios.get(`/api/v1/user/?id=${id}`);
};

const createNewUserService = (data, accessToken) => {
  return axios.post("/api/v1/create-user", data, {
    headers: { authorization: `Bearer ${accessToken}` },
  });
};

const deleteUserService = (id, accessToken) => {
  return axios.delete("/api/v1/delete-user", {
    data: { id },
    headers: { authorization: `Bearer ${accessToken}` },
  });
};

const editUserService = (data, accessToken) => {
  return axios.put("/api/v1/update-user", data, {
    headers: { authorization: `Bearer ${accessToken}` },
  });
};

const getAllCodeService = (type) => {
  return axios.get(`/api/v1/allcode?type=${type}`);
};

const getDoctorHomeService = (limit) => {
  return axios.get(`/api/v1/doctor-home?limit=${limit}`);
};

const refreshToken = async () => {
  return axios.post(`/api/v1/refreshToken`, {
    withCredentials: true,
  });
};

export {
  handleLoginApi,
  handleLogoutApi,
  getAllUsers,
  getAUser,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getDoctorHomeService,
  refreshToken,
};
