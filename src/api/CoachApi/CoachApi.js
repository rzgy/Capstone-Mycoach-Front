import instance from "../index";
import * as SecureStore from "expo-secure-store";

const searchCoach = async (query) => {
  try {
    const { data } = await instance.post("/coaches/search", query);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const fetchAllCoaches = async () => {
  try {
    const { data } = await instance.get("/coaches");
    return data;
  } catch (error) {
    console.error("Failed to fetch Coaches", error);
    throw error;
  }
};

const fetchOneCoach = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await instance.get("/coaches/myprofile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching coach data:", error);
    throw error; // Rethrow the error if you want to handle it in the component
  }
};

const fetchOneCoachById = async (_id) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await instance.get(`/coaches/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching coach data:", error);
    throw error; // Rethrow the error if you want to handle it in the component
  }
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
  return data;
};

export {
  fetchAllCoaches,
  fetchOneCoach,
  deleteCoaches,
  updateCoach,
  fetchOneCoachById,
  searchCoach,
};
