import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import 'react-notifications/lib/notifications.css';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from "../../../store/actions/auth";
import { connect } from "react-redux";
import { getAuthToken } from "../../../shared/helpers";
import { withRouter ,useHistory} from "react-router";
import { Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import {callApi} from "../../../api";
import { FORGET_PASSWORD_URL } from '../../../shared/allApiUrl';
import { SET_PASSWORD_URL } from '../../../shared/allApiUrl';
import { NotificationManager} from 'react-notifications';
import FbLoginCom from '../../Common/SocialMedia/faceBookLogin';
import GoogleLoginCom from '../../Common/SocialMedia/googleLogin';

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
import { NavLink } from "react-router-dom";

function LoginFrom(props) {
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  // const { handleSubmit, register } = useForm();
  const [status, setStatus] = useState(false);
  const [fbComponent,setFbComponent] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = (data) => {


    props.loginApiCall(data);

    
  };


  /*
  modal api calling
  */
 const onSubmit_1 = async(data) => {
   console.log(data)
 if (status === false ) {
  try {
  await callApi(FORGET_PASSWORD_URL,"POST",data);
  setStatus(true);
 // NotificationManager.success('Email Verified', 'Success');
  toast.info('Email Verified', {
    position: toast.POSITION.TOP_CENTER
});
  }
  catch (error) {
     // NotificationManager.error('Email is not valid!', 'Error');
      toast.error("Email is not valid!", {
        position: toast.POSITION.TOP_CENTER
    });
  }
}
else if(data.password!=data.confirmPassword){
  toast.error("Password and Confirm_Password not match!", {
    position: toast.POSITION.TOP_CENTER
});
}
else  {
  try {
      await callApi(SET_PASSWORD_URL, "PUT",data);
      console.log(data)
      //NotificationManager.success('Password changed succesfully!', 'Success');
      toast.info('Password changed succesfully!', {
        position: toast.POSITION.TOP_CENTER
      });

      props.history.push("/");

  }
  catch (error) {
      console.log("Error");
      // NotificationManager.error('OTP  is not valid!', 'Error');
      toast.error("OTP  is not valid!", {
        position: toast.POSITION.TOP_CENTER
    });
  }

}
}
const gotoEdit = (userId)=>
    history.push(`/editProfile/${userId}`)
  useEffect(() => {

    if (props.auth.isAuthenticated && getAuthToken !== "")
    {
      const userId = localStorage.getItem('userId')
      history.push(`/editProfile/${userId}`);
    }
      
    return () => {
      // cleanup
    };
  }, [props.auth]);

  return (
    <div className="">
      <div className="login-form">

        <Form >
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
              <a className="forgot" onClick={handleShow}><p>Forgot Password?</p></a>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title> <h1>Forget Password</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form >

                      <p className="text-muted">Please put your Email</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email"
                          disabled={status}
                          autoComplete="username"
                          innerRef={register}
                          required
                        />
                      </InputGroup>
                      { status? <> <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="otp"
                        placeholder="O.T.P"
                        autoComplete="current-password"
                        innerRef={register}
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password"
                      placeholder="New Password"
                    //   autoComplete="current-password"
                      innerRef={register}
                      required
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    // autoComplete="current-password"
                    innerRef={register}
                    required
                  />
                </InputGroup> </>: null}
                      <Row>
                        <Col xs="3">
                        <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                          {/* <Button type="submit" color="primary" className="px-4 mr-4">
                            Submit
                          </Button> */}
                          
                        </Col>
                        <Col xs="3">
                        {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button> */}
                          <Button type="button" onClick={handleSubmit(onSubmit_1)} style={{marginLeft:"236px"}} color="primary" className="px-4 mr-4">
                            Submit
                          </Button>
                          
                        </Col>
                      </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                 
                  
                </Modal.Footer>
              </Modal>
              {/* <a href="#" className="login-bt mb-2">Login</a> */}
              <Button type="button" onClick={handleSubmit(onSubmit)} color="primary" className="login-bt mb-2">
                Login
                        </Button>
                        <div className="text-center">
                          <img src={imagePath.orImage} alt="image" />
                          {/* <NavLink to="#" onClick={()=>{setFbComponent(true)}}><img src={imagePath.fbImage} alt="image" /></NavLink> */}
                          <FbLoginCom  gotoEdit={gotoEdit}/>
                          {/* <NavLink to="#"><img src={imagePath.gsImage} alt="image" /></NavLink> */}
                          <GoogleLoginCom  gotoEdit={gotoEdit}/>
                        </div>
                        <NavLink to="/signUP" className="forgot mt-3 mb-0">Don’t have an account? <span>Register</span></NavLink>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginFrom));

//export default Example; 
