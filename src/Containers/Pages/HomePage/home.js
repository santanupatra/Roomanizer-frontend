import React,{useState} from 'react';
import './style.css';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import Footer from '../../Common/footer';


export default class Home extends React.Component {
  

  render() {
    return (
      <div className="home">
        <div className="header">
          <Header />
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg d-flex align-items-center">
                        
                        <div className="Row d-flex w-100 justify-content-center">
                          <div className="col-8">
                              
                                <Formsec></Formsec>


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
}