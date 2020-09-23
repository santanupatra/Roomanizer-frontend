import React,{useState} from 'react';
import './style.css';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import Footer from '../../Common/footer';



const userProfile = (props)=>  {

    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">  

                        <Row className="p-5">
                          <Col sm={4}>
                            <Formsec></Formsec>
                          </Col>

                          <Col sm={8}>
                            <div className="about mt-0">
                              <h4>About Carls Jhons</h4>
                              <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as 
necessary, making this the first true generator on the Internet. 
It uses a dictionary of over 200 Latin words, combined with a handful of model 
sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-
characteristic words etc.</p>
                            </div>
                            <div className="about">
                              <h4>Maximum Budget:</h4>
                              <p>$ 500/month</p>
                            </div>
                            <div className="about">
                              <Row>
                                <Col sm={4}>
                                  <h4>Move in Date:</h4>
                                  <p>Immediately</p>
                                </Col>
                                <Col sm={8}>
                                  <h4>Occupation:</h4>
                                  <p>Students</p>
                                </Col>
                              </Row>
                            </div>
                            <div className="about">
                              <h4>Roommate Preferences:</h4>
                              <ul className="pre pl-1 mb-4">
                                <li>Every few days clean my appartment</li>
                                <li>No smoking</li>
                                <li>Dog friedly</li>
                              </ul>
                            </div>
                            <div className="about border-0">
                              <h4>Looking for a room in:</h4>
                              <ul className="look pl-1">
                                <li>Greater London</li>
                                <li>Southwark</li>
                                <li>Zone 1</li>
                              </ul>
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
export default  userProfile;