const initialState = {
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
};

const homepageReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_HOMEPAGE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default homepageReducers;
