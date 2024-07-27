import instance from "../index";

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
  const token = localStorage.getItem("token");
  const { data } = await instance.get("/users/myprofile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
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

export { fetchAllUsers, fetchOneUser, deleteUsers, updateUser };
