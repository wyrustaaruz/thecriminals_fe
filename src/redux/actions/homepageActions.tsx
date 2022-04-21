import axios from "axios";
import { Alert } from "react-native";
import { HEADER_URL, ROBBERY_LIST_URL } from "../endpoints";

const GetHeader = () => {
  return async (dispatch: any) => {
    axios
      .get(HEADER_URL)
      .then((response) => {
        dispatch({
          type: "GET_HOMEPAGE",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("err", error);
        if (error.response.data.message) {
          Alert.alert("HATA", error.response.data.message, [
            { text: "Tamam", onPress: () => null },
          ]);
        }
      });
  };
};

const GetRobberyList = () => {
  return async (dispatch: any) => {
    axios
      .get(ROBBERY_LIST_URL)
      .then((response) => {
        dispatch({
          type: "GET_ROBBERY_LIST",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("err", error);
        if (error.response.data.message) {
          Alert.alert("HATA", error.response.data.message, [
            { text: "Tamam", onPress: () => null },
          ]);
        }
      });
  };
};

const homepageActions = {
  GetHeader,
  GetRobberyList,
};

export default homepageActions;
