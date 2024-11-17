import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3008",
});

export default axiosConfig;
