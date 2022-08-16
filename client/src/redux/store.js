import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = configureStore(
  { reducer: rootReducer },
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;