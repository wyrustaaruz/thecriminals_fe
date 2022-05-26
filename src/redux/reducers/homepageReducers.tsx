const initialState = {
  header: {
    id: 0,
    user_id: 0,
    avatar: "https://thecriminals.yazilim.online/images/avatars/avatar_1.png",
    stamina: 0,
    intelligence: 0,
    strength: 0,
    charisma: 0,
    tolerance: 0,
    health: 0,
    max_health: 0,
    addiction: 0,
    spirit: 0,
    respect: 0,
    cash: 0,
    weapon: 0,
    armor: 0,
    guard: 0,
    gender: "",
    bank_cash: 0,
    kill: 0,
    play_time: 0,
    visitors: 0,
    country: "",
    birthday: "",
    bio: "",
    block: 0, //0 normal, 1 jail, 2 hospital
    block_expire: null,
    user: { username: "", credits: 0 },
  },
  robberyList: [],
  eczaneList: [],
  jailStatus: {
    block: null,
    message: "",
  },
  transactionStatus: {
    message: "",
  },
  profile: {
    avatar: "",
    gender: "",
    respect: 0,
    kill: 0,
    play_time: 0,
    visitors: 0,
    country: "",
    birthday: "",
    bio: "",
    created_at: "",
  },
  buildList: [],
  ownBuildList: [],
  randomClubList: [],
  clubList: [],
  ownClubList: [],
  clubItems: [],
  characterItemList: [],
  traderItemList: [],
  friendshipList: [],
  friendshipWaitList: [],
};

const homepageReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_HOMEPAGE":
      return {
        ...state,
        header: action.payload,
      };
    case "GET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "INTO_JAIL":
      return {
        ...state,
        jailStatus: action.payload,
      };
    case "GET_ROBBERY_LIST":
      return {
        ...state,
        robberyList: action.payload,
      };
    case "GET_ECZANE_LIST":
      return {
        ...state,
        eczaneList: action.payload,
      };
    case "BANK_TRANSACTION_COMPLETE":
      return {
        ...state,
        transactionStatus: action.payload,
      };
    case "GET_BUILDINGS":
      return {
        ...state,
        buildList: action.payload,
      };
    case "GET_OWN_BUILDINGS":
      return {
        ...state,
        ownBuildList: action.payload,
      };
    case "GET_CLUBS":
      return {
        ...state,
        clubList: action.payload,
      };
    case "GET_OWN_CLUBS":
      return {
        ...state,
        ownClubList: action.payload,
      };
    case "GET_CLUB_ITEMS":
      return {
        ...state,
        clubItems: action.payload,
      };
    case "GET_RANDOM_CLUBS":
      return {
        ...state,
        randomClubList: action.payload,
      };
    case "GET_CHARACTER_ITEM_LIST":
      return {
        ...state,
        characterItemList: action.payload,
      };
    case "GET_TRADER_ITEM_LIST":
      return {
        ...state,
        traderItemList: action.payload,
      };
    case "GET_FRIENDSHIP_LIST":
      return {
        ...state,
        friendshipList: action.payload,
      };
    case "GET_FRIENDSHIP_WAITING_LIST":
      return {
        ...state,
        friendshipWaitList: action.payload,
      };
    default:
      return state;
  }
};

export default homepageReducers;
