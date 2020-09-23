import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';


const Formsec = (props) => {
    return (
      <div className="">
        <div className="login-form mb-5">
                      <Form>
                        <FormGroup row>
                          <Col sm={12}>
                            <label class="switch">
                              <input type="checkbox"/>
                              <span class="slider round"></span>
                            </label>
                            <span className="mt-2 d-block">
                              <a href="#" className="toggle pr-2">I am looking for a room</a>
                              <a href="#" className="toggle border-right-0 pl-2">I have an available room</a>
                            </span>
                            
                            <Input type="text" name="name" id="examplename" placeholder="Name" />
                            <Row>
                              <Col>
                                  <Input type="text" name="email" id="exampleEmail" placeholder="Age" />
                              </Col>
                              <Col className="pl-0">
                                  <Input type="text" name="email" id="exampleEmail" placeholder="Maximum Budget" />
                              </Col>
                            </Row>
                            <Input type="textarea" name="text" id="exampleText" placeholder="About Me" />
                            <Input type="select" name="select" id="exampleSelect">
                              <option>Ready to move ?</option>
                              <option>2</option>
                              <option>3</option>
                            </Input>
                            <Input type="select" name="select" id="exampleSelect">
                              <option>Preferences for house rules</option>
                              <option>2</option>
                              <option>3</option>
                            </Input>
                            <div className="mt-4">
                              <h6 className="social d-inline-block">Link social media accounts:</h6>
                                  <a href="#" className="pr-2 pl-2"><img src={imagePath.fImage}/></a>
                                  <a href="#" className="pr-2"><img src={imagePath.tImage}/></a>
                                  <a href="#"><img src={imagePath.gImage}/></a>
                            </div>
                            <a href="#" className="login-bt mt-4 mb-2">Submit</a>
                            <img src={imagePath.orImage} alt="image"/>
                            <a href="#"><img src={imagePath.fbImage} alt="image"/></a>
                            <a href="#"><img src={imagePath.gsImage} alt="image"/></a>
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
      </div>
    );
  }
  
  export default Formsec;