import React,{useState} from 'react';
import './style.css';
import imagePath from '../imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShareAlt, } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Header from '../header';
import Pageno from '../pageno';
import Formsec from './form-sec';
import Slider from './slider';
import Footer from '../footer';



export default class Home extends React.Component {

  render() {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                    <Row className="mb-4">
                      <Col className="pr-0"><Slider></Slider></Col>
                      <Col className="px-0"><Slider></Slider></Col>
                      <Col className="pl-0"><Slider></Slider></Col>
                    </Row>
                      
                      <div className="page-bg">  

                        <Row className="p-5">
                          <Col sm={4}>
                            <Formsec></Formsec>
                          </Col>

                          <Col sm={8}>
                            <div className="about mt-0 pb-4">
                              <h4>For Private Room:</h4>
                              <h2 className="blue">$500 / month in Luxembourg</h2>
                            </div>
                            <div className="about">
                              <h4>About Room</h4>
                              <p className="mb-2">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as 
necessary, making this the first true generator on the Internet. 
It uses a dictionary of over 200 Latin words, combined with a handful of model 
sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-
characteristic words etc.</p>
                            <ul className="ab pl-0 d-flex justify-content-between mb-1">
                              <li><img src={imagePath.bedImage} className="pr-1" alt="image"/>3 Bedrooms</li>
                              <li><img src={imagePath.maleImage} className="pr-1" alt="image"/>Male Flatmates</li>
                              <li><img src={imagePath.ageImage} className="pr-1" alt="image"/>20-40 Age Range</li>
                              <li><img src={imagePath.bathImage} className="pr-1" alt="image"/>1.5 Bathrooms</li>
                            </ul>
                            <ul className="ab pl-0 d-flex mb-4">
                              <li><img src={imagePath.washImage} className="pr-1" alt="image"/>In-unit Washer/Dryer</li>
                              <li><img src={imagePath.cleanImage} className="pl-4 pr-1" alt="image"/>Weekly Cleaning Personnel</li>
                            </ul>
                            </div>

                            <div className="about">
                              <Row>
                                <Col sm={3}>
                                  <h4>Move in:</h4>
                                  <p>Available Now</p>
                                </Col>
                                <Col sm={3}>
                                  <h4>Duration:</h4>
                                  <p>1-12 months</p>
                                </Col>
                                <Col sm={3}>
                                  <h4>Deposit:</h4>
                                  <p>$500</p>
                                </Col>
                                <Col sm={3}>
                                  <h4>Charges:</h4>
                                  <p>$200 or Included</p>
                                </Col>
                              </Row>
                            </div>
                            <div className="about">
                              <h4>House Rules:</h4>
                              <ul className="pre pl-1 mb-4">
                                <li>Dog Friendly</li>
                                <li>Smoking Friendly</li>
                                <li>Social Drinking</li>
                              </ul>
                            </div>
                            <div className="about border-0">
                              <h4>Looking for a room in:</h4>
                              <div className="locat mb-3">528/9 Street Name Lane Boise</div>
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d659064.2706871205!2d5.572872077027312!3d49.814834630019895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479545b9ca212147%3A0x64db60f602d392ef!2sLuxembourg!5e0!3m2!1sen!2sin!4v1600248985937!5m2!1sen!2sin" width="100%" height="200px" frameborder="0"></iframe>
                            </div>
                          </Col>
                        </Row>

                      </div>
                  </Col>
                </Row>

              </Container>
            </div>
        </div>
      <Footer></Footer>
      </div>
    )
  }
}