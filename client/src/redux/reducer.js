import { POST_DOG } from "./actions";

const initialState = {
    dogs: []
}

export default function rootReducer (state = initialState, action) {
    switch (action.type) {
        case POST_DOG:
            return {
                ...state
            }
        default:
            return state
    }
}