import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://api:9000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosClient;
