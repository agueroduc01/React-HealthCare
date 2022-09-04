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

const createNewUserService = (data) => {
  return axios.post("/api/v1/create-user", data);
};

const deleteUserService = (id) => {
  return axios.delete("/api/v1/delete-user", { data: { id } });
};

const editUserService = (data) => {
  return axios.put("/api/v1/update-user", data);
};

const getAllCodeService = (type) => {
  return axios.get(`/api/v1/allcode?type=${type}`);
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
};
