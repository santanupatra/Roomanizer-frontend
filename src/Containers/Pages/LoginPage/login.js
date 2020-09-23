import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header'
import LoginFrom from './loginFrom';


export default class Home extends React.Component {

  render() {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="mt-5 pt-5">
                  <Col sm={6} className="pr-5">
                    <h2 className="text-center mb-3">Login</h2>
                    <LoginFrom />
                  </Col>
                  <Col sm={6}>
                    <img src={imagePath.loginImage} alt="image"/>
                  </Col>
                </Row>
              </Container>
            </div>
        </div>
      </div>
    )
  }
}