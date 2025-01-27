import instance from "../index";

const fetchAllCoaches = async () => {
  console.log("resresresrser");
  try {
    const { data } = await instance.get("/coaches");
    // console.log("coaches", data);
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

export { fetchAllCoaches, fetchOneCoaches, deleteCoaches, updateCoach };
