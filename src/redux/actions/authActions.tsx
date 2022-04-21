import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import {
  CREATE_CHARACTER_URL,
  FORGET_URL,
  LOGIN_URL,
  REGISTER_URL,
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

const MakeRegister = (
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  navigation: any
) => {
  return async (dispatch: any) => {
    axios
      .post(REGISTER_URL, {
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        axios
          .post(CREATE_CHARACTER_URL, { avatar: "avatar_1" })
          .then(() => {
            Alert.alert("Tebrikler", "Başarıyla kayıt oldunuz.", [
              {
                text: "Tamam",
                onPress: () =>
                  navigation.navigate("Login", {
                    registeredEmail: email,
                    registeredPassword: password,
                  }),
              },
            ]);
            dispatch({
              type: "REGISTER",
              payload: "OK",
            });
          })
          .catch((error) => {
            Alert.alert("HATA", "Karakter oluşturulurken bir hata oluştu", [
              { text: "Tamam", onPress: () => null },
            ]);
          });
      })
      .catch((error) => {
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
    axios
      .post(FORGET_URL, {
        email,
      })
      .then((response) => {
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

const authActions = {
  Init,
  MakeLogin,
  MakeRegister,
  ForgetPass,
  Logout,
};

export default authActions;
