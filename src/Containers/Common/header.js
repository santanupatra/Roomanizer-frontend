import React,{useState,useEffect} from 'react';
import '../Pages/HomePage/style.css';
import imagePath from '../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import Navbaar from './Navbar';
import LoginNavbar from './LoginNavbar';
import { crudAction } from '../../store/actions/common';

 const  Header =(props)=> {
   console.log('propsuser',props);
  const userId = localStorage.getItem('userId');
  const userToken = localStorage.getItem('access-token')

    
        return (
          <div className="header-sec">
            <Container className="mb-3">
              <Row className="align-items-center">
                <Col>
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
//export default  Header;
const mapStateToProps = state => {
  const { user } = state;
  return {
    user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER"))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);