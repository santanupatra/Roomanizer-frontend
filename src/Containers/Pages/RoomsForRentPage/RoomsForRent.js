import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import Slider from './slider';
import Footer from '../../Common/footer';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { ROOM_URL } from '../../../shared/allApiUrl';
//import { getImageUrl } from '../../../hared/helpers';
import moment from 'moment'
import { withRouter } from 'react-router-dom';
import {getImageUrl} from '../../../shared/helpers'



//export default class Home extends React.Component {
  const Home = (props) => {
    console.log(props.room)
    const initialFields = {
      user_Id: "",
      roomNo: "",
      bathNo:"",
      aboutRoom:"",
      address:"",
      age:"",
      aminities: null,
      area:"",
      budget:"",
      charges:"",
      chargesType:"",
      city:"",
      deposite:"",
      duration:"",
      flateMate:"",
      houseRules:[],
      latitude:null,
      location:[],
      longitude:null,
      moveIn:"",
      noOfBedRoom:'',
      roomName:"",
      zipCode:"",
      ageRange:"",
      aminities:[]
    
        }
      
      
      
        //const params = props.match.params;
      let userId = props.match.params.userId;
      // const userData = props.user.user;
      const [fields, setFields] = useState(initialFields);
      const [userData, setUserDate] = useState(null);
      const [settingId, setSettingId] = useState(null);
    
    
      useEffect(() => {
        props.crudActionCall(`${ROOM_URL}/${userId}`, null, "GET")
        //setUserDate(props.user.action.data);
        
    
        
      },[userId]);
    
      useEffect(() => {
        const action = props.room.room;
    
        if (props.room.room) {
          setFields({ ...fields, ...props.room.room });
         setSettingId(props.room.room._id);
         
        }
        
    
      }, [props.room]);
       console.log(fields.houseRules)
       console.log(fields.roomImage)
  
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                    <Row className="mb-4">
                      <Col className="sl"><Slider></Slider></Col>
                    </Row>
                      
                      <div className="page-bg">  

                        <Row className="p-3 p-sm-5 p-md-5 p-lg-5">
                          <Col xs={12} sm={12} md={12} lg={4}>
                            <Formsec></Formsec>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={8}>
                            <div className="about mt-0 pb-4">
                              <h4>For Private Room:</h4>
                              <h2 className="blue">${fields.charges} / {fields.chargesType} in {fields.city} </h2>
                            </div>
                            <div className="about">
                              <h4>About Room</h4>
                              <p className="mb-2">{fields.aboutRoom}</p>
                            <ul className="ab pl-0 d-flex justify-content-between mb-1">
                               <li><img src={imagePath.bedImage} className="pr-1" alt="image"/>{fields.noOfBedRoom}</li>
                              <li><img src={imagePath.maleImage} className="pr-1" alt="image"/>{fields.flateMate} Flatmates</li>
                              <li><img src={imagePath.ageImage} className="pr-1" alt="image"/>{fields.ageRange}</li>
                              <li><img src={imagePath.bathImage} className="pr-1" alt="image"/>{fields.bathNo} Bathrooms</li>
                            </ul>
                            <ul className="ab pl-0 d-flex mb-4">
                            {fields.aminities.map(val => {
                                   return (
                                   <li><img src={fields.aminitiesImage?fields.aminitiesImage:imagePath.bedImage} className="pr-1" alt="image"/>{val.label}</li>
                                   )
                            })}
                              {/* <li><img src={imagePath.cleanImage} className="pl-4 pr-1" alt="image"/>Weekly Cleaning Personnel</li> */}
                            </ul>
                            </div>

                            <div className="about">
                              <Row>
                                <Col xs={12} sm={6} md={3} lg={3}>
                                  <h4>Move in:</h4>
                                  {/* {(val.readyToMove) ? moment(val.readyToMove).format('YYYY-MM-DD') : ''} */}
                                      <p>{fields.moveIn? moment(fields.moveIn).format('YYYY-MM-DD') : ''}</p>
                                </Col>
                                <Col xs={12} sm={6} md={3} lg={3}>
                                  <h4>Duration:</h4>
                                     <p>{fields.duration?fields.duration:"00"}</p>
                                </Col>
                                <Col xs={12} sm={6} md={3} lg={3}>
                                  <h4>Deposit:</h4>
                                      <p>${fields.deposite?fields.deposite:"00"}</p>
                                </Col>
                                <Col xs={12} sm={6} md={3} lg={3}>
                                  <h4>Charges:</h4>
                                  <p>${fields.charges?fields.charges:"00"} or Included</p>
                                </Col>
                              </Row>
                            </div>
                            <div className="about">
                              <h4>House Rules:</h4>
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
                            <div className="locat mb-3">{fields.address}</div>
                              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d659064.2706871205!2d5.572872077027312!3d49.814834630019895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479545b9ca212147%3A0x64db60f602d392ef!2sLuxembourg!5e0!3m2!1sen!2sin!4v1600248985937!5m2!1sen!2sin" width="100%" height="200px" frameborder="0"></iframe> */}
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
  const { room } = state;
  return {
    room
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));











