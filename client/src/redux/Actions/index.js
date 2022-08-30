import axios from "axios";
import { setAuthToken } from "../../components/BrowserHistory/setAuthToken";
import * as actions from "./actionTypes";

//SWITCH RENDER//--------------------------------------------------------------
export function switchRenderAction(input) {
  return async (dispatch) => {
    return await dispatch({ type: actions.SWITCH_RENDER, payload: input });
  };
}
//GET ALL ACTIONS//-------------------------------------------------------------
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
//GET DETAIL ACTION//------------------------------------------------------------
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
//GET BY NAME ACTIONS//-----------------------------------------------
export function getUserByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/home/users?name=" + name
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
        "http://localhost:3001/home/pets?name=" + name
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
////POST ACTIONS//----------------------------------------------------------------
export function postPet(id, payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `http://localhost:3001/home/pets/${id}`,
        payload
      );
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

export function postImage(archivo) {
  return async function (dispatch) {
    try {
      let json = await axios.post(`http://localhost:3001/home/images`, archivo);
      return dispatch({
        type: actions.POST_IMAGE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//CLEAR//-----------------------------------------------------------------

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
//UpDate//----------------------------------------------------------------
export function patchUsuer(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `http://localhost:3001/home/users/${payload.id}`,
        payload
      );
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
      let json = await axios.patch(
        `http://localhost:3001/home/pets/${payload.id}`,
        payload
      );
      dispatch({
        type: actions.PATCH_PET,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}
//FILTROS//-----------------------------------------------------
export function filterByQuery(filterParams) {
  return async function (dispatch) {
    let json = await axios.get(
      `http://localhost:3001/home/filters?age=${filterParams.age}&creation_date=${filterParams.creation_date}&vaccinated=${filterParams.vaccinated}&castrated=${filterParams.castrated}&location=${filterParams.location}&pet_type=${filterParams.pet_type}&pet_size=${filterParams.pet_size}&gender=${filterParams.gender}&is_adopted=${filterParams.is_adopted}`
    );
    return dispatch({
      type: actions.FILTER_BY_QUERY,
      payload: json.data,
    });
  };
}

//LOGIN//-----------------------------------------------------
export function userLogin(payload) {
  return async function (dispatch) {
    try {
      let json = await axios
        .post("http://localhost:3001/login", payload)
        .then((response) => {
          const token = response.data.data.token;
          const id = response.data.id.id;
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          setAuthToken(token);
        });
      return dispatch({
        type: actions.USER_LOGIN,
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function userLoginGoogle(payload) {
  return async function (dispatch) {
    try {
      let json = await axios
        .post("http://localhost:3001/logingoogle", payload)
        .then((response) => {
          const token = response.data.data.token;
          const id = response.data.id.id;
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          setAuthToken(token);
        });
      return dispatch({
        type: actions.USER_LOGIN_GOOGLE,
        payload: json.data,
      });
    } catch (error) {}
  };
}

export function getUserProfile(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/home/users/${id}`);
      return dispatch({
        type: actions.GET_USER_PROFILE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//ADOPT---------------
export function tradePet(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(`http://localhost:3001/home/adopt`, payload);
      return dispatch({
        type: actions.ADOPT,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function patchInterestedUsers(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `http://localhost:3001/home/interestedUsers`,
        payload
      );
      dispatch({
        type: actions.INTERESTED_USERS,
        payload: json.data,
      });

      if (json.data.includes("Ya mandaste la solicitud de adopcion")) {
        return "Ya mandaste la solicitud de adopcion";
      } else {
        return "OK";
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function emailAdopt(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `http://localhost:3001/mail/sendemail`,
        payload
      );
      dispatch({
        type: actions.ADOPT_EMAIL,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function paymentMp(idDonor, amountDonation) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/linkpayment/${idDonor}/${amountDonation}`
      );
      return dispatch({
        type: actions.PAYMENT_MP,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

///////////////////////////NOTIFICATIONS-------------------
export function notViewed(payload) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: actions.NOT_VIEWED_NOTIFICATION,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function viewed(view) {
  
  return async function (dispatch) {
    try {
      return dispatch({
        type: actions.VIEWED_NOTIFICATION,
        payload: view,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


//VIEWED --------------------------JUANMA SOS VOS------------
export function viewing(payload){

  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `http://localhost:3001/home/rutajuanmanotivista`,
        payload
      );
      return dispatch({
        type: actions.PATCH_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}