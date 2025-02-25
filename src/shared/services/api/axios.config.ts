import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:7077" });

export default axiosInstance;
