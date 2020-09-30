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


const EditProfile2 =(props)=> { 
    return (
      <div className="">
                <Row className="">
                  <Col sm={6} className="pr-5">
                        <div className="login-form mb-5">
                          <Formsec2></Formsec2>
                        </div>
                  </Col>
                  <Col sm={6} className="pr-5 text-center">
                    <Roompic></Roompic>
                  </Col>
                </Row>
      </div>
    )
  
}
export default  EditProfile2;