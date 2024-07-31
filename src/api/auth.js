import instance from "./index";
import { storeToken } from "./storage";

// Coach api

const loginCoach = async (coachInfo) => {
  const { data } = await instance.post("/coaches/login", coachInfo);
  storeToken(data.token, "coach");
  return data;
};

const registerCoach = async (coachInfo) => {
  const formData = new FormData();
  for (const key in coachInfo) formData.append(key, coachInfo[key]);

  const { data } = await instance.post("/coaches/register", formData);
  storeToken(data.token, "coach");
  return data;
};

// User Api

const loginUser = async (userInfo) => {
  const { data } = await instance.post("/users/login", userInfo);

  storeToken(data.token, "athlete");

  return data;
};

const registerUser = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post("/users/register", formData);
  storeToken(data.token, "athlete");
  return data;
};
export { loginCoach, registerCoach, loginUser, registerUser };
