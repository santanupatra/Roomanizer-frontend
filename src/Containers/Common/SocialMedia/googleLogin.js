import React, { Component } from 'react'
import {NavLink } from "react-router-dom";
import  GoogleLoginCom  from 'react-google-login';
import {SOCIALLOGIN_URL} from '../../../shared/allApiUrl';
import { axiosApiCall } from "../../../api/index";
import { toast } from 'react-toastify';
import history from '../../../history';
import imagePath from '../../../Config/imageConstants';

export default class GoogleLogin extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     scrollToCheck:false,
        //     websiteLogo:null
        // }
      }
      responseGoogle = async (response) => {
       
        const logInData = {
            email:response.profileObj?response.profileObj.email:'',
            name:response.profileObj?response.profileObj.name:'',
            socialMediaType:'Google',
            //profilePicture:response.profileObj?response.profileObj.imageUrl:'',
            socialId:response.profileObj?response.profileObj.googleId:''
        }
       
        try {
            if(response.profileObj){
                let  {data}  = await axiosApiCall.post(SOCIALLOGIN_URL, logInData);
                // set token in localStorage
                if(data.ack===true && data.token){
                    localStorage.setItem('access-token', data.token);
                    localStorage.setItem('userId', data.data._id);
                    localStorage.setItem("profileImg",data.data.profilePicture)
                    localStorage.setItem("username",data.data.lastName?(data.data.firstName+" "+data.data.lastName):data.data.firstName)
              const userId = localStorage.getItem('userId')
              console.log("userId",userId)
              if(userId){
                this.props.gotoEdit(userId)
                history.push(`/editProfile/${userId}`);
               
              }
              
                }
                const details = data.details;
                toast.info(details, {
                    position: toast.POSITION.TOP_CENTER
                });
            }else {
                // const details = response.details;
                // toast.info(details, {
                //     position: toast.POSITION.TOP_CENTER
                // });
               // console.log(response)
            }
            
           
          } catch (err) {
            console.log(err);
            alert("Something went wrong");
          }
      }
    render() {
        return (
            <React.Fragment>
            {/* <NavLink className="g-plus" to="/editProfile/${userId}">*/}
            {/* </NavLink> */}
            <GoogleLoginCom
                //clientId="691070581672-dtncmeao6uettl9cigrrdip699gcnvvb.apps.googleusercontent.com"
                clientId="1012541957608-jdn0he0mqkprfan0ecihv3gpk9miqued.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
                // buttonStyle={{
                //     border: 'none',
                //     boxShadow: 'none',
                //     backgroundColor: '#0000'                 
                //   }}      
            />
            {/* <div ><img src={imagePath.gsImage} alt="image" /><span></span></div> */}
            {/* </NavLink> */}
            </React.Fragment>
        )
    }
}
