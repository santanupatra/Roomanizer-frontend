import { combineReducers } from "redux";
import auth from "./auth";
import user from './user';
import home from './home';
import contactUs from './contactUs';
import setting from './setting';
import house from './house'
import room from './room'
import city from './city'
import landlord from './landlord';
import favorite from './favorite'
import favoriteRoom from './favoriteRoom'
import agent from './agent'
import agentt from './agentt'

export default combineReducers({
    auth,
    user,
    home,
    setting,
    contactUs,
    house,
    room,
    city,
    landlord,
    favorite,
    favoriteRoom,
    agent,
    agentt
})