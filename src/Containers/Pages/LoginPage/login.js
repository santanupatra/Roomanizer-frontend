import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header'
import LoginFrom from './loginFrom';


function Login () {

  
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
              <Container className="mb-3">
                <Row>
                  <Col xs={12} sm={12} md={12} lg={6} className="pr-lg-5">
                    <h2 className="white-heading text-center mb-3">Login</h2>
                    <LoginFrom />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6}>
                    <img src={imagePath.loginImage} alt="image"/>
                  </Col>
                </Row>
              </Container>
        </div>
      </div>
    )
  
}
export default Login;
