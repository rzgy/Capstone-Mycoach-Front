import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "http://192.168.0.117:8000",
});

instance.interceptors.request.use(async (config) => {
  console.log("first333");
  const token = await getToken();
  console.log("first444");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
