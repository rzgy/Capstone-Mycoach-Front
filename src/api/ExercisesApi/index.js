import instance from "..";

const createExercise = async (_id, info) => {
  const { data } = await instance.post(`/exercises/create/${_id}`, info);
  return data;
};

const getUserExercises = async (_id) => {
  const { data } = await instance.get(`/exercises/${_id}`);
  return data;
};

const updateExercise = async (info) => {
  const { data } = await instance.put(`/exercises/update/${info.id}`, info);
  return data;
};

const deleteExercise = async (id) => {
  const { data } = await instance.delete(`/exercises/delete/${id}`);
  return data;
};

export { createExercise, getUserExercises, updateExercise, deleteExercise };
