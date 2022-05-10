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
  robberyList: [
    {
      name: "",
      power: 0,
      required_stamina_percent: 0,
      daily: 0,
      reward_cash_min: 0,
      reward_cash_max: 0,
      attr_min: 0,
      attr_max: 0,
      percent: 0,
    },
  ],
  eczaneList: [
    {
      value: 0,
      name: "",
      attr: "",
      attr_value: 1,
      price: 0,
    },
  ],
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
    default:
      return state;
  }
};

export default homepageReducers;
