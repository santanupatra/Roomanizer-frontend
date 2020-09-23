import React,{useState} from 'react';
import './HomePage/style.css';
import imagePath from './imageConstants';
import { Container, Row, Col } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Footer extends React.Component {
    render() {
        return (
          <div className="footer-bg">
          <div className="footer-sec">
            <Container className="">
              <Row className="pt-5">
                <Col sm={4}></Col>
                <Col sm={5} className="footer-link">
                  <h6>Contact</h6>
                  <a href="#">Contact Support | </a>
                  <a href="#"> Help Center | </a>
                  <a href="#">Terms and Policies</a>
                </Col>
                <Col sm={3}>
                  <div className="mt-3">
                    <img src={imagePath.footerlogoImage} alt="image"/>
                    <div className="social-ft mt-2">
                      <a href="#"> <img src={imagePath.ft1Image} alt="image"/></a>
                      <a href="#"> <img src={imagePath.ft2Image} alt="image"/></a>
                      <a href="#"> <img src={imagePath.ft3Image} alt="image"/></a>
                      <a href="#"> <img src={imagePath.ft4Image} alt="image"/></a>
                    </div>
                  </div>
                </Col>

              </Row>
            </Container>
            </div>
          </div>
        )
    }
}