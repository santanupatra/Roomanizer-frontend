import { combineReducers } from "redux";
import auth from "./auth";
import user from './user';
import home from './home';
export default combineReducers({
    auth,
    user,
    home
})