import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar,Form,Button,FormGroup } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import EditProfile1 from './editprofile1';




const EditProfile =(props)=> {
  
  const [fields, setImage] = useState({ preview: "", profilePicture: "" });
 
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  useEffect(() => {
    setUserId(params.userId)
    const action = props.user.action;
    if (props.user.user && params.userId) {
      setImage({ ...fields, ...props.user.user })
    }
    

  }, [props.user]);
  


    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="mt-5 pt-5">
                  <Col className="pr-5">
                    <h2 className="text-center mb-3">My Profile</h2>

                        {/* Toggle */}
                        <div className="text-center mb-4">
                            <label class="switch">
                               <input type="checkbox"/>
                               <span class="slider round"></span>
                            </label>
                            <span className="mt-2 d-block">
                               <a href="#" className="toggle pr-3">I am looking for a room</a>
                               <a href="#" className="toggle border-right-0 pl-3">I have an available room</a>
                            </span>
                        </div>

                  </Col>
                </Row>

                <Row>
                    <EditProfile1></EditProfile1>
                </Row>

              </Container>
            </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));
