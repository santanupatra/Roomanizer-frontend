import React from 'react';
import './style.css';
import { Container, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import Footer from '../../Common/footer';
import { NavLink } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="header">
          <Header />
            <Container className="mb-3">
              <div className="page-bg d-flex align-items-center justify-content-center">
                <Col xs={12} sm={12} md={12} lg={8}>
                  <Formsec></Formsec>
                  <NavLink className="link font-weight-bold mt-2 d-inline-block" to="#">Don’t see your city? Request it!</NavLink>
                </Col>
              </div>
            </Container>
        </div>
      <Footer></Footer>
      </div>
    )
  }
}