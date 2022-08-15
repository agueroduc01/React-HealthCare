import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/v1/login", { email, password });
};

const getAllUsers = () => {
  return axios.get("/api/v1/users");
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
  getAllUsers,
  getAUser,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
};
