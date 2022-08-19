import * as actions from "./Actions/actionTypes";

const initialState = {
  pets: [],
  users: [],
  userDetail: [], //detail route
  petDetail: [], //detail route
  filtros: [],
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
        
    //FILTROS
    case actions.SORT_ASC_AGE:
      return {
        ...state,
        pets: payload
      }
    case actions.SORT_DESC_AGE:
      return {
        ...state,
        pets: payload
      }
      case actions.SORT_ASC_CREATED:
        return {
          ...state,
          pets: payload
        }
      case actions.SORT_DESC_CREATED:
        return {
          ...state,
          pets: payload
        }
        case actions.FILTER_BY_PLACE:
          return {
            ...state,
            pets: payload 
        }
      case actions.FILTER_BY_TYPE:
          return {
            ...state,
            pets: payload
          }
      case actions.FILTER_BY_CASTRAED:
          console.log(payload)
          return {
            ...state,
            filtros: payload
          }

      case actions.FILTER_BY_VACCINATION:
        /* const allPets = state.pets;
        const filtros = state.filtros
        const filter = filtros.length > 0 ? filtros.filter((pet) =>{
            return pet.hasOwnProperty(payload)
          }) : allPets.filter((pet) =>{
            return pet.hasOwnProperty(payload)
          }); */
          console.log(payload)
        return {
          ...state,
          pets: payload
        }

      case actions.FILTER_BY_SIZE:
        return {
          ...state,
          pets: payload
        }

      case actions.FILTER_BY_AGE:
        return {
          ...state,
          pets: payload
        }
       default:
      return state
    }
}