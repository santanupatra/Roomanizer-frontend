import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, FormGroup, Button, Input, Col} from 'reactstrap';
import { SIGNUP_URL } from '../../../shared/allApiUrl';
import { useForm } from "react-hook-form";
import { crudAction } from '../../../store/actions/common';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InputUI from '../../../UI/InputUI';
import { ToastContainer, toast } from 'react-toastify';
import { callApi} from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";
import axios from 'axios';
import FbLoginCom from '../../Common/SocialMedia/faceBookLogin';
import GoogleLoginCom from '../../Common/SocialMedia/googleLogin';
const SignUpFrom = (props) => {
const initialFields = {
email: '',
password: null,
confirmPassword: null,
errorMessage: null,
}
const [fields, setFields] = useState(initialFields);
const { handleSubmit, register, errors } = useForm();
const gotoEdit = (userId)=>
props.history.push(`/editProfile/${userId}`)
const onSubmit = (data) => {
console.log(data)
data.userType="agent"
console.log(data)
axios.post(apiBaseUrl+"/web/"+SIGNUP_URL,data )
.then(res => {
console.log(res.data.msg);
if (res.data.ack==false&&res.data.msg=="Parameter missing..."){
toast.info('Parameter missing...', {
position: toast.POSITION.TOP_CENTER
}); 
}
if (res.data.ack==false&&res.data.msg=="Email already exist"){
toast.info('Email already exist', {
position: toast.POSITION.TOP_CENTER
});
}
if (res.data.ack==true){
toast.info('Signup successfully', {
position: toast.POSITION.TOP_CENTER
});
props.history.push("/activeMail")
}
})
}
const  handleChange = (name,value)=>{
console.log(value.length )
setFields((prevState) => ({ ...prevState, [name]: value }));
if(value.length<6){
fields.errorMessage="Password length should be at least 6"
}
else{
fields.errorMessage=""
}
if(value!==null && name==='confirmPassword')
{
if(fields.password!==value)
{
fields.errorMessage="Password Don't Match"
}
else
{
fields.errorMessage=""
}
}
}
return (
<div className="">
   <div className="login-form custm_Login2">
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormGroup row>
            <Col sm={12}>
            <InputUI
            className="custm_inpt"
            type="email"
            name="email"
            id="exampleEmail" 
            placeholder="Enter Email id . . ." 
            errors={errors}
            innerRef={register({
            required: 'This is required field',
            })}
            fields={fields}/>
            <InputUI
            className="custm_inpt"
            type="password" 
            name="password" 
            id="Password" 
            placeholder="Password . . ." 
            errors={errors}
            innerRef={register({
            required: 'This is required field',
            })}
            onChange = {(e) =>
            handleChange(e.target.name, e.target.value)
            }
            fields={fields.password}/>
            <InputUI
            className="custm_inpt"
            type="password" 
            name="confirmPassword" 
            id="confirmPassword" 
            placeholder="Confirm Password . . ." 
            errors={errors}
            innerRef={register({
            required: 'This is required field',
            })}
            onChange = {(e) =>
            handleChange(e.target.name, e.target.value)
            }
            fields={fields.confirmPassword}/>
            <div style={{color:'red'}}>{fields.errorMessage}</div>
            <Button type="submit" color="primary" className="login-bt cust_button mb-4">
            Sign Up
            </Button>
            {/* 
            <Link to="/activeMail" className="login-bt mt-4">
            Sign up</Link> */}
            {/* 
            <div className="text-center">
               <img src={imagePath.orImage} alt="image"/>
               <NavLink to="#"><img src={imagePath.fbImage} alt="image"/></NavLink>
               <NavLink to="#"><img src={imagePath.gsImage} alt="image"/></NavLink>
            </div>
            */}
            <div className="text-center">
               <img src={imagePath.orImage} alt="image" />
               {/* 
               <NavLink to="#" onClick={()=>{setFbComponent(true)}}><img src={imagePath.fbImage} alt="image" /></NavLink>
               */}
               {/* 
               <FbLoginCom  gotoEdit={gotoEdit}/>
               */}
               {/* 
               <NavLink to="#"><img src={imagePath.gsImage} alt="image" /></NavLink>
               */}
               {/* 
               <GoogleLoginCom  gotoEdit={gotoEdit}/>
               */}
            </div>
            <NavLink to="/AgentLogin" className="forgot custm_forgot mb-0">Already have an account? <span>Login</span></NavLink>
            </Col>
         </FormGroup>
      </Form>
   </div>
</div>
);
}
// const mapStateToProps = state => {
//   const { user } = state;
//   return {
//     user
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
//   }
// }
export default (withRouter(SignUpFrom));