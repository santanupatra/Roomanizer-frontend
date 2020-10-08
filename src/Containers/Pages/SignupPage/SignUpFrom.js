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


const SignUpFrom = (props) => {
  const initialFields = {
    email: "",
    password: null,
    confirmPassword: null,
    errorMessage: null,
  }
  
  const [fields, setFields] = useState(initialFields);
  // const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  useEffect(() => {
    const action = props.user.action;
    setFields({ ...fields, ...props.user.user })
    if (action.isSuccess && action.type === "ADD")
      props.history.push("/activeMail")
  }, [props.user]);


  const onSubmit = (data) => {
    props.crudActionCall(SIGNUP_URL, data,"ADD");
  }

  const  handleChange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
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
        
        <div className="login-form">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup row>
                          <Col sm={12}>
                            <InputUI
                            type="email"
                            name="email"
                            id="exampleEmail" 
                            placeholder="Email" 
                            errors={errors}
                            innerRef={register({
                              required: 'This is required field',
                            })}
                            fields={fields}/>
                            
                            <InputUI
                            type="password" 
                            name="password" 
                            id="Password" 
                            placeholder="Create Password" 
                            errors={errors}
                            innerRef={register({
                              required: 'This is required field',
                            })}
                            onChange = {(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            fields={fields.password}/>
                            <InputUI
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder="Confirm Password" 
                            errors={errors}
                            innerRef={register({
                              required: 'This is required field',
                            })}
                            onChange = {(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            fields={fields.confirmPassword}/>
                            <div style={{color:'red'}}>{fields.errorMessage}</div>
                            <Button type="submit" color="primary" className="login-bt mb-4">
                              Sign Up
                            </Button>
                            {/* <Link to="/activeMail" className="login-bt mt-4">Sign up</Link> */}
                            <div className="text-center">
                            <img src={imagePath.orImage} alt="image"/>
                              <NavLink to="#"><img src={imagePath.fbImage} alt="image"/></NavLink>
                              <NavLink to="#"><img src={imagePath.gsImage} alt="image"/></NavLink>
                            </div>
                            <NavLink to="/login" className="forgot mt-3 mb-0">Already have an account? <span>Login</span></NavLink>
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
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpFrom));