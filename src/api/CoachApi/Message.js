import { instance } from "../index";

const sendMessage = async (message) => {
  try {
    const { data } = await instance.post("/message/add", message);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { sendMessage };
