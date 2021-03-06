
import React, { useState, useEffect } from 'react';

import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec2 from './form-sec2';
import Roompic from './room-pic';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Userpic from './user-pic';


const EditProfile2 =(props)=> { 

  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  useEffect(() => {
    setUserId(params.userId)
    const action = props.user.action;
    // if (props.user.user && params.userId) {
    //   setImage({ ...fields, ...props.user.user })
    // }
    

  }, [props.user]);
  
    return (
      <div className="">
                <Row className="">
                  <Col xs={12} sm={12} md={12} lg={6} className="pr-5 order-2 order-sm-2 order-md-2 order-lg-1">
                        <div className="login-form mb-5">
                          <Formsec2></Formsec2>
                        </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} className="pr-5 text-center order-1 order-sm-1 order-md-1 order-lg-2">
                    <Roompic userId={ userId} ></Roompic>
                  </Col>
                </Row>
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
    resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile2));



//export default  EditProfile2;