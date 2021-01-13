import React, { useState, useEffect } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Col, Button } from 'reactstrap';
import { CHANGEPASSWORD_URL } from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import InputUI from '../../../UI/InputUI';
import { ToastContainer, toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

const AgentChangePasswordForm = (props) => {
  console.log(props.user.user)
  const initialFields = {
    currentPassword:null,
    newPassword: null,
    confirmPassword: null,
    password:''
  }
  
  const [fields, setFields] = useState(initialFields);
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  useEffect(() => {
    setUserId(params.userId)
    const action = props.user.action;
    if (props.user.user && params.userId) {
      setFields({ ...fields, ...props.user.user })
    }
    if (action.isSuccess && action.type === "UPDATE"){
      toast.info('Password changed successfully', {
        position: toast.POSITION.TOP_CENTER
    });
    props.history.push(`/viewProfile/${userId}`)
    }
    
  }, [props.user]);
  
  const onSubmit = (data) => {
    console.log("data====>",fields)
  console.log(fields.password)
  console.log(data)

    var compering=bcrypt.compareSync(data.currentPassword, fields.password);
      console.log(compering)
  // console.log("currentPassword",currentPassword)
  if(!compering){
    toast.error('Your current password is not valid', {
      position: toast.POSITION.TOP_CENTER
  });
  }
  if(data.newPassword.length<6){
    toast.error('Password length should be at least 6', {
      position: toast.POSITION.TOP_CENTER
  });
} else{
  if(data.newPassword!==data.confirmPassword){
    toast.error('New password and confirm password does not match', {
      position: toast.POSITION.TOP_CENTER
  });
  }
}
  if (userId) data.userId = userId;
  props.crudActionCall(CHANGEPASSWORD_URL + `/${userId}`, data, "UPDATE");
  props.resetAction()
  }
  console.log("fields.password",fields)
    return (
      <div className="">
        
        <div className="login-form">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup row>
                          <Col sm={12}>
                          <InputUI
                            type="password" 
                            name="currentPassword" 
                            id="currentPassword" 
                            placeholder="current Password" 
                            errors={errors}
                            innerRef={register({
                             required: 'This is required field',
                            })}
                            fields={fields}
                            />
                            <InputUI
                            type="password" 
                            name="newPassword" 
                            id="newPassword" 
                            placeholder="Create Password" 
                            errors={errors}
                            innerRef={register({
                             required: 'This is required field',
                            })}
                            fields={fields}
                            />
                            <InputUI
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder="Confirm Password" 
                            errors={errors}
                            innerRef={register({
                             required: 'This is required field',
                            })}
                            fields={fields}
                            />
                            <Button type="submit" size="sm" color="primary" className="login-bt mt-5"> Submit</Button>
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                    
      </div>
    );
  }
  const mapStateToProps = state => {
    const { user } = state;
    return {
      user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
      resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AgentChangePasswordForm));