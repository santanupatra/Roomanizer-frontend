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
            <div className="">
              <Container className="mb-3">
                <Row className="mt-5 pt-5">
                  <Col className="pr-5">
                    <h2 className="text-center mb-3">Sign up</h2>
                    <SignUpFrom />
                  </Col>
                  <Col className="pr-5">
                    <img src={imagePath.signupImage} alt="image"/>
                  </Col>
                </Row>
              </Container>
            </div>
        </div>
      </div>
    )
  }
}