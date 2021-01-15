import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container,Form, Row, Col, FormGroup, Label, Button } from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText,UncontrolledCollapse } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/agentHeader';
import MultiSelect from "react-multi-select-component";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADD_AGENT_URL,HOUSE_RULE_URL ,CITY_URL,AMINITIES_URL} from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import InputUI from '../../../UI/InputUI';
import { callApi} from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileInput from "../../../UI/FileInput";
import moment from 'moment';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {mapApiKey} from '../RoomSearchPage/mapConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import 'react-google-places-autocomplete/dist/index.min.css';
import Geocode from "react-geocode";
const palceKey = mapApiKey;
  Geocode.setApiKey(palceKey);
  Geocode.setLanguage("en");
// import 'moment-timezone';
const AddProperty = (props) => {
  const initialFields = {
    user_Id:"",
    propertyName:"",
    roomName:"",
    aboutRoom:"",
    noOfBedRoom:"",
    houseRules:"",
    aminities:"",
    duration:"",
    moveIn:"",
    area:"",
    roomImage:"",
    // address:allData.address,
    ageRange:"",
    zipCode:""
  }
  
  const [fields, setFields] = useState(initialFields);
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  const [setDate, setStartDate] = useState();
  const [setRtoM, setReadyToMove] = useState(null);
  const [aminitiesOption, setAminitiesOption] = useState([]);
  const [err, setErr] = useState('');
  const [errAdd, setErrAdd] = useState('');
  useEffect(() => {
    setUserId(params.userId)
    if (params.userId) props.crudActionCall(`${ADD_AGENT_URL}/${params.userId}`, null, "GET")
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
  const onSubmit = (data) => {
    console.log(data,"79")
    
    if (userId) data.userId = userId;
    // if (setDate) data.dateOfBirth = setDate;
    if (setRtoM) data.readyToMove = setRtoM;
    // data.longitude = fields.longitude;
    // data.latitude = fields.latitude;
    // data.address = fields.address;
    if (fields.houseRules) data.houseRules=fields.houseRules
    if (fields.noOfBedRoom) data.noOfBedRoom=fields.noOfBedRoom
    if (fields.aminities) data.aminities=fields.aminities
    console.log(data)
    console.log(data.roomImage[0])
    data.roomImage = data.roomImage[0];
    let formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    if(fields.aminities.length>0&&fields.houseRules.length>0){
      setErrAdd(' ')
      setErr(' ')
      props.crudActionCall(ADD_AGENT_URL,formData, "ADD");
      props.resetAction();
    toast.info('Submitted successfully', {
      position: toast.POSITION.TOP_CENTER
  });
      props.history.push(`/Dashboard/${params.userId}`)
    

}
else{
  setErrAdd('This field is required')
  setErr('This field is required')
}
  }

  
  const options = props.house.houseList.map((val) =>  
    ({ label: val.name, value: val._id })  
  );
const handleChange = (name,value)=>{
  console.log(value)
  setFields((prevState) => ({ ...prevState, [name]: value }));
}
const  handlechange1 = e => {
  console.log(e.target.value)
  const val = e.target.value
  setFields((prevState) => ({ ...prevState, "noOfBedRoom": val }));
}

const handleChangeAddress = address => {
  console.log(address)
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
    return (
      
      <div className="home">
        <div className="header">
        <Header/>
        <div className="maindata py-4"></div>
              <Container className="mb-3">
                <Row className="justify-content-center mt-5">
                  <Col xs={12} sm={12} md={12} lg={10}>
                    <h2>Add Property</h2>
                    <div className="userDetailsBox p-4 bg-white mt-2">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Property Name</Label>
                          {/* <input className="input" type="text" placeholder="Enter Property Name" /> */}
                          <InputUI
                            type="text"
                            name="propertyName"
                            id="propertyName"
                            placeholder="Property Name"
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
                          <Label>City</Label>
                          {/* <input className="input" type="text" placeholder="Enter City" /> */}
                          <InputUI
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
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>ZIP Code</Label>
                          {/* <input className="input" type="text" placeholder="Enter ZIP Code" /> */}
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
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Room Name</Label>
                          {/* <input className="input" type="text" placeholder="Enter Room Name" /> */}
                          <InputUI
                            type="text"
                            name="roomName"
                            id="roomName"
                            placeholder="Room Name"
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
                          <Label>ZIP Code</Label>
                          <input className="input" type="text" placeholder="Enter ZIP Code" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Area sq/ft</Label>
                          {/* <input className="input" type="text" placeholder="Area sq/ft" /> */}
                          <InputUI
                            type="text"
                            name="area"
                            id="area"
                            placeholder="Area sq/ft"
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
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                          <Label>About Room</Label>
                          {/* <textarea className="input" placeholder="Enter About Room"></textarea> */}
                          <InputUI
                            type="textarea"
                            name="aboutRoom"
                            id="aboutRoom"
                            placeholder="About Room"
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
                          <Label>No of Bedrooms</Label>
                          <InputUI
                                  type="select"
                                  name="noOfBedRoom"
                                  id="noOfBedRoom"
                                  placeholder="noOfBedRoom"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={fields.noOfBedRoom}
                                  onChange={(e) =>
                                    handleChange(e.target.name, e.target.value)
                                  }
                                  >
                                  <option value="">Choose your Duration </option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">4+</option>
                                  </InputUI>
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Choose Age Range</Label>
                          {/* <select className="input">
                            <option>1 - 3 year</option>
                            <option>18+</option>
                          </select> */}
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
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                        <Label for="exampleCheckbox" className="filter-mod">Listing Amenities</Label>
                        <MultiSelect
                          options={aminitiesOption}
                          value={fields.aminities}
                          className="MultiSelect-input"
                          onChange={(value) =>
                            handleChange("aminities",value) 
                          }
                          labelledBy={"Preferences for house rules"}
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                          <Label>House Rules</Label>
                          <MultiSelect
                          options={options}
                          value={fields.houseRules}
                          className="MultiSelect-input"
                          errors={errors}
                          innerRef={register({
                          required: 'This is required field',
                          })}
                          onChange={(value) =>
                          handleChange("houseRules",value) 
                          }
                          // onChange={handlechange}
                          labelledBy={"Preferences for house rules"}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Move In</Label>
                          {/* <input className="input" type="text" placeholder="Move In" /> */}
                          <DatePicker 
                          selected={setRtoM} 
                          className="form-control w-100"
                          placeholderText="Ready to Move"
                          onChange={e => setReadyToMove(e)} 
                          required
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Choose your Duration</Label>
                          {/* <input className="input" type="text" placeholder="Choose your Duration" /> */}
                          <InputUI
                                  type="select"
                                  name="duration"
                                  id="duration"
                                  placeholder="Duration"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={fields.duration}
                                  onChange={(e) =>
                                    handleChange(e.target.name, e.target.value)
                                  }
                                  >
                                  <option value="">Choose your Duration </option>
                                  <option value="1-3 Months">1-3 Months</option>
                                  <option value="3-6 Months">3-6 Months</option>
                                  <option value="6+ Months">6+ Months</option>
                                  </InputUI>
                        </FormGroup>
                      </Col>
                    </Row>

                    
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Label>Upload Property Images</Label>
                        <div className="d-flex flex-wrap">
                          <div class="addImages m-2">
                            {/* <input type="file" id="exampleCustomFileBrowser" name="customFile" label="Pick a file!" 
                            accept=".png, .jpg, .jpeg" maxlength="1024" maxcount="10" mincount="4" multiple="" /> */}
                            <FileInput
                              label="Website Logo"
                              name="roomImage"
                              register={register}
                              errors={errors}
                              required={false}
                            />
                          </div>
                          <div className="uploadImgs ml-0">
                            <div className="uPic m-2">
                              {/* <img src={imagePath.roomImage1} alt="Image Preview" /> */}
                              <a href="#">
                                <FontAwesomeIcon icon={faTimesCircle} />
                              </a>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    {/* href={`/Dashboard/${params.userId}`} */}
                    <Button color="blue" type="submit" className="px-4"  >Upload Property</Button>
                    </Form>

                    </div>
                  </Col>
                </Row>
              </Container>
        </div>
      </div>
    )
}
// export default AddProperty;
const mapStateToProps = state => {
  const { agent , house ,city} = state;
  return {
    agent,
    house,
    city
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "AGENT")),
    resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
    crudActionHouseCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "HOUSE")),
    crudActionCityCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY")),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProperty));
