import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/v1/login", { email, password });
};

const getAllUsers = () => {
  return axios.get("/api/v1/users");
};

export { handleLoginApi, getAllUsers };
