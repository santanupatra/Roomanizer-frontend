import React,{useState} from 'react';
import '../Pages/HomePage/style.css';
import imagePath from '../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Navbaar from './Navbar';
import LoginNavbar from './LoginNavbar';

 const  Header =(props)=> {
  const userId = localStorage.getItem('userId');
  const userToken = localStorage.getItem('access-token')

    
        return (
          <div className="header-sec">
            <Container className="mb-3">
              <Row className="align-items-center">
                <Col sm={5}>
                  <a href="/">
                    <img src={imagePath.LogoImage} href="/" alt="image"/>
                  </a>
                </Col>
                <Col>
                {userToken?<LoginNavbar />:<Navbaar />}
                  

                </Col>
              </Row>
            </Container>
            
          </div>
        )
    
}
export default  Header;