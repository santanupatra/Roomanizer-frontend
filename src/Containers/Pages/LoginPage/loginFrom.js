import React, { useEffect ,useState} from "react";
import { useForm } from "react-hook-form";
import 'react-notifications/lib/notifications.css';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from "../../../store/actions/auth";
import { connect } from "react-redux";
import { getAuthToken } from "../../../shared/helpers";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";


import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormGroup,
} from "reactstrap";
function LoginFrom(props) { 
 
 
 
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  
  const onSubmit = (data) => {
    props.loginApiCall(data);
  };
 
  useEffect(() => {
    
    if (props.auth.isAuthenticated && getAuthToken !== "")
      history.push("/viewProfile");
    return () => {
      // cleanup
    };
  }, [props.auth]);       
  
  return (
    <div className="">
      <div className="login-form">
                    
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <FormGroup row>
                        <Col sm={12}>
                          {/* <Input type="email" name="name" id="examplename" placeholder="Email" /> */}
                          <Input
                        type="email"
                        name="email"
          
                        placeholder="Email"
                        autoComplete="username"
                        innerRef={register}
                        required
                      />
                          {/* <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" /> */}
                          <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        innerRef={register}
                        required
                      />
                          <a href="#" className="forgot"><p>Forgot Password?</p></a>
                          {/* <a href="#" className="login-bt mb-2">Login</a> */}
                          <Button type="submit" color="primary" className="login-bt mb-2">
                          Login
                        </Button>
                          <img src={imagePath.orImage} alt="image"/>
                          <a href="#"><img src={imagePath.fbImage} alt="image"/></a>
                          <a href="#"><img src={imagePath.gsImage} alt="image"/></a>
                          <a href="/signUP" className="forgot mt-3 mb-0">Don’t have an account? <span>Register</span></a>
                        </Col>
                      </FormGroup>
                    </Form>
                  </div>
    </div>
  );
  } 
  const mapStateToProps = (state) => {
    const { auth } = state;
    return {
      auth: auth,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      loginApiCall: (data) => dispatch(login(data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(LoginFrom);
  
//export default Example; 
  