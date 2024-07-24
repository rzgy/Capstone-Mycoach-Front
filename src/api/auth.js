import instance from "./index";
import { storeToken } from "./storage";

// Coach api

const loginCoach = async (coachInfo) => {
  console.log("first");
  const { data } = await instance.post("/coaches/login", coachInfo);
  console.log("data");
  storeToken(data.token);
  return data;
};

const register = async (coachInfo) => {
  const formData = new FormData();
  for (const key in coachInfo) formData.append(key, coachInfo[key]);

  const { data } = await instance.post("/coaches/register", formData);
  storeToken(data.token);
  return data;
};

export { loginCoach, register };
