import React,{useState , useEffect} from 'react';
import './style.css';
// import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, FormGroup, Label, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/agentHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import './style.css';
import imagePath from '../../../Config/imageConstants';
// import {  Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Form, Input, FormFeedback, FormText,UncontrolledCollapse } from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import { USER_URL,HOUSE_RULE_URL ,CITY_URL,AMINITIES_URL} from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
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
import {mapApiKey} from '../RoomSearchPage/mapConfig';
import Userpic from './user-pic';

import { ToastContainer, toast } from 'react-toastify';
import InputUI from '../../../UI/InputUI';
import Geocode from "react-geocode";
const palceKey = mapApiKey;
  Geocode.setApiKey(palceKey);
  Geocode.setLanguage("en");
  
const AgentEditProfile = (props) => {
  const initialFields = {
    firstName: "",
    lastName: "",
    email:"",
    profilePicture:"",
    phone_number:"",
    dateOfBirth: null,
    aboutMe: "",
    readyToMove: null,
    age: "",
    gender: "",
    longitude: "",
    latitude: "",
    address:"",  
    city:"",
    zipCode:"",
    facebookLink:'',
  }
  const [fields, setFields] = useState(initialFields);
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  const [setDate, setStartDate] = useState();
  const [setRtoM, setReadyToMove] = useState(null);
  const [err, setErr] = useState('');
  const [errAdd, setErrAdd] = useState('');
  useEffect(() => {
    setUserId(params.userId)
    if (params.userId) props.crudActionCall(`${USER_URL}/${params.userId}`, null, "GET")
    props.crudActionCityCall(CITY_URL, null, "GET_ALL")
  }, [params]);
  useEffect(() => {
    const action = props.user.action;
    if (props.user.user && params.userId) {
      setFields({ ...fields, ...props.user.user })
      if(props.user.user.dateOfBirth)setStartDate(moment(props.user.user.dateOfBirth).toDate())
      if(props.user.user.readyToMove)setReadyToMove(moment(props.user.user.readyToMove).toDate())
    }
    if(props.user && props.user.user)
    localStorage.setItem('profileImg', props.user.user.profilePicture);
    if (action.isSuccess && action.type === "UPDATE")
      props.history.push(`/AgentEditProfile/${userId}`)
  }, [props.user]);

  const onSubmit = (data) => {
    // console.log("data======>",data)
    if (userId) data.userId = userId;
    data.longitude = fields.longitude;
    data.latitude = fields.latitude;
    data.address = fields.address;
    // console.log(data)
    if(fields.address){
      setErrAdd(' ')
      setErr(' ')
      props.crudActionCall(USER_URL + `/${userId}`, data, "UPDATE");
    props.resetAction();
    toast.info('Submitted successfully', {
      position: toast.POSITION.TOP_CENTER
  });
}
else{
  setErrAdd('This field is required')
  setErr('This field is required')
}
  }

  
  const handleChange = (name,value)=>{
    // console.log(value)
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleChangeAddress = address => {
    // console.log(address)
    if(address===''){
      setErrAdd('This field is required')
    }else{
      setErrAdd(' ')
    }
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
    setFields((prevState) => ({ ...prevState, ["street"]: address })); 
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
              // console.log("lat==",lat,"lng==",lng)
              // console.log(address);
              setFields((prevState) => ({ ...prevState, ["address"]: address }));
              setFields((prevState) => ({ ...prevState, ["longitude"]: lng }));
              setFields((prevState) => ({ ...prevState, ["latitude"]: lat }));
            });
  };
    return (
      <div className="home">
         <div className="header">
        <React.Fragment>
          <Header/>
              <Container className="mb-3">
                <Row className="justify-content-center mt-5">
                  <Col xs={12} sm={12} md={12} lg={10}>
                  <h2 className="custm_hding">Agent Edit Profile</h2>
                  <div className="userDetailsBox p-4 bg-white custm_userDetailsBox mt-2">
                    {/* <div className="AgentDP mb-5">
                      <img src={imagePath.profileImage} alt="agentdp"  />
                      <div className="uploadAgentDP">
                        <input type="file" />
                        <FontAwesomeIcon icon={faUpload} />
                      </div>
                    </div> */}
                    <Userpic userId={ userId}></Userpic>
                    <Form >
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>First Name</Label>
                          {/* <input className="input" type="text" placeholder="Enter First Name" /> */}
                          <InputUI
                          className="custm_inpt"
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
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Last Name</Label>
                          {/* <input className="input" type="text" placeholder="Enter Last Name" /> */}
                          <InputUI
                          className="custm_inpt"
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
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Email</Label>
                          {/* <input className="input" type="email" placeholder="Enter Email" /> */}
                          <InputUI
                          className="custm_inpt"
                          type="text"
                          name="email"
                          readonly='readOnly'
                          id="email"
                          placeholder="Email"
                          errors={errors}
                          innerRef={register({
                          required: 'This is required field',
                          
                          })}
                         fields={fields}
                         disabled

                         />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>City</Label>
                          {/* <input className="input" type="text" placeholder="Enter City" /> */}
                          <InputUI
                          className="custm_inpt"
                      type="select"
                      name="city"
                      id="city"
                      errors={errors}
                      innerRef={register({
                        required: 'This is required field',
                        })}
                      value={fields.city}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    >
                    <option value="">Select A City....</option>
                    {
                      props.city && props.city.cityList.map((val) =>{
                        return(
                          
                          <option value={val.cityName}>{val.cityName}</option>
                        );
                      })
                    } 
                    </InputUI>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                          <Label>Address</Label>
                          {/* <textarea className="input" placeholder="Enter Address"></textarea> */}
                          <PlacesAutocomplete
                    onChange={handleChangeAddress}
                    onSelect={handleSelect}
                    searchOptions={searchOptions}
                    value={fields.address}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <Col xs={12} sm={12} md={12} lg={12} className="px-0">
                        <input
                          {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'form-control custm_inpt',
                          })}
                        />
                        <p style={{color:"red"}}>{errAdd}</p>
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
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Zip Code</Label>
                          {/* <input className="input" type="text" placeholder="Enter Zip Code" /> */}
                          <InputUI
                          className="custm_inpt"
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
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Phone No</Label>
                          {/* <input className="input" type="tel" placeholder="Enter Phone No." /> */}
                          <InputUI
                          className="custm_inpt"
                          type="text"
                          name="phone_number"
                          id="phone_number"
                          placeholder="Phone Number"
                          errors={errors}
                          innerRef={register({
                          required: 'This is required field',
                          })}
                         fields={fields}
                         />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Facebook Profile</Label>
                          {/* <input className="input" type="url" placeholder="Facebook URL" /> */}
                          <InputUI
                          className="custm_inpt"
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
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>YouTube Profile</Label>
                          {/* <input className="input" type="url" placeholder="EnYouTube URL" /> */}
                          <InputUI
                                      className="custm_inpt"
                                      type="text"
                                      name="facebookLink"
                                      id="facebookLink2"
                                      placeholder="EnYouTube URL"
                                      errors={errors}
                                      innerRef={register({
                                      // required: 'This is required field',
                                      })}
                                      fields={fields}
                                    // value={fields.socialMediaLink.facebookLink}
                                    />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button type="button" onClick={handleSubmit(onSubmit)} className="px-5 custm_save">Save
                    </Button>
                    </Form>
                  </div>
                </Col>
                </Row>
              </Container>
            </React.Fragment>
          </div>
        </div>
    )
}
// export default AgentEditProfile;
const mapStateToProps = state => {
  const { user,city } = state;
  return {
    user,
    city
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
    crudActionCityCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY")),
    resetAction: () => dispatch({ type: "RESET_USER_ACTION" })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AgentEditProfile));