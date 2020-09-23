import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Pageno from '../pageno';
import Formsec from './form-sec';
import Searchlist from './RoomSearchlist';
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
                        <div className= "border-bottom">
                          <Row>
                            <Col sm={8}>
                                <div className="form-bg2">
                                  <h3 className="mt-3 mb-4">Find A Roommate :</h3>
                                  <Formsec></Formsec>
                                </div>
                            </Col>

                            <Col sm={4} className="d-flex align-items-center pl-0">
                              
                                <a href="#" className="view-bt"><img src={imagePath.listviewImage} alt="image"/>List view</a>
                                <a href="#" className="view-bt"><img src={imagePath.maptviewImage} alt="image"/>Map view</a>
                                <a href="#" className="view-bt"><img src={imagePath.splitviewImage} alt="image"/>Split view</a>
                              
                            </Col>

                          </Row>
                        </div>
                        
                        <Row className="px-2 py-4">
                          <Col sm={7} className="pl-4 pr-0">  

                            <Searchlist></Searchlist>

                          </Col>

                          <Col sm={5} className="px-4">
                            <div className="mapview mt-5">
                                <div className=""><img src={imagePath.mapmarkImage} alt="image"/></div>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d659064.2706871205!2d5.572872077027312!3d49.814834630019895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479545b9ca212147%3A0x64db60f602d392ef!2sLuxembourg!5e0!3m2!1sen!2sin!4v1600248985937!5m2!1sen!2sin" width="100%" height="650px" frameborder="0"></iframe>

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
export default Home;