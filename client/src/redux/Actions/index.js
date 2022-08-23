import axios from "axios";
import { setAuthToken } from "../../components/BrowserHistory/setAuthToken"

import * as actions from "./actionTypes";
//SWITCH RENDER//---------------------------------------------------
export function switchRenderAction(input) {
  return async (dispatch) => {
    return await dispatch({ type: actions.SWITCH_RENDER, payload: input });
  };
}
//GET ALL ACTIONS//------------------------------------------------------------------
export function getAllUsers() {
  return async (dispatch) => {
    return await axios
      .get("http://localhost:3001/home/users")
      .then((json) =>
        dispatch({ type: actions.GET_ALL_USERS, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
export function getAllPets() {
  return async (dispatch) => {
    return await axios
      .get("http://localhost:3001/home/pets")
      .then((json) =>
        dispatch({ type: actions.GET_ALL_PETS, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
//GET DETAIL ACTION//-----------------------------------------------------
export function getUserDetail(id) {
  return async (dispatch) => {
    return await axios
      .get(`http://localhost:3001/home/users/${id}`)
      .then((json) =>
        dispatch({ type: actions.GET_USER_DETAIL, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
export function getPetDetail(id) {
  return async (dispatch) => {
    return await axios
      .get(`http://localhost:3001/home/pets/${id}`)
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
      var json = await axios.get("http://localhost:3001/home/users?name=" + name);
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
      var json = await axios.get("http://localhost:3001/home/pets?name=" + name);
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

//Ferri dice: anda asi: export function postPet(id, payload) {

export function postPet(id, payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(`http://localhost:3001/home/pets/${id}`, payload);
      dispatch({
        type: actions.POST_PET,
        payload: json.data,
      });
      return "Mascota creada correctamente";
    } catch (error) {
      console.log(error);
      return "Error de server, no se pudo crear la mascota, intente más tarde";
    }
  };
}
export function postUser(payload) {
  console.log(payload, "payload arriba del dispatch");
  return async function (dispatch) {
    try {
      let json = await axios.post(`http://localhost:3001/register`, payload);
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
export function clearStatePet(payload) {
  return {
    type: actions.CLEAR_STATE_PET,
    payload,
  };
}
//UpDate//------------------------------------------------------------------------------------------------------------------
export function patchUsuer(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(`http://localhost:3001/users/${payload.id}`, payload);
      return dispatch({
        type: actions.PATCH_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function patchPet(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(`http://localhost:3001/pets/${payload.id}`, payload);
      return dispatch({
        type: actions.PATCH_PET,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//FILTROS//------------------
export function filterByQuery(filterParams) {
  return async function (dispatch) {
    let json = await axios.get(
      `http://localhost:3001/home/filters?age=${filterParams.age}&creation_date=${filterParams.creation_date}&vaccinated=${filterParams.vaccinated}&castrated=${filterParams.castrated}&location=${filterParams.location}&pet_type=${filterParams.pet_type}&pet_size=${filterParams.pet_size}&gender=${filterParams.gender}`
    );
    return dispatch({
      type: actions.FILTER_BY_QUERY,
      payload: json.data,
    });
  };
}

//LOGIN//--------------------
export function userLogin(payload) {
  return async function (dispatch) {
    console.log(payload)
    try {
      let json = await axios.post("http://localhost:3001/login", payload).then((response) => {
        const token = response.data.data.token
        const id = response.data.id.id
        localStorage.setItem("token", token);
        localStorage.setItem("id", id)
        setAuthToken(token);
      })
      return dispatch({
        type: actions.USER_LOGIN,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getUserProfile(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/home/users/${id}`)
      return dispatch({
        type: actions.GET_USER_PROFILE,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}
