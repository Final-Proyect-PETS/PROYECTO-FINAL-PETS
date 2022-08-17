import * as actions from "./Actions/actionTypes";

const initialState = {
  pets: [],
  users: [],
  userDetail: [],//detail route
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.GET_ALL_PETS:
      return {
        ...state,
        pets: payload,
      };

    case actions.GET_BY_NAME:
      return {
        ...state,
        pets: payload,
      };

    case actions.GET_USER_DETAIL:
      return {
        ...state,
        userDetail: payload,
      };
    case actions.POST_PET:
      return {
        ...state,
      };

    case actions.POST_USER:
      return {
        ...state,
      };

    case actions.CLEAR_STATE:
      return {
        ...state,
        userDetail : {} //seteas a 0 el estado de nuevo para una nueva peticion
      }; 

    default:
      return state;
  }
}
