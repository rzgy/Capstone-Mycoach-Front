import axios from "axios";
import { getToken } from "./storage";

export const BASE_URL = "http://192.168.0.117:8000";
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
