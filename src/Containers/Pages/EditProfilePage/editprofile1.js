import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar,Form,Button,FormGroup } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import { PROFILEPICTURE_URL } from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Userpic from './user-pic';




const EditProfile1 =(props)=> {
  
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
  
  const handleFileChange = (data) => {
    data.preventDefault();
    console.log(data.target.files[0])
    

    if (data.target.files.length) {
      setImage({
        preview: URL.createObjectURL(data.target.files[0]),
        profilePicture: data.target.files[0]
      });
    }
   
   
  
    fields.profilePicture = data.target.files[0]
    console.log(fields.profilePicture)
    
    const formData = new FormData() 
  formData.append('profilePicture', fields.profilePicture)
    console.log(formData)
    props.crudActionCall(PROFILEPICTURE_URL + `/${userId}`,formData, "UPDATE");
    props.resetAction();
  }


    return (
        <div>
            <Row className="">
                  <Col sm={6} className="pr-5">
                        <div className="login-form mb-5">
                          <Formsec></Formsec>
                        </div>
                  </Col>
                  <Col sm={6} className="pr-5 text-center">
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
