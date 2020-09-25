import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
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
                        <div className="how">

                          <Row className="px-5 py-5">
                            <Col sm={7}>
                                <div>
                                  <h2 className="mt-5 mb-3">Rent Easier</h2>
                                  <h6>Lorem Ipsum has been the industry's standard dummy 
                                    text ever since the </h6>
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
 industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

<p>It has survived not only five centuries, but also the leap into electronic type the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </Col>
                            <Col sm={5} className="pt-5 mt-2">
                              <img src={imagePath.how1Image} alt="image"/>
                            </Col>
                          </Row>

                          <Row className="px-5">
                            <Col sm={5} className="">
                              <img src={imagePath.how2Image} alt="image"/>
                            </Col>
                            <Col sm={7}>
                                <div>
                                  <h2 className="mt-5 mb-3">Rent Your Way</h2>
                                  <h6>Lorem Ipsum has been the industry's standard dummy 
                                    text ever since the </h6>
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
 industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

<p>It has survived not only five centuries, but also the leap into electronic type the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </Col>
                          </Row>

                        </div>
                        
                        <Row className="px-2 py-4">

                          <Col sm={4} className="px-4">  

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