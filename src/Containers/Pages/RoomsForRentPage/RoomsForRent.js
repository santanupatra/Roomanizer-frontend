import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import Slider from './slider';
import Footer from '../../Common/footer';



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
                      <Col className="sl"><Slider></Slider></Col>
                    </Row>
                      
                      <div className="page-bg">  

                        <Row className="p-3 p-sm-5 p-md-5 p-lg-5">
                          <Col xs={12} sm={12} md={12} lg={4}>
                            <Formsec></Formsec>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={8}>
                            <div className="about mt-0 pb-4">
                              <h4>For Private Room:</h4>
                              <h2 className="blue heading3">$500 / month in Luxembourg</h2>
                            </div>
                            <div className="about">
                              <h4>About Room</h4>
                              <p className="mb-2">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as 
necessary, making this the first true generator on the Internet. 
It uses a dictionary of over 200 Latin words, combined with a handful of model 
sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-
characteristic words etc.</p>
                            <ul className="room-animitices">
                              <li><img src={imagePath.bedImage} alt="image"/>3 Bedrooms</li>
                              <li><img src={imagePath.maleImage} alt="image"/>Male Flatmates</li>
                              <li><img src={imagePath.ageImage} alt="image"/>20-40 Age Range</li>
                              <li><img src={imagePath.bathImage} alt="image"/>1.5 Bathrooms</li>
                              <li><img src={imagePath.washImage} alt="image"/>In-unit Washer/Dryer</li>
                              <li><img src={imagePath.cleanImage} alt="image"/>Weekly Cleaning Personnel</li>
                            </ul>
                            </div>

                            <div className="about">
                              <Row>
                                <Col xs={12} sm={6} md={3} lg={3}>
                                  <h4>Move in:</h4>
                                  <p>Available Now</p>
                                </Col>
                                <Col xs={12} sm={6} md={3} lg={3}>
                                  <h4>Duration:</h4>
                                  <p>1-12 months</p>
                                </Col>
                                <Col xs={12} sm={6} md={3} lg={3}>
                                  <h4>Deposit:</h4>
                                  <p>$500</p>
                                </Col>
                                <Col xs={12} sm={6} md={3} lg={3}>
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