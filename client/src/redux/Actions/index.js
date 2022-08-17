import axios from "axios";
import * as actions from "./actionTypes";

//GET ACTIONS//------------------------------------------------------------------
export const getAllUsers = (dispatch) => {
  return axios
    .get("http://localhost:3001/users")
    .then((json) =>
      dispatch({
        type: actions.GET_ALL_PETS,
        payload: json.data,
      })
    )
    .catch((error) => console.log(error, "error en action get_all_users"));
};

export function getUserDetail(id) {
  return async (dispatch) => {
    return await axios
      .get(`http://localhost:3001/users/${id}`)
      .then((json) =>
        dispatch({ type: actions.GET_USER_DETAIL, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}

export function getUserByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/users?name=" + name
      );
      return dispatch({
        type: actions.GET_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error en getBYname");
    }
  };
}
////POST ACTIONS//---------------------------------------------------------------------------

export function postPet(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(`http://localhost:3001/pets`, payload);
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


export function clearState(payload) {
  return {
    type: actions.CLEAR_STATE,
    payload,
  };
}
