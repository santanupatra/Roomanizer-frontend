import React, { useState, useEffect } from 'react';
import './style.css';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagePath from '../../../Config/imageConstants';
import Header from '../../Common/header';
import Footer from '../../Common/footer';


  const Home = (props) => {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg d-flex align-items-center">
                        
                        <div className="Row d-flex w-100 justify-content-center">
                          <div className="col-8 text-center thank">
                            
                            <img src={imagePath.thankImage} alt="image" className="img-fluid" />
                            <h2><b>Thank You</b></h2>
                            <p>Thank you for choosing Us.</p>

                          </div>
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

