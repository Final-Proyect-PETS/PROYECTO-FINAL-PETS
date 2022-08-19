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
      //UDPDATE
      case actions.PATCH_USER:
      return{
         ...state,
         userDetail:payload
      }
    //FILTROS
    case actions.FILTER_BY_QUERY:
      return {
        ...state,
        pets: payload
      }
      /* case actions.SORT_BY_DATE:
        const date = payload === "asc" ? state.pets.sort(function(a, b) {
          if (a.createdAt > b.createdAt){
            return 0
          }
          if(b.createdAt > a.createdAt){
            return -1
          }
          return 0
        }) : state.pets.sort(function (a,b){
          if (a.createdAt > b.createdAt){
            return -1
          }
          return 0
        })
        return {
          ...state,
          pets: date
        }
        case actions.SORT_BY_AGE:
          /* if(payload === "desc"){
               const data = state.pets.sort((a, b) => b.age - a.age)
               return {
                ...state,
                pets: data
               }
              }
            if(payload === "asc"){
              const data = state.pets.sort((a, b) => a.age - b.age)
              return {
                ...state,
                pets: data
              }
            } */
            /* const age = payload === "asc" ? state.pets.sort(function(a, b) {
              if (a.age > b.age){
                return 1
              }
              if(b.age > a.age){
                return -1
              }
              return 0
            }) : state.pets.sort(function (a,b){
              if (a.age > b.age){
                return -1
              }
              return 0
            })
            return {
              ...state,
              pets: age,
            } 
            const sortAge = payload === 'asc' ?
            state.pets.sort(function (a, b) {
                if (a.age > b.age) {
                    return 1
                }
                if (b.age > a.age) {
                    return -1
                }
                return 0
            }) :
            state.pets.sort(function (a, b) {
                if (a.age > b.age) {
                    return -1
                }
                if (b.age > a.age) {
                    return 1
                }
                return 0
            })
        return {
            ...state,
            pets: sortAge
        } */
       default:
      return state
    }
}