import { POST_DOG } from "./Actions/actions";
import * as actions from "./Actions/index";

const initialState = {
  pets: [],
  users:[]
};

export default function rootReducer(state = initialState, {type,payload}) {
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

    case actions.POST_DOG:
      return {
        ...state,
      };
    case actions.CLEAR_STATE:
      return {
        ...state,
        //ejemplo pets = {} seteas a 0 el estado de nuevo
      };
    default:
      return state;
  }
}
