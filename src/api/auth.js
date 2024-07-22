import instance from "./index";
import { storeToken } from "./storage";

// Coach api

const fetchAllCoaches = async () => {
  try {
    const { data } = await instance.get("/coaches");
    return data;
  } catch (error) {
    console.error("Failed to fetch Coaches", error);
    throw error;
  }
};

const fetchOneCoaches = async () => {
  const token = localStorage.getItem("token");
  const { data } = await instance.get("/coaches/myprofile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

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

const deleteCoaches = async (coachId) => {
  try {
    const { data } = await instance.delete(`/coaches/${coachId}`);
    return data;
  } catch (error) {
    console.error("Failed to delete coach", error);
    throw error;
  }
};

const updateCoach = async (coachInfo) => {
  const token = localStorage.getItem("token");

  const { data } = await instance.put("/coaches/myprofile", coachInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};

export {
  fetchAllCoaches,
  fetchOneCoaches,
  loginCoach,
  register,
  deleteCoaches,
  updateCoach,
};
