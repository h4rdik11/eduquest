import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3008",
  // baseURL: "https://eduquest-j0w9.onrender.com",
});

export default axiosConfig;
