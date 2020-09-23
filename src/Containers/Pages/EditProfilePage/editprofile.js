import React from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';



const editProfile =(props)=> {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="mt-5 pt-5">
                  <Col className="pr-5">
                    <h2 className="text-center mb-3">My Profile</h2>
                    <Formsec></Formsec>
                  </Col>
                  <Col className="pr-5 pt-5 text-center">
                    <div className="user-pic mt-5">
                      <img src={imagePath.userImage} alt="image"/>
                      <div class="upload-btn-wrapper">
                        <button><FontAwesomeIcon icon={faCamera} /></button>
                        <input type="file" name="myfile" />
                      </div>
                    </div>
                    <div class="thumbnail-file mt-4">
                        <button><h2 className="mb-0 mt-1">+ Add Thumbnail File </h2></button>
                        <p>Recomended resolution 800x500, 650x450</p>
                        <input type="file" name="myfile" />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
        </div>
      </div>
    )
  
}
export default  editProfile;