import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar, Form, Button, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import EditProfile2 from './editprofile2';
import EditProfile1 from './editprofile1';
import { USER_URL } from '../../../shared/allApiUrl';

const EditProfile = (props) => {

  const [fields, setImage] = useState({ preview: "", profilePicture: "" });
  const [userType, setUserType] = useState({'userType':localStorage.getItem('userType')});

  const [userId, setUserId] = useState(null);
  const params = props.match.params;

  useEffect(() => {
    setUserId(params.userId)
    const action = props.user.action;
    if (props.user.user && params.userId) {
      setImage({ ...fields, ...props.user.user })
    }
    
  }, [props.user]);

  const handleChnage =(e)=>{
    
    if(e.target.checked==true){
       
       localStorage.setItem('userType','landlord')
       setUserType({userType:'landlord'});
       props.crudActionCall(`${USER_URL}` + `/${userId}`, {'userType':'landlord'}, "UPDATE");

    }else{
      localStorage.setItem('userType','customer')
      setUserType({userType:'customer'});
      props.crudActionCall(`${USER_URL}` + `/${userId}`, {'userType':'customer'}, "UPDATE");

    }
  }

 
  let checked;
  if(userType.userType ==='customer'){
   checked=false;
  }else if(userType.userType ==='landlord'){
   checked=true;
  }
  console.log(userType, 'edit profile===========================')
  return (
    <div className="home">
      <div className="header">
        <Header></Header>
        <div className="">
          <Container className="mb-3">
            <Row className="mt-5 pt-5">
              <Col xs={12} sm={12} md={6} lg={6} className="pr-5">
                <h2 className="white-heading text-center mb-3">My Profile</h2>

                {/* Toggle */}
                <div className="text-center mb-4">
                  <label class="switch">
                  <input type="checkbox" name="userType" value={userType.userType} onClick={handleChnage} defaultChecked={checked}/>
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
              {userType.userType == 'customer' ?
                <EditProfile1 /> : <EditProfile2 />}
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
