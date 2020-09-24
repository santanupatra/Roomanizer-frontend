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
                        
                        <Row className="contactus d-flex justify-content-center">
                          <Col sm={8}>
                            <h2>Contact Us</h2>
                            
                            <Form>
                              <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email Id" />
                              </FormGroup>
                              <FormGroup>
                                <Label for="exampleAddress">Address</Label>
                                <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
                              </FormGroup>
                              <FormGroup>
                                <Label for="exampleText">Message</Label>
                                <Input type="textarea" name="text" id="exampleText" />
                              </FormGroup>
                              <a href="#" className="black-bt">Submit</a>
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