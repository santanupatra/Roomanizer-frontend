import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Cardbox from './card';
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
                            <Col sm={12}>
                                <div className="px-4">
                                  <h3 className="mt-5 mb-0">Favorites Room :</h3>

                                </div>
                            </Col>
                          </Row>
                        </div>
                        
                        <Row className="px-2 py-4">

                          <Col xs={12} sm={12} md={6} lg={4} className="px-4">  
                            <Cardbox></Cardbox>
                          </Col>

                          <Col xs={12} sm={12} md={6} lg={4} className="px-4">  
                            <Cardbox></Cardbox>
                          </Col>

                          <Col xs={12} sm={12} md={6} lg={4} className="px-4">  
                            <Cardbox></Cardbox>
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