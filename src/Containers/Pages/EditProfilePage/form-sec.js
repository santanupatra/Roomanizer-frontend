import React,{useState , useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import { USER_URL,HOUSE_RULE_URL ,CITY_URL} from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import InputUI from '../../../UI/InputUI';

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
  }
  
  const [fields, setFields] = useState(initialFields);
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  const [setDate, setStartDate] = useState(new Date());
  const [setRtoM, setReadyToMove] = useState(null);
 
  useEffect(() => {
    setUserId(params.userId)
    if (params.userId) props.crudActionCall(`${USER_URL}/${params.userId}`, null, "GET")
    props.crudActionHouseCall(HOUSE_RULE_URL, null, "GET_ALL")
    props.crudActionCityCall(CITY_URL, null, "GET_ALL")


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
    console.log(data)
    props.crudActionCall(USER_URL + `/${userId}`, data, "UPDATE");
    props.resetAction();
  }

  // const options =  [
  //   { label: "Clean appartment", value: "1" },
  //   { label: "No smoking", value: "2" },
  //   { label: "Dog friendly", value: "3" /*, disabled: true*/ },
  // ];
  const options = props.house.houseList.map((val) =>  
  ({ label: val.name, value: val._id })  
  ); 
     
  
  const handleChange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
  const  handlechange = value => {
    setFields((prevState) => ({ ...prevState, "houseRules": value }));
  }

  const handleChang = address => {
    setFields((prevState) => ({ ...prevState, address }));
  };

  const handleChange6 = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
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
            //  console.log(address.structured_formatting.main_text);
            //  console.log(address.structured_formatting.secondary_text);
              // Geocode.fromLatLng(lat, lng).then(
              //   response => {
              //     const zipCode = response.results[1].address_components[0].long_name;
              //     setFields((prevState) => ({ ...prevState, ["zipCode"]: zipCode }));
              //     console.log("response====",response);
        
              //   },
              //   error => {
              //     console.error(error);
              //   }
              // );
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
                              <Col xs={12} sm={12} md={6} lg={6}>
                                  <InputUI
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  className="m-0"
                                  placeholder="First Name"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={fields}/>
                              </Col>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                  <InputUI
                                  type="text"
                                  name="lastName"
                                  id="lastName"
                                  placeholder="Last Name"
                                  className="m-0"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={fields}/>
                              </Col>
                                </Row>
                                <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                  <FormGroup>
                                  <PlacesAutocomplete
                                      onChange={handleChang}
                                      onSelect={handleSelect}
                                      searchOptions={searchOptions}
                                      value={fields.address}
                                    >
                                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                          <input
                                            {...getInputProps({
                                              placeholder: 'Search Places ...',
                                              className: 'form-control m-0',
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
                                        </div>
                                      )}
                                    </PlacesAutocomplete>
                                    </FormGroup>
                                    </Col>
                                </Row>
                                 <Row>
                                  <Col xs={12} sm={12} md={6} lg={6}>
                                  <FormGroup>
                                        <Input
                                        type="select"
                                        name="city"
                                        id="city"
                                        className="m-0"
                                        innerRef={register}
                                        value={fields.city}
                                        onChange={(e) =>
                                          handleChange6(e.target.name, e.target.value)
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
                                     </FormGroup>
                                    </Col>
                                    <Col xs={12} sm={12} md={6} lg={6}>
                                      <FormGroup>
                                        <InputUI
                                          type="number"
                                          name="zipCode"
                                          id="zipCode"
                                          className="m-0"
                                          placeholder="Zip Code"
                                          errors={errors}
                                          innerRef={register({
                                          required: 'This is required field',
                                          })}
                                          fields={fields}/>
                                        </FormGroup>
                                    </Col>
                              </Row>
                               <Row>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                  <FormGroup>
                                  <DatePicker 
                                  selected={setDate} 
                                  className="form-control m-0"
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
                                  className="m-0"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={fields.age}/>
                                  </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} sm={12} md={6} lg={6}>
                              <FormGroup>
                                <InputUI
                                  type="text"
                                  name="maxBudget"
                                  id="maxBudget"
                                  placeholder="Maximum Budget"
                                  className="m-0"
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
                                  type="select"
                                  name="gender"
                                  id="gender"
                                  className="m-0"
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
                                  </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} sm={12} md={12} lg={12}>
                                <FormGroup>
                                  <InputUI
                                  type="select"
                                  name="occupation"
                                  id="occupation"
                                  placeholder="occupation"
                                  className="m-0"
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
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} sm={12} md={12} lg={12}>
                                <FormGroup>
                                <InputUI
                                  type="textarea"
                                  name="aboutMe"
                                  id="aboutMe"
                                  className="m-0"
                                  placeholder="About Me"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={fields}/>
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col xs={12} sm={12} md={12} lg={12}>
                                <FormGroup>
                                <DatePicker 
                                    selected={setRtoM} 
                                    className="form-control w-100 m-0"
                                    //placeholder= "Ready to Move"
                                    placeholderText="Ready to Move"
                                    onChange={e => setReadyToMove(e)} 
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            

                            <MultiSelect
                            options={options}
                            value={fields.houseRules}
                            className="MultiSelect-input"
                            onChange={(value) =>
                              handlechange(value) 
                            }
                            // onChange={handlechange}
                            labelledBy={"Preferences for house rules"}/>

                                  
                            {/* <div className="mt-4">
                              <h6 className="social d-inline-block">Link social media accounts:</h6>
                                  <a href="#" className="pr-2 pl-2"><img src={imagePath.fImage}/></a>
                                  <a href="#" className="pr-2"><img src={imagePath.tImage}/></a>
                                  <a href="#"><img src={imagePath.gImage}/></a>
                            </div> */}
                            <Button type="submit" color="primary" className="login-bt mt-4 mb-2"> Submit </Button>
                            {/* <img src={imagePath.orImage} alt="image"/>
                            <a href="#" className="login-bt mt-4 mb-2">Submit</a>
                            <img src={imagePath.orImage} alt="image"/>
                            <a href="#"><img src={imagePath.fbImage} alt="image"/></a>
                            <a href="#"><img src={imagePath.gsImage} alt="image"/></a> */}
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