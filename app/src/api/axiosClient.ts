import axios from "axios";
import * as process from "process";

const baseURL = `${process.env.API_URL ?? import.meta.env.VITE_API_URL}:${process.env.API_PORT ?? import.meta.env.VITE_API_PORT}/api`;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosClient;
