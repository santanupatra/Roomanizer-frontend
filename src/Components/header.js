import React,{useState} from 'react';
import './HomePage/style.css';
import imagePath from './imageConstants';
import { Container, Row, Col } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Navbaar from './Navbar';

export default class Header extends React.Component {
    render() {
        return (
          <div className="header-sec">
            <Container className="mb-3">
              <Row className="align-items-center">
                <Col>
                    <img src={imagePath.LogoImage} alt="image"/>
                </Col>
                <Col>
                  <Navbaar></Navbaar>
                </Col>
              </Row>
            </Container>
            
          </div>
        )
    }
}