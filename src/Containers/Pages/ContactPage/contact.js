import React,{useState} from 'react';
import './style.css';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import imagePath from '../../../Config/imageConstants';
import Header from '../../Common/header';
import Footer from '../../Common/footer';


export default class Home extends React.Component {

  render() {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">
                        
                        <Row className="d-flex justify-content-center">
                          <Col sm={8} className="contactus">
                            <h2>Contact Us</h2>
                            
                            <Form>
                              
                                  <Row form>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="exampleEmail">First Name</Label>
                                        <Input type="text" name="name" id="exampleEmail" placeholder="Carls" />
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="examplePassword">Last Name</Label>
                                        <Input type="text" name="name" id="examplePassword" placeholder="Jhons" />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                              <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email Id" />
                              </FormGroup>
                              <FormGroup>
                                <Label for="exampleAddress">Subject</Label>
                                <Input type="text" name="address" id="exampleAddress" placeholder="Subject"/>
                              </FormGroup>
                              <FormGroup>
                                <Label for="exampleText">Message</Label>
                                <Input type="textarea" name="text" id="exampleText" />
                              </FormGroup>
                              <a href="#" className="black-bt mb-3">Submit</a>
                            </Form>
                          </Col>
                        </Row>

                      </div>
                  </Col>
                </Row>
              </Container>
            </div>
        </div>
      <Footer></Footer>
      </div>
    )
  }
}