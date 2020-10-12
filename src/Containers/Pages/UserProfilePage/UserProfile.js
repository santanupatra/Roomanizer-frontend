import React,{useState , useEffect} from 'react';
import './style.css';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import Footer from '../../Common/footer';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { USER_URL } from '../../../shared/allApiUrl';
//import { getImageUrl } from '../../../hared/helpers';
import moment from 'moment'





const UserProfile = (props)=>  {
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
occupation:" "
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
      <div className="home">
        <div className="header">
          <Header></Header>
          
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">  
                      
                        <Row className="p-3 p-sm-5 p-md-5 p-lg-5">
                          <Col xs={12} sm={12} md={12} lg={4}>
                            <Formsec></Formsec>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={8}>
                            <div className="about mt-0">
                              <h4>About {fields.firstName + ' ' + fields.lastName}</h4>
                              <p>{fields.aboutMe}</p>
                            </div>
                            <div className="about">
                              <h4>Maximum Budget:</h4>
                                <p>$ {fields.maxBudget}/month</p>
                            </div>
                            <div className="about">
                              <Row>
                                <Col sm={4}>
                                  <h4>Move in Date:</h4>
                                       <p>{(fields.readyToMove)? moment(fields.readyToMove).format('YYYY-MM-DD') : ''}</p>
                                </Col>
                                <Col sm={8}>
                                  <h4>Occupation:</h4>
                                       <p>{fields.occupation}</p>
                                </Col>
                              </Row>
                            </div>
                            <div className="about">
                              <h4>Roommate Preferences:</h4>
                              <ul className="pre pl-1 mb-4">
                            {fields.houseRules.map(val => {
                                   return (
                                    <li>{val.label}</li>
                                   )
                            })}
                              </ul>
                            </div>
                            <div className="about border-0">
                              <h4>Looking for a room in:</h4>
                              <ul className="look pl-1">
                                <li>Greater London</li>
                                <li>Southwark</li>
                                <li>Zone 1</li>
                              </ul>
                            
                            </div>
                            
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
//export default  userProfile;