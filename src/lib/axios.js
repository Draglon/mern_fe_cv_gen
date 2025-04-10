import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC || "http://localhost:4000",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

export default instance;
