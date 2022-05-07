import axios from "axios";
import { Alert } from "react-native";
import {
  HEADER_URL,
  ROBBERY_LIST_URL,
  BANK_TRANSACTION_URL,
  HOSPITAL_LIST_URL,
} from "../endpoints";

const GetHeader = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(HEADER_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_HOMEPAGE",
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

const GetRobberyList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(ROBBERY_LIST_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        if (response.data.block) {
          dispatch({
            type: "INTO_JAIL",
            payload: response.data,
          });
        } else {
          dispatch({
            type: "GET_ROBBERY_LIST",
            payload: response.data,
          });
        }
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
const GetHospitalList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(HOSPITAL_LIST_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        if (response.data.block) {
          dispatch({
            type: "INTO_JAIL",
            payload: response.data,
          });
        } else {
          const myData = response.data;
          myData.map((item: any) => {
            item.label = item.name;
          });
          dispatch({
            type: "GET_HOSPITAL_LIST",
            payload: myData,
          });
        }
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

const BankAction = (amount: string, operation: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .post(BANK_TRANSACTION_URL, {
        amount,
        operation,
      })
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });

        dispatch({
          type: "BANK_TRANSACTION_COMPLETE",
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

const homepageActions = {
  GetHeader,
  GetRobberyList,
  BankAction,
  GetHospitalList,
};

export default homepageActions;
