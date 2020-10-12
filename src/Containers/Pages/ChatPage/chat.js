import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShareAlt, faPhone, faVideo, faEllipsisH, faEllipsisV, } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Header from '../../Common/header';
import ChatLeft from './chatleft';
import ChatboxDark from'./chat-box-dark';
import ChatBoxLight from'./chat-box-light';
import Footer from '../../Common/footer';


const Home =(props)=>{
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">  
                        <div className= "">
                          <Row>
                            <Col xs={12} sm={12} md={12} lg={5} className="border-right pr-0">
                                <div className="px-4 py-3 border-bottom">
                                  <h3 className="mt-4 mb-0">Chats</h3>
                                </div>

                                <div className="px-4 py-4 border-bottom chat">
                                  <FormGroup className="mb-0">
                                    <Input type="email" name="email" id="exampleEmail" className="search" placeholder="search" />
                                  </FormGroup>
                                </div>

                                <div className="chat-scrool">
                                  <ChatLeft></ChatLeft>
                                  <ChatLeft></ChatLeft>
                                  <ChatLeft></ChatLeft>
                                  <ChatLeft></ChatLeft>
                                  <ChatLeft></ChatLeft>
                                  <ChatLeft></ChatLeft>
                                  <ChatLeft></ChatLeft>
                                </div>

                            </Col>
                            <Col xs={12} sm={12} md={12} lg={7} className="pl-0">
                              <div className="px-4 py-3 border-bottom">
                                <Row>
                                  <Col sm={2} className="">
                                    <div className="chatpic">
                                      <img src={imagePath.chatpicImage} alt="image"/>
                                      <div className="green-ball"></div>
                                    </div>
                                  </Col>
                                  {/* <Col sm={5} className="chat-icon">
                                    <div className="d-flex justify-content-between mt-4">
                                      <a href="#"><FontAwesomeIcon icon={faCalendar} /></a>
                                      <a href="#"><FontAwesomeIcon icon={faPhone} /></a>
                                      <a href="#"><FontAwesomeIcon icon={faVideo} /></a>
                                      <a href="#"><FontAwesomeIcon icon={faEllipsisV} /></a>
                                    </div>
                                  </Col> */}
                                </Row>
                              </div>

                              <div className="light-bg">

                                <Row>
                                  <Col>
                                    <ChatboxDark></ChatboxDark>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col sm={2}>
                                    <div className="chat-per pt-4 pl-4">
                                      <img src={imagePath.loginpicImage} alt="image"/>
                                    </div>
                                  </Col>
                                  <Col sm={10}>
                                    <ChatBoxLight></ChatBoxLight>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm={2}>
                                   
                                  </Col>
                                  <Col sm={10}>
                                    <ChatBoxLight></ChatBoxLight>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>
                                    <ChatboxDark></ChatboxDark>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>
                                    <FormGroup className="chat-fl">
                                      <Input type="textarea" name="text" id="exampleText" />
                                        <a href="#" className="attach"><img src={imagePath.attachImage} alt="image"/></a>
                                        <a href="#" className="chat-bt"><img src={imagePath.chatbtImage} alt="image"/></a>
                                    </FormGroup>
                                  </Col>
                                </Row>

                              </div>

                            </Col>
                          </Row>
                        </div>
                        
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
export default Home;