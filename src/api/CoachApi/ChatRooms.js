import instance from "..";
import { getToken } from "../storage";

const getAllChatRooms = async () => {
  try {
    const { data } = await instance.get("/chat");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getChatRoombyID = async (id) => {
  try {
    const { data } = await instance.get(`/chat/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createChatRoom = async ({ toCoachId, message }) => {
  const response = await instance.post(`/chat/${toCoachId}`, { message });
  return response.data;
};

export { getAllChatRooms, getChatRoombyID, createChatRoom };
