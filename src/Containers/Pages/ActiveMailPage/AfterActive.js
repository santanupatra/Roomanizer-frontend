import React, { useState, useEffect } from 'react';
import './style.css';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagePath from '../../../Config/imageConstants';
import Header from '../../Common/header';
import Footer from '../../Common/footer';
import { ACTIVEMAIL_URL } from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


// export default class Home extends React.Component {
  const Home = (props) => {
  const params = props.match.params;
    useEffect(() => {
      // setUserId(params.email)
      if (params.email) props.crudActionCall(`${ACTIVEMAIL_URL}/${params.email}`, null, "UPDATE")
    }, [params]);
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
                          <div className="col-8 text-center thank">
                            
                            <img src={imagePath.thankImage} alt="image"/>
                            <h2><b>Thank You</b></h2>
                            <p>Thank you for choosing Us.</p>

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
const mapStateToProps = state => {
  const { user } = state;
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));

