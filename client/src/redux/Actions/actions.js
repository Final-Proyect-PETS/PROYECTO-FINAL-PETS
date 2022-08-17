import axios from "axios";
import * as actions from "./index";


export const getAllPets = (dispatch) => {
  return axios
    .get("http://localhost:3001/something")
    .then((json) =>
      dispatch({
        type: actions.GET_ALL_PETS,
        payload: json.data,
      })
    )
    .catch((error) => console.log(error, "error en action get_all_pets"));
};

export function getSomethingByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/something?name=" + name
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

export function postDog(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(`http://localhost:3001`, payload);
      return dispatch({
        type: actions.POST_DOG,
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
