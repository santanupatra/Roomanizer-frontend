import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formsec from './agentchangePasswordForm';
import Header from '../../Common/agentHeader'
import { Collapse } from 'react-bootstrap';

const changePassword =(props)=> {

 
    return (
      <>
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="mt-5 pt-5">
                  <Col xs={12} sm={12} md={6} lg={6}>
                    <h2 className="text-center mb-3 white-heading">Change Password</h2>
                    <Formsec />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6}>
                    <img src={imagePath.passwordImage} alt="image"/>
                  </Col>
                </Row>
              </Container>
            </div>
     </>
    )
  
}
export default  changePassword;