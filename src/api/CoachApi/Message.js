import instance from "..";

const sendMessage = async (messageInfo) => {
  console.log(messageInfo);
  try {
    const { data } = await instance.post("/message/add", messageInfo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (userId) => {
  try {
    const { data } = await instance.get(`/message/getMessages/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMessagesUser = async (userId) => {
  try {
    const { data } = await instance.get(`/message/getMessagesUser/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { sendMessage, getMessages, getMessagesUser };
