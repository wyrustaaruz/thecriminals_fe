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
    console.log(
      "\x1b[47mREQUEST_LOG_BEGIN:\x1b[0m   \n",
      JSON.stringify(request),
      "\n \x1b[47mREQUEST_LOG_END:\x1b[0m"
    );
    return request;
  });
};

export default myinterceptor;
