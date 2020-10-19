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
  console.log("propssearchList",props.searchList);
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
    return (
              <div>
                  
                  <div className="px-2 d-sm-flex d-md-flex d-lg-flex justify-content-between align-items-center pb-3">
                    <h3 className="heading1 mt-3 mb-4">All Room    <span class="result">{props.searchList?props.searchList.count:''} Results</span></h3>

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
                      {/* <Row>
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
                      </Row> */}
                      <Col xs={12} m={12} md={12} lg={12}>
                          <Row className="d-flex flex-wrap">
                            {
                            props.searchList && props.searchList.count > 0 ? props.searchList.list.map((val) => {
                              return (
                                <Col xs={12} sm={6} md={6} lg={6} className="mt-3">
                                  <div>
                                    <Cardbox val={val}></Cardbox>
                                  </div>
                                </Col>
                                  );
                                })
                                :
                                 <Col xs={12} sm={6} md={6} lg={6} className="mt-3">
                                  <div>No Roommates found!</div>
                                </Col>
                                //  :
                                //  <Col xs={12} sm={6} md={6} lg={4} className="mb-4">
                                //   <div>Loading data ....</div>
                                // </Col>
                                }
                          </Row>
                        </Col>
                      
                    </TabPane>
                    <TabPane tabId="2">
                    {
                      props.searchList && props.searchList.count > 0 ? props.searchList.list.map((val) => {
                        return (
                          <Row className="list-type">
                            <Col>
                              <Cardlist val={val}></Cardlist>
                            </Col>
                          </Row>
                        );
                      })
                          :
                        
                          <Row className="list-type">
                            <Col>
                              <div>No Room found!</div>
                            </Col>
                          </Row>
                      } 
                        {/* <Row className="list-type">
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
                        </Row> */}

                    </TabPane>
                    
                  </TabContent>
                  </div>
                </div>
    )
  }

  export default Searchlist;