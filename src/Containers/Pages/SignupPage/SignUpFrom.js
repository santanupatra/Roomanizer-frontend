import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, FormGroup, Input, Col} from 'reactstrap';



const SignUpFrom = (props) => {
    return (
      <div className="">
        
        <div className="login-form">
                      <Form>
                        <FormGroup row>
                          <Col sm={12}>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                            <Input type="password" name="password" id="examplePassword" placeholder="Create Password" />
                            <Input type="password" name="password" id="examplePassword" placeholder="Confirm Password" />
                            <a href="#" className="login-bt mt-4">Sign up</a>
                            <img src={imagePath.orImage} alt="image"/>
                            <a href="#"><img src={imagePath.fbImage} alt="image"/></a>
                            <a href="#"><img src={imagePath.gsImage} alt="image"/></a>
                            <p className="forgot mt-3 mb-0">Already have an account? <span>Login</span></p>
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                    
      </div>
    );
  }
  
  export default SignUpFrom;