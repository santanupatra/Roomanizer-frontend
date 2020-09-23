import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from '../Components/HomePage/home';
import LoginPage from '../Components/LoginPage/login';
import SignupPage from '../Components/SignupPage/signup';
import EditprofilePage from '../Components/EditProfilePage/editprofile';
import RoommateSearchPage from '../Components/RoommateSearchPage/RoommateSearch';
import ChangePasswordPage from '../Components/ChangePasswordPage/ChangePassword';
import RoomSearchPage from '../Components/RoomSearchPage/RoomSearch';
import UserProfilePage from '../Components/UserProfilePage/UserProfile';
import RoomsForRentPage from '../Components/RoomsForRentPage/RoomsForRent';

export default class Routing extends React.Component {
    render(){
      return(
        // <Router>
        //     <Route path="/" exact component={LoginScreen} />
        // </Router>
        <RoomSearchPage />
      )
    }
}