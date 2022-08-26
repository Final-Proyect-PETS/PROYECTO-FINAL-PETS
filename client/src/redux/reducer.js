import * as actions from "./Actions/actionTypes";

const initialState = {
  pets: [],
  users: [],
  userDetail: [], //detail route
  petDetail: [], //detail route
  switchRender: [], //switch
  token: null,
  userProfile: [], //usuario loggeado
  tradePet: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    //SWITCHRENDER
    case actions.SWITCH_RENDER:
      return {
        ...state,
        switchRender: payload,
      };

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
    case actions.POST_IMAGE:
      return {
        ...state,
      };
    //CLEAR
    case actions.CLEAR_STATE:
      return {
        ...state,
        userDetail: {}, //seteas a 0 el estado de nuevo para una nueva peticion
      };
    case actions.CLEAR_STATE_PET:
      return {
        ...state,
        petDetail: {}, //seteas a 0 el estado de nuevo para una nueva peticion
      };
    //UDPDATE
    case actions.PATCH_USER:
      return {
        ...state,
        userDetail: payload,
      };
    case actions.PATCH_PET:
      return {
        ...state,
        petDetail: payload,
      };
    //FILTROS
    case actions.FILTER_BY_QUERY:
      return {
        ...state,
        pets: payload,
      };
    //LOGIN
    case actions.USER_LOGIN:
      return {
        ...state,
      };
    case actions.USER_LOGIN_GOOGLE:
      return {
        ...state,
      };
    case actions.GET_USER_PROFILE:
      return {
        ...state,
        userProfile: payload,
      };
      //ADOPT
      case actions.ADOPT:
        return{
          ...state,
          tradePet:payload
        }
      case actions.ADOPT_EMAIL:
        return{
          ...state,
          userDetail:payload
        }

    default:
      return state;
  }
}
