import instance from "../index";
import * as SecureStore from "expo-secure-store";

const fetchAllUsers = async () => {
  console.log("resresresrser");
  try {
    const { data } = await instance.get("/users");
    // console.log("coaches", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch Users", error);
    throw error;
  }
};
const fetchOneUser = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await instance.get("/users/myprofile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching athlete data:", error);
    throw error; // Rethrow the error if you want to handle it in the component
  }
};
const fetchOneUserById = async (_id) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await instance.get(`/users/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching athlete data:", error);
    throw error; // Rethrow the error if you want to handle it in the component
  }
};

const deleteUsers = async (userId) => {
  try {
    const { data } = await instance.delete(`/users/${userId}`);
    return data;
  } catch (error) {
    console.error("Failed to delete coach", error);
    throw error;
  }
};

const updateUser = async (userInfo) => {
  const token = localStorage.getItem("token");

  const { data } = await instance.put("/users/myprofile", userInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};

export {
  fetchAllUsers,
  fetchOneUser,
  deleteUsers,
  updateUser,
  fetchOneUserById,
};
