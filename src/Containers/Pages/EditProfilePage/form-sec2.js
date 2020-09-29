import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, CustomInput, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Facebook from '../facebook';
import Twitter from '../twitter';
import Gsuite from '../gSuite';


const Formsec2 = (props) => {
    return (
      <div className="">
        <div className="login-form mb-5">
                      <Form>
                        <FormGroup row>
                          <Col sm={12}>
                            <div className="text-center">
                              <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                              </label>
                              <span className="mt-2 d-block">
                                <a href="#" className="toggle pr-3">I am looking for a room</a>
                                <a href="#" className="toggle border-right-0 pl-3">I have an available room</a>
                              </span>
                            </div>
                            
                            <Input type="text" name="name" id="examplename" placeholder="Name" />
                            <Row>
                              <Col>
                                  <Input type="text" name="email" id="exampleEmail" placeholder="Location" />
                              </Col>
                              <Col className="pl-0">
                                  <Input type="text" name="email" id="exampleEmail" placeholder="Maximum Budget" />
                              </Col>
                            </Row>
                            
                              <Input type="textarea" name="text" id="exampleText" placeholder="About Room" />

                            <Row>
                              <Col>
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Bedrooms</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                              <Col className="pl-0">
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Flatmates</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                              <Col className="pl-0">
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Age Range</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Washer/Dryer</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                              <Col className="pl-0">
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Cleaning</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                            </Row>

                            <Row className="mt-3">
                              <Col>
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Move In ?</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                              <Col>
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Duration</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Deposit</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                              <Col>
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Charges</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                            </Row>
                            <FormGroup>
                              <Label className="av-room my-3" for="exampleCheckbox">House Rules:</Label>
                              <div>
                                <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Pet Friendly" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Smoking" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Social Drinking" />
                              </div>
                            </FormGroup>
                            <div className="mt-4 d-flex align-items-center">
                              <h6 className="social d-inline-block mr-2">Link social media accounts:</h6>
                                <Facebook></Facebook>
                                <Twitter></Twitter>
                                <Gsuite></Gsuite>
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
  
  export default Formsec2;