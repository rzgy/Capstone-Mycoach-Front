import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";

const storeToken = async (token, name) => {
  await SecureStore.setItemAsync("token", token);
  await SecureStore.setItemAsync("name", name);
};

const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};
const getName = async () => {
  return await SecureStore.getItemAsync("name");
};

const removeToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

const checkToken = async () => {
  const token = await getToken();
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      removeToken();
      return false;
    }
    return true;
  }
  return false;
};

export { storeToken, getToken, removeToken, checkToken, getName };
