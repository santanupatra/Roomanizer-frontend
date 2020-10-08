import React,{useState} from 'react';
import './style.css';
import {Row, Col, Nav, NavItem, NavLink,TabContent, TabPane} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faThLarge, } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from 'classnames';
import Cardbox from './card';
import Cardlist from './cardlist';



const Searchlist = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
    return (
              <div>
                  
                  <div className="px-2 d-sm-flex d-md-flex d-lg-flex justify-content-between align-items-center">
                    <h3 className="heading1 mt-3 mb-4">All Roommates    <span class="result">28 Results</span></h3>

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
                      <Row>
                        <Col xs={12} sm={6} md={6} lg={6}>
                          <Cardbox></Cardbox>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                          <Cardbox></Cardbox>
                        </Col>
                      </Row>

                      <Row className="mt-3">
                        <Col xs={12} sm={6} md={6} lg={6}>
                          <Cardbox></Cardbox>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                          <Cardbox></Cardbox>
                        </Col>
                      </Row>

                      <Row className="mt-3">
                        <Col xs={12} sm={6} md={6} lg={6}>
                          <Cardbox></Cardbox>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                          <Cardbox></Cardbox>
                        </Col>
                      </Row>
                      
                    </TabPane>
                    <TabPane tabId="2">
                        <Row className="list-type">
                          <Col>
                            <Cardlist></Cardlist>
                          </Col>
                        </Row>

                        <Row className="list-type">
                          <Col>
                            <Cardlist></Cardlist>
                          </Col>
                        </Row>

                        <Row className="list-type">
                          <Col>
                            <Cardlist></Cardlist>
                          </Col>
                        </Row>

                        <Row className="list-type">
                          <Col>
                            <Cardlist></Cardlist>
                          </Col>
                        </Row>

                    </TabPane>
                    
                  </TabContent>
                  </div>
                </div>
    )
  }

  export default Searchlist;