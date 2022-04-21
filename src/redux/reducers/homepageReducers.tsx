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
};

const homepageReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_HOMEPAGE":
      return {
        ...state,
        header: action.payload,
      };
    case "GET_ROBBERY_LIST":
      return {
        ...state,
        robberyList: action.payload,
      };
    default:
      return state;
  }
};

export default homepageReducers;
