import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import {
  CREATE_CHARACTER_URL,
  FORGET_URL,
  LOGIN_URL,
  REGISTER_URL,
  CHARACTER_AVATARS_URL,
} from "../endpoints";

const Init = () => {
  return async (dispatch: any) => {
    let token = await AsyncStorage.getItem("token");
    if (token !== null) {
      dispatch({
        type: "LOGIN",
        payload: token,
      });
    }
  };
};

const MakeLogin = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    let token = null;
    axios
      .post(LOGIN_URL, {
        email,
        password,
      })
      .then((response) => {
        token = response.data.token || "";
        AsyncStorage.setItem("token", token);

        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LOGIN",
          payload: token,
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOADING_FALSE",
        });
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
type AvatarItemType = {
  name: string;
  url: string;
};
const MakeRegister = (
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  navigation: any,
  selectedAvatar: AvatarItemType
) => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    let token = null;
    axios
      .post(REGISTER_URL, {
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
        avatar: selectedAvatar.name,
      })
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        token = response.data.token || "";
        AsyncStorage.setItem("token", token);

        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LOGIN",
          payload: token,
        });
        dispatch({
          type: "REGISTER",
          payload: "OK",
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        console.log("error.response.data", error.response.data);
        if (error.response.data?.errors) {
          if (
            error.response.data?.errors.username &&
            error.response.data?.errors?.username?.length > 0
          ) {
            Alert.alert("HATA", error.response.data.errors.username[0], [
              { text: "Tamam", onPress: () => null },
            ]);
          } else if (
            error.response.data?.errors.email &&
            error.response.data?.errors?.email?.length > 0
          ) {
            Alert.alert("HATA", error.response.data.errors.email[0], [
              { text: "Tamam", onPress: () => null },
            ]);
          } else if (
            error.response.data?.errors.password &&
            error.response.data?.errors?.password?.length > 0
          ) {
            Alert.alert("HATA", error.response.data.errors.password[0], [
              { text: "Tamam", onPress: () => null },
            ]);
          } else if (
            error.response.data?.errors.avatar &&
            error.response.data?.errors?.avatar?.length > 0
          ) {
            Alert.alert("HATA", error.response.data.errors.avatar[0], [
              { text: "Tamam", onPress: () => null },
            ]);
          }
        } else if (error.response.data.message) {
          Alert.alert("HATA", error.response.data.message, [
            { text: "Tamam", onPress: () => null },
          ]);
        }
      });
  };
};

const ForgetPass = (email: string, navigation: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .post(FORGET_URL, {
        email,
      })
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        Alert.alert("Başarılı", "Mail adresinizi kontrol ediniz.", [
          {
            text: "Tamam",
            onPress: () =>
              navigation.navigate("Login", {
                registeredEmail: email,
              }),
          },
        ]);
        dispatch({
          type: "REGISTER",
          payload: "OK",
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        if (
          error.response.data?.errors &&
          error.response.data?.errors.email &&
          error.response.data?.errors?.email?.length > 0
        ) {
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

const Logout = () => {
  return async (dispatch: any) => {
    await AsyncStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
  };
};

const GetAvatars = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(CHARACTER_AVATARS_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "CHARACTER_AVATARS",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        if (error.response.data.message) {
          Alert.alert("HATA", error.response.data.message, [
            { text: "Tamam", onPress: () => null },
          ]);
        }
      });
  };
};

const authActions = {
  Init,
  MakeLogin,
  MakeRegister,
  ForgetPass,
  Logout,
  GetAvatars,
};

export default authActions;
