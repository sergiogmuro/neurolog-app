import axios from "axios";
import * as process from "process";

const baseURL = `${import.meta.env.VITE_API_HOST}${import.meta.env.VITE_API_PORT || import.meta.env.VITE_API_PORT != 80 ? `:${import.meta.env.VITE_API_PORT}` : ''}/api`;
console.log(baseURL)
const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosClient;
