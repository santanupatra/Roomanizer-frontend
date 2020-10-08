import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar, UncontrolledCollapse } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, CustomInput, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import Facebook from '../facebook';
import Twitter from '../twitter';
import Gsuite from '../gSuite';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import InputUI from '../../../UI/InputUI';
import moment from 'moment';
import { VIEWPROFILE_URL } from '../../../shared/allApiUrl';
import {EDITLANDLORD_URL} from '../../../shared/allApiUrl'
import {ROOM_URL} from '../../../shared/allApiUrl'
import {axiosApiCall} from "../../../api/index";
import {CITY_URL} from '../../../shared/allApiUrl'



const Formsec2 = (props) => {
  const initialFields = {
    firstName: "",
    lastName: "",
    dateOfBirth: null,
   // houseRules:"",
    age: "",
   }
   const initialField = {
   user_Id: "",
   roomNo: "",
   bathNo:"",
   aboutRoom:"",
   address:null,
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
   houseRules:null,
   latitude:null,
   location:[],
   longitude:null,
   moveIn:"",
   noOfBedRoom:null,
   roomName:"",
   zipCode:"",
   ageRange:"",

   }

  
  const [fields, setFields] = useState(initialFields);
  const [field, setField] = useState(initialField);

  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  const [setDate, setStartDate] = useState(new Date());
  const [setRtoM, setmoveIn] = useState(null);
 
  useEffect(() => {
    const  cmsDetail = async()=>{
    setUserId(params.userId)
    if (params.userId) props.crudActionCall(`${VIEWPROFILE_URL}/${params.userId}`, null, "GET")
    // props.crudActionHouseCall(`${ROOM_URL}/${params.userId}`, null, "GET")
    props.crudActionCityCall(CITY_URL, null, "GET_ALL")

    let {data}  =  await axiosApiCall.get(`${ROOM_URL}/${params.userId}`, null)

    setField({ ...field, ...data.data })


    console.log(data.data)
    
    }
  cmsDetail()

  }, [params]);
  
  
  console.log(props.user.user)


  useEffect(() => {
    const action = props.user.action;
    const { type, isSuccess } = props.room.action;
    
    if (props.user.user && params.userId) {
      setFields({ ...fields, ...props.user.user })
      setStartDate(moment(props.user.user.dateOfBirth).toDate())
      setmoveIn(moment(props.user.user.moveIn).toDate())
    }
    if (action.isSuccess && action.type === "UPDATE")
      props.history.push(`/editProfile/${userId}`)
  }, [props.user]);

  const onSubmit = (data) => {
    console.log(data)
    if (userId) data.userId = userId;
    data.user_Id = userId 
    if (setDate) data.dateOfBirth = setDate;
    if (setRtoM) data.moveIn = setRtoM;
   // if (fields.houseRules) data.houseRules=fields.houseRules
    props.crudActionCall(EDITLANDLORD_URL + `/${userId}`, data, "UPDATE");
    props.resetAction();
  }

  // // const options =  [
  // //   { label: "Clean appartment", value: "1" },
  // //   { label: "No smoking", value: "2" },
  // //   { label: "Dog friendly", value: "3" /*, disabled: true*/ },
  // // ];
  // const options = props.city.cityList.map((val) =>  
  // ({ label: val.cityName, value: val._id })  
  // ); 
     
  
  const handleChange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
  const handleChange2 = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
  const handleChange3 = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
  const handleChange4 = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
  const handleChange6 = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
 
  const  handlechange = value => {
    setFields((prevState) => ({ ...prevState, "": value }));
  }
  const  handleDatechange = date => {
    setStartDate(date);
    var diff_ms = Date.now() - date.getTime();
    var age_dt = new Date(diff_ms);
    var realAge = Math.abs(age_dt.getUTCFullYear() - 1970);
    setFields((prevState) => ({ ...prevState, "age": realAge }));
  }

  

    return (
      <div className="">
        
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup row>
                          <Col sm={12}>
                            <Row>
                              <Col className="pr-0">
                                {/* <Input type="text" name="name" id="examplename" placeholder="First Name" /> */}
                                <InputUI
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  placeholder="First Name"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={fields}/>
                              </Col>
                              <Col>
                                {/* <Input type="text" name="name" id="examplename" placeholder="Last Name" /> */}
                                <InputUI
                                  type="text"
                                  name="lastName"
                                  id="lastName"
                                  placeholder="Last Name"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={fields}/>
                              </Col>
                            </Row>
                            <Row>
                            <Input type="text" name="email" id="exampleEmail" placeholder="Location" />
                            <Col>
                            {/* <InputUI
                                  type="text"
                                  name="city"
                                  id="city"
                                  placeholder="City"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={field}/> */}
                                        <Input
                                        type="select"
                                        name="city"
                                        id="city"
                                        innerRef={register}
                                        value={field.city}
                                        onChange={(e) =>
                                          handlechange(e.target.name, e.target.value)
                                        }
                                      >
                                        <option selected disabled>Select A City....</option>
                                      {
                                          props.city && props.city.cityList.map((val) =>{
                                          return(
                                            // <option value={val._id}>{val.cityName}</option>
                                            <option>{val.cityName}</option>
                                          );
                                        })
                                        } 
                          
                                     </Input>
                            
                            </Col>
                            <Col>
                            <InputUI
                                  type="number"
                                  name="zipCode"
                                  id="zipCode"
                                  placeholder="Zip Code"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={field}/>
                            
                            
                            
                            </Col>
                            </Row>
                            {/* <Input type="text" name="email" id="exampleEmail" placeholder="Maximum Budget" /> */}
                             <Row>
                             <Col>
                                  <InputUI
                                  type="text"
                                  name="roomName"
                                  id="roomName"
                                  placeholder="Room Name"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={field}/>                                   
                            </Col>
                            <Col>
                            
                            <InputUI
                                  type="number"
                                  name="area"
                                  id="area"
                                  placeholder="Area in sq/ft"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={field}/>  
                            
                            </Col>
                            </Row>
                            {/* <Input type="textarea" name="text" id="exampleText" placeholder="About Room" /> */}
                            <InputUI
                            type="textarea"
                            name="aboutRoom"
                            id="aboutRoom"
                            placeholder="About Room"
                            errors={errors}
                            innerRef={register({
                             required: 'This is required field',
                            })}
                            fields={field}/>
                            <Row>
                              <Col>
                                {/* <div className="form-group mt-4"> */}
                                  <DatePicker 
                                  selected={setDate} 
                                  className="form-control"
                                  placeholderText="Date of Birth"
                                  onChange={date => handleDatechange(date)}
                                  // value={fields.dateOfBirth}
                                  />
                              {/* </div> */}
                              </Col>
                              <Col className="pl-0">
                                  <InputUI
                                  type="number"
                                  name="age"
                                  placeholder="Age"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={fields.age}/>
                              </Col>
                            </Row>

                            <FormGroup className="mt-3">
                              <Label for="exampleCheckbox" className="filter-mod">No of Bedrooms</Label>
                              <div className="filt d-flex justify-content-between">
                                <CustomInput type="checkbox" id="exampleCustomCheckbox13" label="2 Bedroom" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox14" label="3 Bedroom" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox15" label="4+ Bedroom" />
                              </div>
                            </FormGroup>

                            <FormGroup>
                              <Label for="exampleCheckbox" className="filter-mod">Listing Amenities</Label>
                              <div className="filt d-flex justify-content-between">
                                <CustomInput type="checkbox"id="exampleCustomCheckbox10" label="In-unit Washer" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox11" label="Furnished" />
                                <CustomInput type="checkbox" id="exampleCustomCheckbox12" label="Private Bathroom" />
                              </div>
                              <div className="filt d-flex justify-content-between">                
                                <CustomInput type="checkbox" id="exampleCustomCheckbox16" label="Outdoor Space" />
                              </div>
                            </FormGroup>

                            <FormGroup>
                              <Label for="exampleCheckbox" className="filter-mod">House Rules</Label>
                                <div className="filt d-flex justify-content-between flex-wrap">
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox" label="No Smoking" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="No Pets" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="No Drugs" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox4" label="No Drinking" />               
                                
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox5" label="Dogs Ok" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox6" label="Cats Ok" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox7" label="Other Pets Ok" />
                                  <CustomInput type="checkbox" id="exampleCustomCheckbox8" label="Couples Ok" />
                                </div>
                            </FormGroup>

                              <Row>
                                <Col className="pr-0">
                                  {/* <Input type="select" name="select" id="exampleSelect">
                                    <option>Flatmates</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option value="Other">Other</option>
                                  </Input> */}
                                  <InputUI
                                  type="select"
                                  name="flatmates"
                                  id="flatmates"
                                  placeholder="flatmates"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={field.flateMate}
                                  onChange={(e) =>
                                    handleChange(e.target.name, e.target.value)
                                  }
                                  >
                                  <option>Choose your Flatmates </option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                  </InputUI>
                                </Col>
                                <Col>
                                  {/* <Input type="select" name="select" id="exampleSelect">
                                    <option>Age Range</option>
                                    <option>20-30 Age</option>
                                    <option>30-40 Age</option>
                                  </Input> */}
                                  <InputUI
                                  type="select"
                                  name="ageRange"
                                  id="ageRange"
                                  placeholder="Age Range"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={field.ageRange}
                                  onChange={(e) =>
                                    handleChange3(e.target.name, e.target.value)
                                  }
                                  >
                                  <option>Choose your Age Range </option>
                                  <option value="20-30 Age">20-30 Age</option>
                                  <option value="30-40 Age">30-40 Age</option>
                                  
                                  </InputUI>
                                  
                                </Col>
                              </Row>

                            <Row className="">
                              <Col className="pr-0">
                                {/* <Input type="select" name="select" id="exampleSelect">
                                  <option>Move In ?</option>
                                  <option>Available Now</option>
                                  <option>After 1 Month</option>
                                </Input> */}
                                <DatePicker 
                                selected={setRtoM} 
                                className="form-control"
                                
                                placeholderText="Move In ?"
                                onChange={e => setmoveIn(e)} 
                              />
                              </Col>
                              <Col>
                                {/* <Input type="select" name="select" id="exampleSelect">
                                  <option>Duration</option>
                                  <option>1-12 Months</option>
                                  <option>1-10 Months</option>
                                </Input> */}
                                <InputUI
                                  type="select"
                                  name="duration"
                                  id="duration"
                                  placeholder="Duration"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={field.duration}
                                  onChange={(e) =>
                                    handleChange2(e.target.name, e.target.value)
                                  }
                                  >
                                  <option>Choose your Duration </option>
                                  <option value="1-12 Months">1-12 Months</option>
                                  <option value="1-10 Months">1-10 Months</option>
                                  
                                  </InputUI>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-0">
                                {/* <Input type="text" name="select" id="exampleSelect" placeholder="Deposit">
                                  <option>Deposit</option>
                                  <option>$500</option>
                                  <option>$700</option>
                                </Input> */}
                               <InputUI
                                  type="text"
                                  name="budget"
                                  id="budget"
                                  placeholder="Maximum Budget"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={field}/>
                              </Col>
                              <Col>
                                {/* <Input type="text" name="select" id="exampleSelect" placeholder="Charges">
                                  <option>Charges</option>
                                  <option>$200 or included</option>
                                  <option>$300 or included</option>
                                </Input> */}
                                <InputUI
                                  type="text"
                                  name="deposite"
                                  id="deposite"
                                  placeholder="Deposit"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={field}/>
                              </Col>
                            </Row>
                            <Row>
                           <Col>
                           <InputUI  
                                 type="number"
                                  name="charges"
                                  id="charges"
                                  placeholder="Charges"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={field}/>
                           
                           </Col>
                           
                           
                           <Col>
                            <InputUI
                                  type="select"
                                  name="chargesType"
                                  id="chargesType"
                                  placeholder="Charges Type"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={field.chargesType}
                                  onChange={(e) =>
                                    handleChange4(e.target.name, e.target.value)
                                  }
                                  >
                                  <option>Choose your Charges Type </option>
                                  <option value="monthly">monthly</option>
                                  <option value="yearly">yearly</option>
                                  
                                  </InputUI>
                              </Col>


                            </Row>

                            <div className="mt-4 d-flex align-items-center">
                              <h6 className="social mr-2">Link social media accounts:</h6>
                                <div id="socialmediaLink" className="d-flex">
                                  <Facebook></Facebook>
                                  <Twitter></Twitter>
                                  <Gsuite></Gsuite>
                                </div>
                            </div>
                            <UncontrolledCollapse toggler="#socialmediaLink">
                              <FormGroup>
                                <Input type="text" name="facebookprofile" id="facebookprofile" placeholder="Facebook Link" />
                              </FormGroup>
                              <FormGroup>
                                <Input type="text" name="twitterprofile" id="twitterprofile" placeholder="Twitter Link" />
                              </FormGroup>
                              <FormGroup>
                                <Input type="text" name="googleprofile" id="googleprofile" placeholder="Google Link" />
                              </FormGroup>
                            </UncontrolledCollapse>
                            <div className="text-center">
                              {/* <a href="#" className="login-bt mt-4 mb-2">Submit</a> */}
                              <Button type="submit" className="login-bt mt-4 mb-2"> Submit </Button>
                              <img src={imagePath.orImage} alt="image"/>
                              <a href="#"><img src={imagePath.fbImage} alt="image"/></a>
                              <a href="#"><img src={imagePath.gsImage} alt="image"/></a>
                              </div>
                          </Col>
                        </FormGroup>
                      </Form>
      </div>
    );
  }
  
  const mapStateToProps = state => {
    const { user,room,city} = state;
    return {
      user,
      room,
      city,
      
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
      resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
      crudActionHouseCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM")),
    crudActionCityCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY"))


      

    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Formsec2));
  
  
  
  
  
  
  //export default Formsec2;