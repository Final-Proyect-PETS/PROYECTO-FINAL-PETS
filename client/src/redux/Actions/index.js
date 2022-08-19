import axios from "axios";
import * as actions from "./actionTypes";

//GET ALL ACTIONS//------------------------------------------------------------------
export function getAllUsers () {
  return async (dispatch) => {
    return await axios
      .get("http://localhost:3001/users")
      .then((json) =>
        dispatch({ type: actions.GET_ALL_USERS, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
export function getAllPets () {
  return async (dispatch) => {
    return await axios
      .get("http://localhost:3001/pets")
      .then((json) =>
        dispatch({ type: actions.GET_ALL_PETS, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
//GET DETAIL ACTION//-----------------------------------------------------
export function getUserDetail(id) {
  console.log(id,"ID LLEGADO A ACTION")
  return async (dispatch) => {
    return await axios
      .get(`http://localhost:3001/users/${id}`)
      .then((json) =>
        dispatch({ type: actions.GET_USER_DETAIL, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
export function getPetDetail(id) {
  return async (dispatch) => {
    return await axios
      .get(`http://localhost:3001/pets/${id}`)
      .then((json) =>
        dispatch({ type: actions.GET_PET_DETAIL, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
//GET BY NAME ACTIONS//----------------------------------
export function getUserByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/users?name=" + name
      );
      return dispatch({
        type: actions.GET_USER_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error en getUSERBYname");
    }
  };
}
export function getPetByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/pets?name=" + name
      );
      return dispatch({
        type: actions.GET_PET_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error en getPETBYname");
    }
  };
}
////POST ACTIONS//---------------------------------------------------------------------------
export function postPet(payload, id) {
  return async function (dispatch) {
    try {
      let json = await axios.post(`http://localhost:3001/pets/${id}`, payload);
      return dispatch({
        type: actions.POST_PET,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postUser(payload) {
  console.log(payload,"payload arriba del dispatch")
  return async function (dispatch) {
    try {
    
      let json = await axios.post(`http://localhost:3001/users`, payload);
      return dispatch({
        type: actions.POST_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//CLEAR//-------------------------------------------------------------------------------------------------------------------
export function clearState(payload) {
  return {
    type: actions.CLEAR_STATE,
    payload,
  };
}
//FILTROS//------------------
export function sortAscAge(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/bySortAge`);
      return dispatch({
        type: actions.SORT_ASC_AGE,
        payload: json.data
    })
  }
}

export function sortDescAge(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/bySortAge2`);
      return dispatch({
        type: actions.SORT_DESC_AGE,
        payload: json.data
    })
  }
}

export function sortDescCreated(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/bySortDate2`);
      return dispatch({
        type: actions.SORT_DESC_CREATED,
        payload: json.data
    })
  }
}

export function sortAscCreated(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/bySortDate`);
      return dispatch({
        type: actions.SORT_ASC_CREATED,
        payload: json.data
    })
  }
}

export function filterByVaccination(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/filterByVaccination?vaccination=${payload}`);
      return dispatch({
        type: actions.FILTER_BY_VACCINATION,
        payload: json.data
    })
  }
}

export function filterByType(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/filterByType?type=${payload}`);
      return dispatch({
        type: actions.FILTER_BY_TYPE,
        payload: json.data
    })
  }
}

export function filterBySize(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/filterBySize?size=${payload}`);
      return dispatch({
        type: actions.FILTER_BY_SIZE,
        payload: json.data
    })
  }
}

export function filterByCastrated(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/filterByCastrated?castrated=${payload}`);
      return dispatch({
        type: actions.FILTER_BY_CASTRAED,
        payload: json.data
    })
  }
}

export function filterByPlace(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/filterByPlace?place=${payload}`);
      return dispatch({
        type: actions.FILTER_BY_PLACE,
        payload: json.data
    })
  }
}

export function filterByAge(payload){
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/filterByAge?age=${payload}`);
      return dispatch({
        type: actions.FILTER_BY_AGE,
        payload: json.data
    })
  }
}
