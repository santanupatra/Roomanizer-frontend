import React from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import Userpic from './user-pic';



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
                    <Formsec></Formsec>
                  </Col>
                  <Col sm={6} className="pr-5 pt-5 text-center">
                   <Userpic></Userpic>
                  </Col>
                </Row>
              </Container>
            </div>
        </div>
      </div>
    )
  
}
export default  editProfile;