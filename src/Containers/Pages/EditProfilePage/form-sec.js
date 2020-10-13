import React,{useState , useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText,UncontrolledCollapse } from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import { USER_URL,HOUSE_RULE_URL ,CITY_URL,AMINITIES_URL} from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import InputUI from '../../../UI/InputUI';
import { callApi} from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";
import Facebook from '../facebook';
import Twitter from '../twitter';
import Gsuite from '../gSuite';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
//import 'react-google-places-autocomplete/dist/index.min.css';
import Geocode from "react-geocode";
const palceKey = "AIzaSyA5LrPhIokuSBO5EgKEcfu859gog6fRF8w";
  Geocode.setApiKey(palceKey);
  Geocode.setLanguage("en");
// import 'moment-timezone';



const Formsec = (props) => {
  
  const initialFields = {
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    aboutMe: "",
    readyToMove: null,
    maxBudget: "",
    houseRules:"",
    age: "",
    gender: "",
    occupation: "",
    longitude: "",
    latitude: "",
    address:"",  
    city:"",
    zipCode:"",
    aminities: [],
    facebookLink:'',
    twitterLink:'',
    gsuiteLink:'',
    noOfBedRoom:'',
  }
  
  const [fields, setFields] = useState(initialFields);
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  const [setDate, setStartDate] = useState(new Date());
  const [setRtoM, setReadyToMove] = useState(null);
  const [aminitiesOption, setAminitiesOption] = useState([]);
  
 
  useEffect(() => {
    setUserId(params.userId)
    if (params.userId) props.crudActionCall(`${USER_URL}/${params.userId}`, null, "GET")
    props.crudActionHouseCall(HOUSE_RULE_URL, null, "GET_ALL")
    props.crudActionCityCall(CITY_URL, null, "GET_ALL")

    callApi(apiBaseUrl+"/web/"+AMINITIES_URL,'GET','').then(
      response => {
        let option = response.data.map((val) =>  
          ({ label: val.name, value: val._id })  
        );
        setAminitiesOption(option);
      }
    )

  }, [params]);


  useEffect(() => {
    const action = props.user.action;
    const { type, isSuccess } = props.house.action;
    if (props.user.user && params.userId) {
      setFields({ ...fields, ...props.user.user })
      setStartDate(moment(props.user.user.dateOfBirth).toDate())
      setReadyToMove(moment(props.user.user.readyToMove).toDate())
    }
    if (action.isSuccess && action.type === "UPDATE")
      props.history.push(`/editProfile/${userId}`)
  }, [props.user,props.house,props.city]);

  const onSubmit = (data) => {
    if (userId) data.userId = userId;
    if (setDate) data.dateOfBirth = setDate;
    if (setRtoM) data.readyToMove = setRtoM;
    data.longitude = fields.longitude;
    data.latitude = fields.latitude;
    data.address = fields.address;
    if (fields.houseRules) data.houseRules=fields.houseRules
    if (fields.noOfBedRoom) data.noOfBedRoom=fields.noOfBedRoom
    if (fields.aminities) data.aminities=fields.aminities
    // console.log(data)
    props.crudActionCall(USER_URL + `/${userId}`, data, "UPDATE");
    props.resetAction();
  }

  
  const options = props.house.houseList.map((val) =>  
    ({ label: val.name, value: val._id })  
  ); 
  
  const handleChange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
  const  handlechange1 = e => {
    console.log(e.target.value)
    const val = e.target.value
    setFields((prevState) => ({ ...prevState, "noOfBedRoom": val }));
  }
  
  const handleChangeAddress = address => {
    setFields((prevState) => ({ ...prevState, address }));
  };

  const  handleDatechange = date => {
    setStartDate(date);
    var diff_ms = Date.now() - date.getTime();
    var age_dt = new Date(diff_ms);
    var realAge = Math.abs(age_dt.getUTCFullYear() - 1970);
    setFields((prevState) => ({ ...prevState, "age": realAge }));
  }
  const searchOptions = {
    componentRestrictions: { country: ['us','ca','uy'] },
    //types: ['city']
  }
 
 
 
  const handleSelect = address => {
    //setFields((prevState) => ({ ...prevState, ["street"]: address.structured_formatting.main_text }));
    setFields((prevState) => ({ ...prevState, ["street"]: address })); 
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
    //  .then(latLng => console.log('Success', latLng))
    //  .catch(error => console.error('Error', error));

      .then(({ lat, lng }) => {
              console.log("lat==",lat,"lng==",lng)
              console.log(address);
            
              setFields((prevState) => ({ ...prevState, ["address"]: address }));
              setFields((prevState) => ({ ...prevState, ["longitude"]: lng }));
              setFields((prevState) => ({ ...prevState, ["latitude"]: lat }));
            });
  };
      return (
        <div className="">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Col sm={12}>
                <Row>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <InputUI
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      errors={errors}
                      innerRef={register({
                      required: 'This is required field',
                      })}
                      fields={fields}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <InputUI
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      errors={errors}
                      innerRef={register({
                      required: 'This is required field',
                      })}
                      fields={fields}
                    />
                  </Col>
                </Row>
                <Row>
                  
                  <PlacesAutocomplete
                    onChange={handleChangeAddress}
                    onSelect={handleSelect}
                    searchOptions={searchOptions}
                    value={fields.address}
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
                  <Col>
                    <Input
                      type="select"
                      name="city"
                      id="city"
                      innerRef={register}
                      value={fields.city}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    >
                    <option selected disabled>Select A City....</option>
                    {
                      props.city && props.city.cityList.map((val) =>{
                        return(
                          <option value={val._id}>{val.cityName}</option>
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
                      fields={fields}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <DatePicker 
                      selected={setDate} 
                      className="form-control"
                      placeholderText="Date of Birth"
                      onChange={date => handleDatechange(date)}
                      // value={fields.dateOfBirth}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <InputUI
                      type="number"
                      name="age"
                      placeholder="Age"
                      errors={errors}
                      innerRef={register({
                      required: 'This is required field',
                      })}
                      value={fields.age}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <InputUI
                      type="text"
                      name="maxBudget"
                      id="maxBudget"
                      placeholder="Maximum Budget"
                      errors={errors}
                      innerRef={register({
                      required: 'This is required field',
                      })}
                      fields={fields}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <InputUI
                      type="select"
                      name="gender"
                      id="gender"
                      placeholder="Gender"
                      errors={errors}
                      innerRef={register({
                      required: 'This is required field',
                      })}
                      value={fields.gender}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    >
                      <option>Choose your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </InputUI>
                  </Col>
                </Row>
                <InputUI
                  type="select"
                  name="occupation"
                  id="occupation"
                  placeholder="occupation"
                  errors={errors}
                  innerRef={register({
                  required: 'This is required field',
                  })}
                  value={fields.occupation}
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                  }
                  >
                  <option>Choose your occupation</option>
                  <option value="Student">Student</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Other">Other</option>
                </InputUI>
                <InputUI
                  type="textarea"
                  name="aboutMe"
                  id="aboutMe"
                  placeholder="About Me"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                 
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
                                      value="2"
                                      name= "noOfBedRoom"
                                      onChange={(value) =>
                                          handlechange1(value)}
                                     // defaultChecked={value === "2 Bedroom"}    
                                      checked={fields.noOfBedRoom === "2"}
                                       // {...plaftormInputProps}
                                      />2 Bedroom
                                      <input
                                        type="radio"
                                        value="3"
                                        name= "noOfBedRoom"
                                        checked={fields.noOfBedRoom === "3"}
                                        onChange={(value) =>
                                          handlechange1(value)}
                                        />3 Bedroom
                                        <input
                                          type="radio"
                                          value="5"
                                          name= "noOfBedRoom"
                                          checked={fields.noOfBedRoom === "5"}
                                          //defaultChecked={value === "4+ Bedroom"}  
                                          onChange={(value) =>
                                            handlechange1(value)}
                                        // checked={field.noOfBedRoom}
                                          // {...plaftormInputProps}
                                          />4+ Bedroom
                                </div>
                              </FormGroup>
                              
              
                
                              
                <div className="form-group my-4 py-2">
                  <DatePicker 
                    selected={setRtoM} 
                    className="form-control w-100"
                    //placeholder= "Ready to Move"
                    placeholderText="Ready to Move"
                    onChange={e => setReadyToMove(e)} 
                  />
                </div>
                
                <div className="form-group my-4 py-2">
                  <MultiSelect
                    options={aminitiesOption}
                    value={fields.aminities}
                    className="MultiSelect-input"
                    onChange={(value) =>
                      handleChange("aminities",value) 
                    }
                    labelledBy={"Preferences for house rules"}
                  />
                </div>
                

                <MultiSelect
                  options={options}
                  value={fields.houseRules}
                  className="MultiSelect-input"
                  onChange={(value) =>
                    handleChange("houseRules",value) 
                  }
                  // onChange={handlechange}
                  labelledBy={"Preferences for house rules"}
                />
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
              
                <Button type="submit" color="primary" className="login-bt mt-4 mb-2"> Submit </Button>
                  
              </Col>
            </FormGroup>
          </Form>
        </div>
    );
  }

const mapStateToProps = state => {
  const { user , house ,city} = state;
  return {
    user,
    house,
    city
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
    resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
    crudActionHouseCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "HOUSE")),
    crudActionCityCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY")),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Formsec));