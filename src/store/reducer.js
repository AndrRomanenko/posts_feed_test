import { combineReducers } from "redux";
import postsList from "./postsList";

const rootReducer = combineReducers({ postsList });

const appReducer = (state, action) => rootReducer(state, action);

export default appReducer;
