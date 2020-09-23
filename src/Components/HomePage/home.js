import React,{useState} from 'react';
import './style.css';
import imagePath from '../imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Header from '../header';
import Formsec from './form-sec';
import Footer from '../footer';


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
                      <div className="page-bg d-flex align-items-center">
                        
                        <div className="Row d-flex w-100 justify-content-center">
                          <div className="col-8">
                              <a href="#" class="form-bt ml-5">Find a Place</a>
                              <a href="#" class="form-bt-light">Find Roommate</a>
                              <div className="form-bg">
                                <Formsec></Formsec>

                              </div>
                          </div>
                        </div>

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