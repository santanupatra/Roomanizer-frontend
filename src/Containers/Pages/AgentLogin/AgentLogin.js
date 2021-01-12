import React from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, FormGroup, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';


function AgentLogin () {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
              <Container className="mb-3">
                <Row>
                  <Col xs={12} sm={12} md={12} lg={6} className="pr-lg-5">
                    <h2 className="white-heading text-center mb-3">Agent Login</h2>
                    <div className="login-form">
                      <FormGroup>
                        <Col sm={12}>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="username"
                          />
                          <Input
                            type="password"
                            name="password"
                            placeholder="password"
                          />
                          <a className="forgot"><p>Forgot Password?</p></a>
                          <Button type="button" className="login-bt">
                            Submit
                          </Button>
                        </Col>
                      </FormGroup>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6}>
                    <img src={imagePath.loginImage} alt="image"/>
                  </Col>
                </Row>
              </Container>
        </div>
      </div>
    )
  
}
export default AgentLogin;
