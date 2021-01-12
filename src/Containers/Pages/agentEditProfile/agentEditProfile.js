import React from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, FormGroup, Label, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


const AgentEditProfile = () => {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
              <Container className="mb-3">
                <Row className="justify-content-center mt-5">
                  <Col xs={12} sm={12} md={12} lg={10}>
                  <h2 className="mb-5">Agent Edit Profile</h2>
                  <div className="userDetailsBox p-4 bg-white mt-5">
                    <div className="AgentDP mb-5">
                      <img src={imagePath.profileImage} alt="agentdp" />
                      <div className="uploadAgentDP">
                        <input type="file" />
                        <FontAwesomeIcon icon={faUpload} />
                      </div>
                    </div>

                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>First Name</Label>
                          <input className="input" type="text" placeholder="Enter First Name" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Last Name</Label>
                          <input className="input" type="text" placeholder="Enter Last Name" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Email</Label>
                          <input className="input" type="email" placeholder="Enter Email" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>City</Label>
                          <input className="input" type="text" placeholder="Enter City" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                          <Label>Address</Label>
                          <textarea className="input" placeholder="Enter Address"></textarea>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Zip Code</Label>
                          <input className="input" type="text" placeholder="Enter Zip Code" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Phone No</Label>
                          <input className="input" type="tel" placeholder="Enter Phone No." />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Facebook Profile</Label>
                          <input className="input" type="url" placeholder="Facebook URL" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>YouTube Profile</Label>
                          <input className="input" type="url" placeholder="EnYouTube URL" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="blue" className="px-4">Save</Button>
                    
                    
                    
                    
                  </div>
                </Col>
                </Row>
              </Container>
        </div>
      </div>
    )
}
export default AgentEditProfile;
