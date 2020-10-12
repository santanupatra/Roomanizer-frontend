import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import Facebook from '../facebook';
import Twitter from '../twitter';
import Gsuite from '../gSuite';
import Email from '../email';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { USER_URL } from '../../../shared/allApiUrl';
//import { getImageUrl } from '../../../hared/helpers';
import moment from 'moment'
import { NavLink, withRouter } from 'react-router-dom';
import {getImageUrl} from '../../../shared/helpers'



const FormSec = (props) => {
console.log(props.user.user)
const initialFields = {
aboutMe: " ",
createdDate: " ",
dateOfBirth: " ",
email: " ",
firstName: " ",
gender: " ",
houseRules: [],
lastLogin: " ",
lastName: " ",
//location: {type: "Point", coordinates: Array(0)}
maxBudget: " ",
profilePicture: " ",
readyToMove: " ",
userType: " ",
occupation:" ",
age:" "

    }
  
  
  
    //const params = props.match.params;
  let userId = props.match.params.userId;
  // const userData = props.user.user;
  const [fields, setFields] = useState(initialFields);
  const [userData, setUserDate] = useState(null);
  const [settingId, setSettingId] = useState(null);


  useEffect(() => {
    props.crudActionCall(`${USER_URL}/${userId}`, null, "GET")
    //setUserDate(props.user.action.data);
    

    
  },[userId]);

  useEffect(() => {
    const action = props.user.user;

    if (props.user.user) {
      setFields({ ...fields, ...props.user.user });
     setSettingId(props.user.user._id);
     
    }
    

  }, [props.user]);
   console.log(fields.houseRules)
    return (
    
                <div className="left-box text-center">
                    <div className="profile-img mb-2">
                      {/* <img src={fields.profilePicture} alt="image"/> */}
                      <img src={getImageUrl(fields.profilePicture)} className="img-avatar" alt="admin" />
                    </div>
                      <h2>{fields.firstName + ' ' + fields.lastName}</h2>
                       <h6 className="mb-3">{fields.gender?fields.gender:''}  |  Age: {fields.age}</h6>
                            
                    <div>
                      <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                      </label>
                      <span className="mt-2 mb-5 d-md-flex d-lg-flex justify-content-between">
                        <NavLink to="#" className="toggle pr-3">I am looking for a room</NavLink>
                        <NavLink to="#" className="toggle border-right-0 pl-3">I have an available room</NavLink>
                      </span>
                    </div>
                    <a href="#" className="login-bt mb-2">Messsage</a>
                    {/* <div className="mt-3 d-flex align-items-center justify-content-center">
                      <Facebook></Facebook>
                      <Twitter></Twitter>
                      <Gsuite></Gsuite>
                      <Email></Email>
                    </div> */}
                </div>
       
    );
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormSec));





  //export default Formsec;