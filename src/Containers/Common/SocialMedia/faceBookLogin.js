import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import FacebookLoginCom from "react-facebook-login";
import {SOCIALLOGIN_URL } from "../../../shared/allApiUrl";
import { axiosApiCall } from "../../../api/index";
import { toast } from "react-toastify";
import history from "../../../history";

export default class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    // this.state={
    //     scrollToCheck:false,
    //     websiteLogo:null
    // }
  }
  
  responseFacebook = async (response) => {
    console.log("responseFacebook===",response);
    const logInData = {
        email: response.email?response.email:'',
        name: response.name?response.name:'',
        socialMediaType: "Facebook",
        profilePicture: response.picture?response.picture.data.url:'',
        socialId:response.id?response.id:''
    }
   
    try {
        if(response.email && response.name){
          let  {data}  = await axiosApiCall.post(SOCIALLOGIN_URL, logInData);
          // set token in localStorage
          if(data.ack===true && data.token){
              console.log("data++++++",data.data)
              localStorage.setItem('access-token', data.token);
              localStorage.setItem('userId', data.data._id);
              localStorage.setItem("profileImg",data.data.profilePicture)
              localStorage.setItem("username",data.data.lastName?(data.data.firstName+" "+data.data.lastName):data.data.firstName)
              const userId = localStorage.getItem('userId')
               //localStorage.getItem("profileImg")
        //localStorage.getItem("username")
        //localStorage.getItem("userId")
              console.log("userId",userId)
              if(userId){
                history.push(`/editProfile/${userId}`);
                const details = data.details;
                toast.info(details, {
                    position: toast.POSITION.TOP_CENTER
                });

              }
              
          }
         
        }else {
            const details = response.status;
            toast.info(details, {
                position: toast.POSITION.TOP_CENTER
            });
        }
        
       
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
  }
  render() {
    return (
      <React.Fragment>
        <NavLink className="facebook" to="/login">
          <FacebookLoginCom
            //appId="373120140605031"
            appId="697039197852821"
            autoLoad={false}
            fields="name,email,picture"
            //onClick={this.componentClicked}
            callback={this.responseFacebook}
            icon="fa-facebook"
            textButton="&nbsp;&nbsp;Facebook"
          />
        </NavLink>
      </React.Fragment>
    );
  }
}
