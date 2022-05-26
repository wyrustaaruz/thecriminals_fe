import axios from "axios";
import { Alert } from "react-native";
import {
  HEADER_URL,
  PROFILE_URL,
  ROBBERY_LIST_URL,
  BANK_TRANSACTION_URL,
  ECZANE_LIST_URL,
  ECZANE_BUY_URL,
  BUILDING_LIST_URL,
  OWN_BUILDING_LIST_URL,
  CLUB_LIST_URL,
  OWN_CLUB_LIST_URL,
  CLUB_ENTER_URL,
  CHARACTER_ITEMS_URL,
  RANDOM_CLUB_LIST_URL,
  TRADER_ITEMS_URL,
  FRIENDSHIP_URL,
  FRIENDSHIP_WAITING_URL,
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
const GetProfile = (userID: number) => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(PROFILE_URL + userID)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_PROFILE",
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
            type: "INTO_JAIL",
            payload: {
              block: null,
              message: "",
            },
          });
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
const GetEczaneList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(ECZANE_LIST_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_ECZANE_LIST",
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

const BuyMedicane = (id: number) => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(ECZANE_BUY_URL + id)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "BUY_MEDICINE_SUCCESS",
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
const GetBuildList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(BUILDING_LIST_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_BUILDINGS",
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
const GetOwnBuildList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(OWN_BUILDING_LIST_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_OWN_BUILDINGS",
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
const GetRandomClubList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(RANDOM_CLUB_LIST_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_RANDOM_CLUBS",
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
const GetClubList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(CLUB_LIST_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_CLUBS",
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
const GetOwnClubList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(OWN_CLUB_LIST_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_OWN_CLUBS",
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
const GetClubItems = (clubId: number) => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(CLUB_ENTER_URL + clubId)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_CLUB_ITEMS",
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
const GetCharacterItems = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(CHARACTER_ITEMS_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_CHARACTER_ITEM_LIST",
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
const GetTraderItems = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(TRADER_ITEMS_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_TRADER_ITEM_LIST",
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

const GetFriendshipList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(FRIENDSHIP_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_FRIENDSHIP_LIST",
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

const GetComingFriendshipList = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
    axios
      .get(FRIENDSHIP_WAITING_URL)
      .then((response) => {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "GET_FRIENDSHIP_WAITING_LIST",
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
  GetProfile,
  GetRobberyList,
  BankAction,
  GetEczaneList,
  BuyMedicane,
  GetBuildList,
  GetOwnBuildList,
  GetRandomClubList,
  GetClubList,
  GetOwnClubList,
  GetClubItems,
  GetCharacterItems,
  GetTraderItems,
  GetFriendshipList,
  GetComingFriendshipList,
};

export default homepageActions;
