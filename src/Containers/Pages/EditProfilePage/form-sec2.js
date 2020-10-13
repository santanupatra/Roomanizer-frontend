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
import {HOUSE_RULE_URL} from '../../../shared/allApiUrl'
import MultiSelect from "react-multi-select-component";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import InputUI from '../../../UI/InputUI';
import moment from 'moment';
import { callApi} from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";
import {ROOM_URL,USER_URL,CITY_URL,LANDLORD_URL,AMINITIES_URL} from '../../../shared/allApiUrl'
import {axiosApiCall} from "../../../api/index";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
//import 'react-google-places-autocomplete/dist/index.min.css';
import Geocode from "react-geocode";
const palceKey = "AIzaSyA5LrPhIokuSBO5EgKEcfu859gog6fRF8w";
  Geocode.setApiKey(palceKey);
  Geocode.setLanguage("en");



const Formsec2 = (props) => {
  const initialFields = {
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    facebookLink:'',
    twitterLink:'',
    gsuiteLink:'',
    age:"",
   }
   const initialField = {
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
   houseRules:null,
   latitude:null,
   location:[],
   longitude:null,
   moveIn:"",
   noOfBedRoom:"",
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
  const [aminitiesOption, setAminitiesOption] = useState([]);
 
  useEffect(() => {
    const  cmsDetail = async()=>{
    setUserId(params.userId)
    if (params.userId) props.crudActionCall(`${USER_URL}/${params.userId}`, null, "GET")
    props.crudActionHouseCall(HOUSE_RULE_URL, null, "GET_ALL")
    props.crudActionCityCall(CITY_URL, null, "GET_ALL")

    let {data}  =  await axiosApiCall.get(`${ROOM_URL}/${params.userId}`, null)
    
    setField({ ...field, ...data.data })
    callApi(apiBaseUrl+"/web/"+AMINITIES_URL,'GET','').then(
      response => {
        let option = response.data.map((val) =>  
          ({ label: val.name, value: val._id })  
        );
        setAminitiesOption(option);
      }
    )
    if(data.data){
    setmoveIn(moment(data.data.moveIn).toDate())
    }  
    console.log(data.data)
    
    }
  cmsDetail()
  

  }, [params]);
  
  
  
  console.log(props.user.user)
 



  useEffect(() => {
    const action = props.user.action;
    const { type, isSuccess } = props.house.action;
    
    if (props.user.user && params.userId) {
      setFields({ ...fields, ...props.user.user })
      setStartDate(moment(props.user.user.dateOfBirth).toDate())
      //setmoveIn(moment(props.user.user.moveIn).toDate())
     // setmoveIn(moment(data.data.moveIn).toDate())

    }
    if (action.isSuccess && action.type === "UPDATE")
      props.history.push(`/editProfile/${userId}`)
  }, [props.user,props.house]);
  // console.log(fields.socialMediaLink.facebookLink)
 
  const onSubmit = (data) => {
    data.longitude = field.longitude;
    data.latitude = field.latitude;
    data.address = field.address;
    console.log(data)
    if (userId) data.userId = userId;
    data.user_Id = userId 
    if (setDate) data.dateOfBirth = setDate;
    if (setRtoM) data.moveIn = setRtoM;
    if (field.houseRules) data.houseRules=field.houseRules
    if (field.noOfBedRoom) data.noOfBedRoom=field.noOfBedRoom
    if (field.aminities) data.aminities=field.aminities
    props.crudActionCall(LANDLORD_URL + `/${userId}`, data, "UPDATE");
    props.resetAction();
  }

  // const options1 =  [
  //   { label: "Furnished", value: "1" },
  //   { label: "Private Bathroom", value: "2" },
  //   { label: "Outdoor Space", value: "3" /*, disabled: true*/ },
  //   { label: "In-unit Washer", value: "4" },

   

  // ];
  const options = props.house.houseList.map((val) =>  
  ({ label: val.name, value: val._id })  
  );
  
  const searchOptions = {
    componentRestrictions: { country: ['us','ca','uy'] },
    //types: ['city']
  }
     
  
  
  const handleChange2 = (name,value)=>{
    setField((prevState) => ({ ...prevState, [name]: value }));
  }
  const handleChange3 = (name,value)=>{
    setField((prevState) => ({ ...prevState, [name]: value }));
  }
  const handleChange4 = (name,value)=>{
    setField((prevState) => ({ ...prevState, [name]: value }));
  }
  const  handlechange5 = (name,value)=>{
    setField((prevState) => ({ ...prevState, [name]: value }));
  }
  
 
  const  handlechange = value => {
    setField((prevState) => ({ ...prevState, "houseRules": value }));
  }
  const  handlechange1 = e => {
          console.log(e.target.value)
          const val = e.target.value
    setField((prevState) => ({ ...prevState, "noOfBedRoom": val }));
  }
  // const handleChang = address => {
  //   setField((prevState) => ({ ...prevState, address }));
  // };

  const handleChangeAddress = address => {
    setField((prevState) => ({ ...prevState, address }));
  };
  const  handleDatechange = date => {
    setStartDate(date);
    var diff_ms = Date.now() - date.getTime();
    var age_dt = new Date(diff_ms);
    var realAge = Math.abs(age_dt.getUTCFullYear() - 1970);
    setFields((prevState) => ({ ...prevState, "age": realAge }));
  }
  const handleSelect = address => {
    //setFields((prevState) => ({ ...prevState, ["street"]: address.structured_formatting.main_text }));
    setField((prevState) => ({ ...prevState, ["street"]: address })); 
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
    //  .then(latLng => console.log('Success', latLng))
    //  .catch(error => console.error('Error', error));

      .then(({ lat, lng }) => {
              console.log("lat==",lat,"lng==",lng)
              console.log(address);
              setField((prevState) => ({ ...prevState, ["address"]: address }));
              setField((prevState) => ({ ...prevState, ["longitude"]: lng }));
              setField((prevState) => ({ ...prevState, ["latitude"]: lat }));
            });
  };
  

    return (
      <div className="">
        
                      <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                <FormGroup>
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
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                <FormGroup>
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
                                  </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                  
                              <PlacesAutocomplete
                                onChange={handleChangeAddress}
                                onSelect={handleSelect}
                                searchOptions={searchOptions}
                                value={field.address}
                              >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                  <Col xs={12} sm={12} md={12} lg={12}>
                                    <input
                                      {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'form-control',
                                      })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                      {loading && <div>Loading...</div>}
                                      {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                          ? 'suggestion-item--active'
                                          : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                        <div
                                          {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                          })}
                                        >
                                          <span>{suggestion.description}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </Col>
                              )}
                            </PlacesAutocomplete>
                          </Row>
                                      
                            
                           <Row>
                            <Col xs={12} sm={12} md={6} lg={6}>
                              <FormGroup>
                                <Input
                                type="select"
                                name="city"
                                id="city"
                                innerRef={register}
                                value={field.city}
                                onChange={(e) =>
                                  handlechange5(e.target.name, e.target.value)
                                }>
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
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6}>
                              <FormGroup>
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
                              </FormGroup>
                            </Col>
                            </Row>
                            
                             <Row>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                <FormGroup>
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
                                  </FormGroup>             
                              </Col>
                            <Col xs={12} sm={12} md={6} lg={6}>
                              <FormGroup>
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
                              </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                              <Col xs={12} sm={12} md={12} lg={12}>
                              <FormGroup>
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
                                </FormGroup>
                              </Col>
                            </Row>
                            {/* <Row>
                              <Col xs={12} sm={12} md={12} lg={12}>
                              <FormGroup>
                              <InputUI
                                      type="url"
                                      name="socialMediaId"
                                      id="socialMediaId"
                                      placeholder="Social Media ID"
                                      errors={errors}
                                      innerRef={register({
                                      // required: 'This is required field',
                                      })}
                                      fields={fields}
                                    />
                                </FormGroup>
                              </Col>
                            </Row> */}
                            <Row>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                <FormGroup>
                                  <DatePicker 
                                  selected={setDate} 
                                  className="form-control"
                                  placeholderText="Date of Birth"
                                  onChange={date => handleDatechange(date)}
                                  />
                                  </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                <FormGroup>
                                  <InputUI
                                  type="number"
                                  name="age"
                                  placeholder="Age"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={fields.age}/>
                                  </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup className="mt-3">
                              <Label for="exampleCheckbox" className="filter-mod">No of Bedrooms</Label>
                              <div className="filt d-flex justify-content-between">
                                {/* <Input type="radio" id="radio1" name="noOfBedRoom" value="2 Bedroom" label="2 Bedroom" onChange={(value) =>
                                    handlechange1(value)
                                  }/>2 Bedroom
                                <Input type="radio" id="radio2" name="noOfBedRoom" value="3 Bedroom" label="3 Bedroom" onChange={(value) =>
                                    handlechange1(value)
                                  }/>3 Bedroom
                                <Input type="radio" id="radio3" name= "noOfBedRoom" value="4+ Bedroom" label="4+ Bedroom" onChange={(value) =>
                                    handlechange1(value)
                                  }/>4+ Bedroom */}
                                    <input
                                      type="radio"
                                      value="2 Bedroom"
                                      name= "noOfBedRoom"
                                      onChange={(value) =>
                                          handlechange1(value)}
                                     // defaultChecked={value === "2 Bedroom"}    
                                      checked={field.noOfBedRoom === "2 Bedroom"}
                                       // {...plaftormInputProps}
                                      />2 Bedroom
                                      <input
                                        type="radio"
                                        value="3 Bedroom"
                                        name= "noOfBedRoom"
                                        checked={field.noOfBedRoom === "3 Bedroom"}
                                        onChange={(value) =>
                                          handlechange1(value)}
                                        />3 Bedroom
                                        <input
                                          type="radio"
                                          value="4+ Bedroom"
                                          name= "noOfBedRoom"
                                          checked={field.noOfBedRoom === "4+ Bedroom"}
                                          //defaultChecked={value === "4+ Bedroom"}  
                                          onChange={(value) =>
                                            handlechange1(value)}
                                        // checked={field.noOfBedRoom}
                                          // {...plaftormInputProps}
                                          />4+ Bedroom
                                </div>
                              </FormGroup>
                           
                            
                                   <Label for="exampleCheckbox" className="filter-mod">Listing Amenities</Label>
                              <div className="filt d-flex justify-content-between"></div>
                                          <MultiSelect
                                                options={aminitiesOption}
                                                value={field.aminities}
                                                className="MultiSelect-input"
                                                onChange={(value) =>
                                                  handleChange2("aminities",value) 
                                                }
                                                labelledBy={"Preferences for house rules"}
                                              />
                            
                                     {/* <MultiSelect
                                        options={options1}
                                        value={field.aminities}
                                        className="MultiSelect-input"
                                        onChange={(value) =>
                                        handlechange1(value) 
                                        }
                                         labelledBy={"Preferences for house rules"}/> */}
                                  <Label for="exampleCheckbox" className="filter-mod">House Rules</Label>
                                <div className="filt d-flex justify-content-between flex-wrap"></div>    
                                      <MultiSelect
                                        options={options}
                                        value={field.houseRules}
                                        className="MultiSelect-input"
                                        onChange={(value) =>
                                        handlechange(value) 
                                        }
                                         labelledBy={"Preferences for house rules"}/>
                                      
                                      
                              <Row>
                                <Col className="pr-0">
                                  <InputUI
                                  type="select"
                                  name="flateMate"
                                  id="flateMate"
                                  placeholder="flatmates"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={field.flateMate}
                                  onChange={(e) =>
                                    handleChange3(e.target.name, e.target.value)
                                  }
                                  >
                                  <option selected disabled>Choose your Flatmates </option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
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
                                  <option selected disabled>Choose your Age Range </option>
                                  <option value="Early 20s">Early 20s</option>
                                  <option value="Late 20s">Late 20s</option>
                                  <option value="30s">30s</option>
                                  <option value="40s and older">40s and older</option>

                                  
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
                                className="form-control w-100"
                                
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
                                  <option selected disabled>Choose your Duration </option>
                                  <option value="1-3 Months">1-3 Months</option>
                                  <option value="3-6 Months">3-6 Months</option>
                                  <option value="6+ Months">6+ Months</option>

                                  
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
                                  <option selected disabled>Choose your Charges Type </option>
                                  <option value="monthly">monthly</option>
                                  <option value="yearly">yearly</option>
                                  
                                  </InputUI>
                              </Col>


                            </Row>

                            <div className="mt-4 d-flex align-items-center">
                              <h6 className="social mr-2">Link social media accounts:</h6>
                                <div id="facebookLink" className="d-flex">
                                  <Facebook></Facebook>
                                  
                                </div>
                                <div id="twitterLink" className="d-flex">
                                  
                                  <Twitter></Twitter>
                                  
                                </div>
                                <div id="gsuiteLink" className="d-flex">
                                  
                                 <Gsuite></Gsuite>
                                </div>
                            </div>
                            <UncontrolledCollapse toggler="#facebookLink">
                              <FormGroup>
                                {/* <Input type="text" name="facebookprofile" id="facebookprofile" placeholder="Facebook Link" /> */}
                                <InputUI
                                      type="text"
                                      name="facebookLink"
                                      id="facebookLink1"
                                      placeholder="Facebook Link"
                                      errors={errors}
                                      innerRef={register({
                                      // required: 'This is required field',
                                      })}
                                      fields={fields}
                                    // value={fields.socialMediaLink.facebookLink}
                                    />
                              </FormGroup>
                              
                              
                            </UncontrolledCollapse>
                            <UncontrolledCollapse toggler="#twitterLink">
                              
                              <FormGroup>
                                {/* <Input type="text" name="twitterprofile" id="twitterprofile" placeholder="Twitter Link" /> */}
                                <InputUI
                                      type="text"
                                      name="twitterLink"
                                      id="twitterLink1"
                                      placeholder="Twitter Link"
                                      errors={errors}
                                      innerRef={register({
                                      // required: 'This is required field',
                                      })}
                                      fields={fields}
                                    />
                              </FormGroup>
                              
                            </UncontrolledCollapse>
                            <UncontrolledCollapse toggler="#gsuiteLink">
                              
                              
                              <FormGroup>
                                {/* <Input type="text" name="googleprofile" id="googleprofile" placeholder="Google Link" /> */}
                                <InputUI
                                      type="text"
                                      name="gsuiteLink"
                                      id="gsuiteLink1"
                                      placeholder="Google Link"
                                      errors={errors}
                                      innerRef={register({
                                      // required: 'This is required field',
                                      })}
                                      fields={fields}
                                    />
                              </FormGroup>
                            </UncontrolledCollapse>
                            <div className="text-center">
                              {/* <a href="#" className="login-bt mt-4 mb-2">Submit</a> */}
                              <Button type="submit" className="login-bt mt-4 mb-2"> Submit </Button>
                              <img src={imagePath.orImage} alt="image"/>
                              <a href="#"><img src={imagePath.fbImage} alt="image"/></a>
                              <a href="#"><img src={imagePath.gsImage} alt="image"/></a>
                              </div>
                      </Form>
      </div>
    );
  }
  
  const mapStateToProps = state => {
    const { user,room,city,house} = state;
    return {
      user,
      room,
      city,
      house,
      
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
      resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
     // crudActionHouseCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM")),
    crudActionCityCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY")),
    crudActionHouseCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "HOUSE"))



      

    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Formsec2));
  
  
  
  
  
  
  //export default Formsec2;