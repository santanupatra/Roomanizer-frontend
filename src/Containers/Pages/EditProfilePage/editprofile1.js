import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar,Form,Button,FormGroup } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Userpic from './user-pic';




const EditProfile1 =(props)=> {
  
  const [fields, setImage] = useState({ preview: "", profilePicture: "" });
 
  const [userId, setUserId] = useState(null);
  const params = props.match.params;
  useEffect(() => {
    setUserId(params.userId)
    const action = props.user.action;
    if (props.user.user && params.userId) {
      setImage({ ...fields, ...props.user.user })
    }
    

  }, [props.user]);
  
  


    return (
        <div className="col">
            <Row className="">
                  <Col xs={12} sm={12} md={8} lg={6} className="order-2 order-sm-2 order-md-1 order-lg-1">
                        <div className="login-form mb-5">
                          <Formsec></Formsec>
                        </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={6} className="text-center order-1 order-sm-1 order-md-2 order-lg-2">
                    <Userpic userId={ userId}></Userpic>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile1));
