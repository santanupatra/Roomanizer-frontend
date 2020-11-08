//import React from 'react';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from '../history';
import HomePage from '../Containers/Pages/HomePage/home';
import LoginPage from '../Containers/Pages/LoginPage/login';
import SignupPage from '../Containers/Pages/SignupPage/signup';
import UserProfilePage from '../Containers/Pages/UserProfilePage/UserProfile';
// import EditprofilePage from '../Containers/Pages/EditProfilePage/editprofile';
import EditprofilePage from '../Containers/Pages/EditProfilePage/editprofile';
import ChangePasswordPage from '../Containers/Pages/ChangePasswordPage/ChangePassword';
import RoommateSearchPage from '../Containers/Pages/RoommateSearchPage/RoommateSearch';
import RoomSearchPage from '../Containers/Pages/RoomSearchPage/RoomSearch';
import RoomsForRentPage from '../Containers/Pages/RoomsForRentPage/RoomsForRent';
import SuccessPage from '../Containers/Pages/SuccessPage/success';
import AboutPage from '../Containers/Pages/AboutPage/about';
import ContactPage from '../Containers/Pages/ContactPage/contact';
// import ForgetPassword from '../Containers/Pages/LoginPage/ForgetPassword'
import ActiveMailPage from '../Containers/Pages/ActiveMailPage/ActiveMailPage';
import CmsDetails from  '../Containers/Common/CmsDetails'
import { Navbar } from 'reactstrap'
import AfterActive from '../Containers/Pages/ActiveMailPage/AfterActive';
import FavoritePage from '../Containers/Pages/FavoritePage/favorite';
import FavoriteRoom from '../Containers/Pages/FavoriteRoom/favoriteroom';
import FavoriteRoomate from '../Containers/Pages/FavoriteRoomate/favoriteroomate';
import HowItWorksPage from '../Containers/Pages/HowItWorksPage/HowItWorks';
import ChatPage from '../Containers/Pages/ChatPage/chat';



const Routes=(props) =>{
  //const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  return (
        <Router history={history}>
            <Switch>
                {/* <Navbar isAuth={loggedIn} /> */}
                <Route path="/" exact component={HomePage} />
                <Route path="/home" exact component={HomePage} />
                {/* <Route path="/home/:userId" exact component={HomePage} /> */}
                <Route path="/login" exact component={LoginPage} />
                <Route path="/signUP" exact component={SignupPage} />
                <Route path="/editProfile/:userId" exact component={EditprofilePage} />
                <Route path="/viewProfile/:userId" exact component={UserProfilePage} />
                <Route path="/changePassword/:userId" exact component={ChangePasswordPage} />
                <Route path="/roomSearch" exact component={RoomSearchPage} />
                <Route path="/roomMateSearch" exact component={RoommateSearchPage} />
                <Route path="/roomRent/:userId" exact component={RoomsForRentPage} />
                <Route path="/success" exact component={SuccessPage} />
                <Route path="/activeMail" exact component={ActiveMailPage} />
                <Route path="/about" exact component={AboutPage} />
                <Route path="/contact" exact component={ContactPage} />
                <Route path="/success" exact component={SuccessPage} />
                <Route path="/CmsDetails/:SlugId" exact component={CmsDetails} />
                <Route path="/activeAccount/:email" exact component={AfterActive} />
                <Route path="/favorite" exact component={FavoritePage} />
                <Route path="/favoriteroom/:userId" exact component={FavoriteRoom} />
                <Route path="/favoriteroomate/:userId" exact component={FavoriteRoomate} />
                <Route path="/howItWorks" exact component={HowItWorksPage} />
                <Route path="/chat" exact component={ChatPage} />
            </Switch>
        </Router>
      )
}
export default Routes;
