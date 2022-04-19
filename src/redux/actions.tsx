import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const Init = () => {
  return async (dispatch: any) => {
    let token = await AsyncStorage.getItem("token");
    if (token !== null) {
      console.log("token fetched");
      dispatch({
        type: "LOGIN",
        payload: token,
      });
    }
  };
};

export const MakeLogin = (email: string, password: string) => {
  return async (dispatch: any) => {
    let token = null;
    axios
      .post("https://thecriminals.yazilim.online/api/v1/login", {
        email,
        password,
      })
      .then((response) => {
        token = response.data.token || "";
        AsyncStorage.setItem("token", token);
        console.log("token stored");
        dispatch({
          type: "LOGIN",
          payload: token,
        });
      })
      .catch((error) => {
        if (error.response.data?.errors?.email.length > 0) {
          Alert.alert("HATA", error.response.data.errors.email[0], [
            { text: "Tamam", onPress: () => null },
          ]);
        } else if (error.response.data.message) {
          Alert.alert("HATA", error.response.data.message, [
            { text: "Tamam", onPress: () => null },
          ]);
        }
      });
  };
};

export const Logout = () => {
  return async (dispatch: any) => {
    await AsyncStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
  };
};
