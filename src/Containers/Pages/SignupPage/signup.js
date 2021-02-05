import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import SignUpFrom from './SignUpFrom';


export default class Home extends React.Component {

  render() {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
              <Container className="mb-3">
                <Row>
                  <Col xs={12} sm={12} md={12} lg={6} className="pr-lg-5">
                    <h2 className="white-heading custm_h2">Sign up</h2>
                    <SignUpFrom />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6}>
                    <img src={imagePath.signupImage} alt="image"/>
                  </Col>
                </Row>
              </Container>
        </div>
      </div>
    )
  }
}