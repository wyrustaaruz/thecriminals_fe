import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../redux/endpoints";

const myinterceptor = async () => {
  await axios.interceptors.request.use(async (request) => {
    request.url = API_URL + request.url;
    const myToken = await AsyncStorage.getItem("token");
    if (myToken) {
      const token = "Bearer " + myToken;
      request.headers = {
        Authorization: token,
      };
    }
    return request;
  });
};

export default myinterceptor;
