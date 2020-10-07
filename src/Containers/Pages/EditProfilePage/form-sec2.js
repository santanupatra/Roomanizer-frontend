import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, CustomInput, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import Facebook from '../facebook';
import Twitter from '../twitter';
import Gsuite from '../gSuite';


const Formsec2 = (props) => {
    return (
      <div className="">
        
                      <Form>
                        <FormGroup row>
                          <Col sm={12}>
                            <Row>
                              <Col className="pr-0">
                                <Input type="text" name="name" id="examplename" placeholder="First Name" />
                              </Col>
                              <Col>
                                <Input type="text" name="name" id="examplename" placeholder="Last Name" />
                              </Col>
                            </Row>
                            <Input type="text" name="roomName" id="exampleEmail" placeholder="Room Name" />
                            <Input type="number" name="area" id="exampleEmail" placeholder="Area in sq/ft" />
                            <Input type="text" name="email" id="exampleEmail" placeholder="Location" />
                            <Input type="text" name="email" id="exampleEmail" placeholder="Maximum Budget" />
                            <Input type="textarea" name="text" id="exampleText" placeholder="About Room" />
                            <FormGroup className="mt-3">
                              <Label for="exampleCheckbox" className="filter-mod">No of Bedrooms</Label>
                              <div className="filt d-flex justify-content-between">
                                <CustomInput type="checkbox" id="exampleCustomCheckbox13" label="2 Bedroom" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox14" label="3 Bedroom" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox15" label="4+ Bedroom" />
                              </div>
                            </FormGroup>

                            <FormGroup>
                              <Label for="exampleCheckbox" className="filter-mod">Listing Amenities</Label>
                              <div className="filt d-flex justify-content-between">
                                <CustomInput type="checkbox"id="exampleCustomCheckbox10" label="In-unit Washer" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox11" label="Furnished" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox12" label="Private Bathroom" />
                              </div>
                              <div className="filt d-flex justify-content-between">                
                                <CustomInput type="checkbox" id="exampleCustomCheckbox16" label="Outdoor Space" />
                              </div>
                            </FormGroup>

                            <FormGroup>
                              <Label for="exampleCheckbox" className="filter-mod">House Rules</Label>
                              <div className="filt d-flex justify-content-between">
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox" label="No Smoking" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="No Pets" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="No Drugs" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox4" label="No Drinking" />               
                                </div>
                                <div className="filt d-flex justify-content-between">
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox5" label="Dogs Ok" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox6" label="Cats Ok" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox7" label="Other Pets Ok" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox8" label="Couples Ok" />
                                </div>
                            </FormGroup>

                              <Row>
                                <Col className="pr-0">
                                  <Input type="select" name="select" id="exampleSelect">
                                    <option>Flatmates</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                  </Input>
                                </Col>
                                <Col>
                                  <Input type="select" name="select" id="exampleSelect">
                                    <option>Age Range</option>
                                    <option>20-30 Age</option>
                                    <option>30-40 Age</option>
                                  </Input>
                                </Col>
                              </Row>

                            <Row className="">
                              <Col className="pr-0">
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Move In ?</option>
                                  <option>Available Now</option>
                                  <option>After 1 Month</option>
                                </Input>
                              </Col>
                              <Col>
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Duration</option>
                                  <option>1-12 Months</option>
                                  <option>1-10 Months</option>
                                </Input>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-0">
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Deposit</option>
                                  <option>$500</option>
                                  <option>$700</option>
                                </Input>
                              </Col>
                              <Col>
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>Charges</option>
                                  <option>$200 or included</option>
                                  <option>$300 or included</option>
                                </Input>
                              </Col>
                            </Row>

                            <div className="mt-4 d-flex align-items-center">
                              <h6 className="social d-inline-block mr-2">Link social media accounts:</h6>
                                <Facebook></Facebook>
                                <Twitter></Twitter>
                                <Gsuite></Gsuite>
                            </div>
                            <div className="text-center">
                              <a href="#" className="login-bt mt-4 mb-2">Submit</a>
                              <img src={imagePath.orImage} alt="image"/>
                              <a href="#"><img src={imagePath.fbImage} alt="image"/></a>
                              <a href="#"><img src={imagePath.gsImage} alt="image"/></a>
                              </div>
                          </Col>
                        </FormGroup>
                      </Form>
      </div>
    );
  }
  
  export default Formsec2;