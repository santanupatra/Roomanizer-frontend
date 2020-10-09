import React ,{useEffect}from 'react';
import './style.css';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Pageno from '../pageno';
import Formsec from './form-sec';
import Cardbox from './card';
import Footer from '../../Common/footer';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { USER_URL } from '../../../shared/allApiUrl';
import { getImageUrl } from '../../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment'


const RoomMateSearch =(props)=> {

  console.log(props.user.userList.count)
  const getUserList = () => {
    props.crudActionCall(USER_URL + '?keyword&page=0', null, "GET_ALL")
}

useEffect(() => {
    getUserList();
    return () => {
        // cleanup
    }
}, []);

useEffect(() => {
    const { type, isSuccess } = props.user.action;
    if (type === "DELETE" && isSuccess)
        getUserList();
}, [props.user]);
  console.log(props.user.userList.list)
  
  

   
  
  
  
  return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">  
                        <Row>
                          <Col xs={12} m={12} md={12} lg={12}>
                              <div className="form-bg1">
                                <h3 className="heading2 mt-3 mb-4">Find A Roommate :</h3>
                                <Formsec></Formsec>
                              </div>
                          </Col>
                        </Row>

                        <Col xs={12} m={12} md={12} lg={12}>
                          <h3 className="heading2 mt-3 mb-4">All Roommates {props.user.userList.count - 1}    Results</h3>
                        </Col>
                        
                        <Col xs={12} m={12} md={12} lg={12}>
                          <Row className="d-flex flex-wrap">
                            {props.user && props.user.userList.count > 0 ? props.user.userList.list.map((val) => {
                              return (
                                <Col xs={12} sm={6} md={6} lg={4} className="mb-4">
                                  <div>
                                    <Cardbox val={val}></Cardbox>
                                  </div>
                                </Col>
                                  );
                                })
                                : null}
                          </Row>
                        </Col>

                        

                        <Row>
                          <Col>
                            <Pageno></Pageno>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomMateSearch));
//export default  roomMateSearch;