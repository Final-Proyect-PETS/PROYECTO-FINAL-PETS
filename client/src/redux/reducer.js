import * as actions from "./Actions/actionTypes";

const initialState = {
  pets: [],
  users: [],
  userDetail: [], //detail route
  petDetail: [], //detail route
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    //GET ALL
    case actions.GET_ALL_PETS:
      return {
        ...state,
        pets: payload,
      };
    case actions.GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };

    //GET BY NAME
    case actions.GET_USER_BY_NAME:
      return {
        ...state,
        users: payload,
      };
    case actions.GET_PET_BY_NAME:
      return {
        ...state,
        pets: payload,
      };

    //GET DETAIL
    case actions.GET_USER_DETAIL:
      return {
        ...state,
        userDetail: payload,
      };
    case actions.GET_PET_DETAIL:
      return {
        ...state,
        petDetail: payload,
      };

    //POSTS
    case actions.POST_PET:
      return {
        ...state,
      };
    case actions.POST_USER:
      return {
        ...state,
      };
    //CLEAR
    case actions.CLEAR_STATE:
      return {
        ...state,
        userDetail: {}, //seteas a 0 el estado de nuevo para una nueva peticion
      };

    default:
      return state;
  }
}
