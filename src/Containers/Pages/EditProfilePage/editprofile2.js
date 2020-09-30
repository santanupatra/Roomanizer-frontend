import React from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec2 from './form-sec2';
import Roompic from './room-pic';


const editProfile =(props)=> { 
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="mt-5 pt-5">
                  <Col sm={6} className="pr-5">
                    <h2 className="text-center mb-3">My Profile</h2>
                    <Formsec2></Formsec2>
                  </Col>
                  <Col sm={6} className="pr-5 pt-5 text-center">
                    <Roompic></Roompic>
                  </Col>
                </Row>
              </Container>
            </div>
        </div>
      </div>
    )
  
}
export default  editProfile;