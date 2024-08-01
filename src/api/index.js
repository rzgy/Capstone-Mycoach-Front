import axios from "axios";
import { getToken } from "./storage";
import { io } from "socket.io-client";

export const BASE_URL = "http://192.168.2.89:8000";
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

export const socket = io("http://192.168.2.89:3000", {
  autoConnect: false,
});

export default instance;
