import axios from "axios"

export const POST_DOG = "POST_DOG"

export function postDog (payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post(`http://localhost:3001`, payload)
            return dispatch({
                type: "POST_DOG",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}