import React,{useState} from 'react';
import './style.css';
import imagePath from '../imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';


const Formsec = (props) => {
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
  
  export default Formsec;