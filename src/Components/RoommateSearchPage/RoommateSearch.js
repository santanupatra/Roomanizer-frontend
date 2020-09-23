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
import Cardbox from './card';
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
                      <div className="page-bg">  
                        <Row className= "">
                          
                          <Col>
                              <div className="form-bg1">
                                <h3 className="mt-3 mb-4">Find A Roommate :</h3>
                                <Formsec></Formsec>
                              </div>
                          </Col>

                        </Row>

                        <Row className="px-5">
                          <Col className="px-4">
                            <h3 className="mt-3 mb-4">All Roommates    28 Results</h3>
                          </Col>
                          <Col></Col>
                        </Row>
                        
                        <Row className="px-5 py-4">
                          <Col className="px-4">
                              <div>
                                <Cardbox></Cardbox>
                              </div>
                          </Col>
                          <Col className="px-4">
                              <div>
                                <Cardbox></Cardbox>
                              </div>
                          </Col>
                          <Col className="px-4">
                              <div>
                                <Cardbox></Cardbox>
                              </div>
                          </Col>
                        </Row>

                        <Row className="px-5 py-4">
                          <Col className="px-4">
                              <div>
                                <Cardbox></Cardbox>
                              </div>
                          </Col>
                          <Col className="px-4">
                              <div>
                                <Cardbox></Cardbox>
                              </div>
                          </Col>
                          <Col className="px-4">
                              <div>
                                <Cardbox></Cardbox>
                              </div>
                          </Col>
                        </Row>

                        <Row className="px-5 py-4">
                          <Col className="px-4">
                              <div>
                                <Cardbox></Cardbox>
                              </div>
                          </Col>
                          <Col className="px-4">
                              <div>
                                <Cardbox></Cardbox>
                              </div>
                          </Col>
                          <Col className="px-4">
                              <div>
                                <Cardbox></Cardbox>
                              </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Pageno></Pageno>
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