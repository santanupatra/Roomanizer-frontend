import { combineReducers } from "redux";
import auth from "./auth";
import user from './user';
import home from './home';
import contactUs from './contactUs';
import setting from './setting';
import house from './house'
import room from './room'
import city from './city'
export default combineReducers({
    auth,
    user,
    home,
    setting,
    contactUs,
    house,
    room,
    city,
})