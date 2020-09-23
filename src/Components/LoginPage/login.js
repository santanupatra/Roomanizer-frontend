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


export default class Home extends React.Component {

  render() {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="mt-5 pt-5">
                  <Col sm={6} className="pr-5">
                    <h2 className="text-center mb-3">Login</h2>
                    <Formsec></Formsec>
                  </Col>
                  <Col sm={6}>
                    <img src={imagePath.loginImage} alt="image"/>
                  </Col>
                </Row>
              </Container>
            </div>
        </div>
      </div>
    )
  }
}