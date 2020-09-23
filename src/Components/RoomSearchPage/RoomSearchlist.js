import React,{useState} from 'react';
import './style.css';
import imagePath from '../imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShareAlt, faList, faThLarge, } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import {
  Card, CardImg, CardText, CardBody, CardFooter,
  CardTitle, CardSubtitle} from 'reactstrap';
import Header from '../header';
import Pageno from '../pageno';
import Formsec from './form-sec';
import Cardbox from './card';
import Cardlist from './cardlist';
import Footer from '../footer';


const Searchlist = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }



    return (
                      

                      <div>
                          
                          <div className="px-2 d-flex justify-content-between align-items-center">
                            <h3 className="mt-3 mb-4">All Roommates    <span class="result">28 Results</span></h3>

                            <Nav tabs>
                              <NavItem>
                                <NavLink
                                  className={classnames({ active: activeTab === '1' })}
                                  onClick={() => { toggle('1'); }}
                                >
                                  <a href="#" className="list-bt mr-2"><FontAwesomeIcon icon={faThLarge} /></a>
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({ active: activeTab === '2' })}
                                  onClick={() => { toggle('2'); }}
                                >
                                  <a href="#" className="list-bt"><FontAwesomeIcon icon={faList} /></a>
                                </NavLink>
                              </NavItem>
                            </Nav>

                          </div>

                          <div className="room">
                          <TabContent activeTab={activeTab}>
                          
                            <TabPane tabId="1">
                              <Row className="mr-0 ml-0">
                                <Col className="">
                                    <div>
                                      <Cardbox></Cardbox>
                                    </div>
                                </Col>
                                <Col className="">
                                    <div>
                                      <Cardbox></Cardbox>
                                    </div>
                                </Col>
                              </Row>

                              <Row className="mt-3 mr-0 ml-0">
                                <Col className="">
                                    <div>
                                      <Cardbox></Cardbox>
                                    </div>
                                </Col>
                                <Col className="">
                                    <div>
                                      <Cardbox></Cardbox>
                                    </div>
                                </Col>
                              </Row>

                              <Row className="mt-3 mr-0 ml-0">
                                <Col className="">
                                    <div>
                                      <Cardbox></Cardbox>
                                    </div>
                                </Col>
                                <Col className="">
                                    <div>
                                      <Cardbox></Cardbox>
                                    </div>
                                </Col>
                              </Row>
                              
                            </TabPane>
                            <TabPane tabId="2">
                                <Row className="list-type mr-0 ml-0">
                                  <Col className="">
                                      <div>
                                        <Cardlist></Cardlist>
                                      </div>
                                  </Col>
                                </Row>

                                <Row className="list-type mr-0 ml-0">
                                  <Col className="">
                                      <div>
                                        <Cardlist></Cardlist>
                                      </div>
                                  </Col>
                                </Row>

                                <Row className="list-type mr-0 ml-0">
                                  <Col className="">
                                      <div>
                                        <Cardlist></Cardlist>
                                      </div>
                                  </Col>
                                </Row>

                                <Row className="list-type mr-0 ml-0">
                                  <Col className="">
                                      <div>
                                        <Cardlist></Cardlist>
                                      </div>
                                  </Col>
                                </Row>

                            </TabPane>
                            
                          </TabContent>
                          </div>
                        </div>



    )
  }

  export default Searchlist;