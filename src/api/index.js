import axios from "axios";
import { getToken } from "./storage";
import { io } from "socket.io-client";

export const BASE_URL = "http://172.20.10.9:8000";
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

export const socket = io("http://172.20.10.9:3000", {
  autoConnect: false,
});

export default instance;
