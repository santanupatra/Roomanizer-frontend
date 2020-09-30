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
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="mt-5 pt-5">
                  <Col className="pr-5">
                    <h2 className="text-center mb-3">My Profile</h2>
                    <Formsec></Formsec>
                  </Col>
                  <Col className="pr-5 pt-5 text-center">
                    <div className="user-pic mt-5">
                      {/* <img src={getImageUrl(fields.profilePicture)} className="rounded-circle" style={{ height: "100%" }} alt="..."/> */}
                      <img src={fields.preview} alt="dummy" width="300" height="300" />
                      <div class="upload-btn-wrapper">
                        <button type="button" onSubmit={handleSubmit(handleFileChange)}><FontAwesomeIcon icon={faCamera} /></button>
                      <input type="file" name="profilePicture"   register={register} errors={errors}  required={true} onChange={handleFileChange}/>
                        
                      </div>
                    </div>
                    
                    
                    {/* <div class="thumbnail-file mt-4">
                        <button><h2 className="mb-0 mt-1">+ Add Thumbnail File </h2></button>
                        <p>Recomended resolution 800x500, 650x450</p>
                        <input type="file" name="myfile" />
                    </div> */}
                  </Col>
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
