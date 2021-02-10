import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Form, Row, Col, FormGroup, Label, Button } from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText,UncontrolledCollapse } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/agentHeader';
import MultiSelect from "react-multi-select-component";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADD_AGENT_URL, HOUSE_RULE_URL, CITY_URL, AMINITIES_URL, LIST_AGENTT_URL, UPDATE_AGENTT_URL,ADD_PROPERTY } from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import InputUI from '../../../UI/InputUI';
import { callApi } from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileInput from "../../../UI/FileInput";
import moment from 'moment';
import PlacesAutocomplete, {
   geocodeByAddress,
   getLatLng,
} from 'react-places-autocomplete';
import { mapApiKey } from '../RoomSearchPage/mapConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import 'react-google-places-autocomplete/dist/index.min.css';
import Geocode from "react-geocode";
import { axiosApiCall } from '../../../api/index'
import { compareSync } from 'bcryptjs';

const palceKey = mapApiKey;
Geocode.setApiKey(palceKey);
Geocode.setLanguage("en");
// import 'moment-timezone';
const AddProperty = (props) => {
   const initialFields = {
      user_Id: "",
      // propertyName: "",
      roomName: "",
      aboutRoom: "",
      noOfBedRoom: "",
      houseRules: [],
      aminities: [],
      duration: "",
      moveIn: "",
      readyToMove: "",
      ageRange: "",
      area: "",
      roomImage: "",
      // address:allData.address,
      ageRange: "",
      zipCode: "",

      address: "",
      flateMate: "",
      deposite: "",
      budget: "",
      charges: "",
      chargesType: "",

   }
   const params = props.match.params;
   const [fields, setFields] = useState(initialFields);
   const [userId, setUserId] = useState(null);
   const { handleSubmit, register, errors } = useForm();
   const [setDate, setStartDate] = useState();
   // const [setRtoM, setReadyToMove] = useState(null);
   const [aminitiesOption, setAminitiesOption] = useState([]);
   const [err, setErr] = useState('');
   const [roomImage, setRoomImage] = useState(null);
   const [errAdd, setErrAdd] = useState('');
   const [RoomImageFile, updateRoomImageFile] = useState([]);
   const [RoomImage, updateRoomImage] = useState([]);

   useEffect(() => {
      setUserId(params.userId)
      if (params.userId) props.crudActionCall(`${ADD_AGENT_URL}/${params.userId}`, null, "GET")
      props.crudActionHouseCall(HOUSE_RULE_URL, null, "GET_ALL")
      props.crudActionCityCall(CITY_URL, null, "GET_ALL")
      callApi(apiBaseUrl + "/web/" + AMINITIES_URL, 'GET', '').then(
         response => {
            let option = response.data.map((val) =>
               ({ label: val.name, value: val._id })
            );
            setAminitiesOption(option);
         }
      )
   }, [params]);
   const onSubmit = (data) => {
      let formData = new FormData();
      console.log(data, 'data==========')
      formData.append('user_Id',localStorage.getItem("userId"));
      formData.append('roomName', fields.roomName);
      for (let i = 0; i < RoomImageFile.length; i++) {
         formData.append('roomImage', RoomImageFile[i]);
      }
      formData.append('aboutRoom', fields.aboutRoom);
      formData.append('flateMate',fields.flateMate);
      formData.append('ageRange',fields.ageRange);
      formData.append('noOfBedRoom',fields.noOfBedRoom);
      // formData.append('houseRules',fields.houseRules);
      for (let i = 0; i < fields.houseRules.length; i++) {
         formData.append('houseRules', fields.houseRules[i]);
      }
      formData.append('aminities',fields.aminities);
      formData.append('duration',fields.duration);
      formData.append('moveIn',fields.moveIn);
      formData.append('area',fields.area);
      formData.append('deposite',fields.deposite);
      formData.append('charges',fields.charges);
      formData.append('chargesType',fields.chargesType);
      formData.append('budget',fields.budget);
      formData.append('address',fields.address);
      formData.append('city',fields.city);
      formData.append('longitude',fields.longitude);
      formData.append('latitude',fields.latitude);
      formData.append('zipCode',fields.zipCode);

     console.log(formData, 'formData===============')
     props.crudActionCall(ADD_PROPERTY, formData, "ADD");
      // setUserId(params.userId)
      // const a = localStorage.getItem('userId')
      // // if (setDate) data.dateOfBirth = setDate;
      // if (setRtoM) data.readyToMove = setRtoM;
      // // data.longitude = fields.longitude;
      // // data.latitude = fields.latitude;
      // // data.address = fields.address;
      // // console.log("fields.roomImage",...fields.roomImage)
      // if (fields.houseRules) data.houseRules = fields.houseRules
      // if (fields.noOfBedRoom) data.noOfBedRoom = fields.noOfBedRoom
      // if (fields.aminities) data.aminities = fields.aminities
      // // if (fields.roomImage) data.roomImage=fields.roomImage
      // // console.log(data)
      // formData.append('roomImage', data.roomImage[0]);
      // // for (let i = 0; i < fromData.mealImage.length; i++) {
      // //   formData.append('mealImage', fromData.mealImage[i]);
      // // }
      // for (let [key, value] of Object.entries(data)) {
      //    // console.log("key===",key,"value===",value)
      //    if (key == 'roomImage') {
      //       formData.append(key, JSON.stringify(value));
      //    }
      //    formData.append(key, value);
      // }
      // // console.log("formData",formData)
      // if (fields.aminities.length > 0 && fields.houseRules.length > 0) {
      //    setErrAdd(' ')
      //    setErr(' ')
      //    if (params.userId == a) {
      //       if (userId) data.userId = a;
      //       props.crudActionCall(ADD_AGENT_URL, formData, "ADD");
      //    }
      //    else {
      //       if (userId) data.userId = a;
      //       props.crudActionCall(`${UPDATE_AGENTT_URL}` + `/${userId}`, data, "UPDATE");
      //    }
      //    // props.crudActionCall(ADD_AGENT_URL,data, "ADD");
      //    props.resetAction();
      //    toast.info('Submitted successfully', {
      //       position: toast.POSITION.TOP_CENTER
      //    });
      //    // props.history.push(`/Dashboard/${params.userId}`)
      // }
      // else {
      //    setErrAdd('This field is required')
      //    setErr('This field is required')
      // }
   }
   const options = props.house.houseList.map((val) =>
      ({ label: val.name, value: val._id })
   );
   const handleChange = (name, value) => {
      // console.log(value)
      setFields((prevState) => ({ ...prevState, [name]: value }));
   }
   const handlechange1 = e => {
      // console.log(e.target.value)
      const val = e.target.value
      setFields((prevState) => ({ ...prevState, "noOfBedRoom": val }));
   }
   // const handleChangeAddress = address => {
   //    // console.log(address)
   //    if (address === '') {
   //       setErrAdd('This field is required')
   //    } else {
   //       setErrAdd(' ')
   //    }
   //    setFields((prevState) => ({ ...prevState, address }));
   // };
   const handleDatechange = date => {
      setStartDate(date);
      var diff_ms = Date.now() - date.getTime();
      var age_dt = new Date(diff_ms);
      var realAge = Math.abs(age_dt.getUTCFullYear() - 1970);
      setFields((prevState) => ({ ...prevState, "age": realAge }));
   }
   useEffect(() => {
      if (userId) props.crudActionAgenttCall(`${LIST_AGENTT_URL}/${userId}`, null, "GET")
   }, [userId])
   useEffect(() => {
      const action = props.agentt.action;
      if (props.agentt.agentt && userId) {
         // console.log("props",props.agentt.agentt)
         setFields({ ...fields, ...props.agentt.agentt })
         // console.log("156",fields)
      }
   }, [props.agentt]);

   const setReadyToMove = (e) => {
      console.log(e, 'setReadyToMove')
      setFields((prevState) => ({ ...prevState, "moveIn": e }));

      // (moment(props.agentt.agentt.readyToMove).toDate())
   }

  
   const handleChangeAddress = address => {
      console.log(address)
      if (address === '') {
         setErrAdd('This field is required')
      } else {
         setErrAdd(' ')
      }
      setFields((prevState) => ({ ...prevState, address }));
   };

   const handleSelect = address => {
      setFields((prevState) => ({ ...prevState, ["street"]: address }));
      geocodeByAddress(address)
         .then(results => getLatLng(results[0]))
         //  .then(latLng => console.log('Success', latLng))
         //  .catch(error => console.error('Error', error));
         .then(({ lat, lng }) => {
            console.log("lat==", lat, "lng==", lng)
            console.log(address);

            setFields((prevState) => ({ ...prevState, ["address"]: address }));
            setFields((prevState) => ({ ...prevState, ["longitude"]: lng }));
            setFields((prevState) => ({ ...prevState, ["latitude"]: lat }));
         });
   };

   const searchOptions = {
      componentRestrictions: { country: ['us', 'ca', 'uy'] },
      //types: ['city']
   }

   let fileData = [];
   const handlemultipleFileChange = e => {
      const files = Array.from(e.target.files);
      updateRoomImageFile(fileData);

      Promise.all(files.map(file => {
         fileData.push(file);
         console.log(fileData)
         updateRoomImageFile(fileData);
         return (new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', (ev) => {
               resolve(ev.target.result);
            });
            reader.addEventListener('error', reject);
            reader.readAsDataURL(file);
         }));
      }))
         .then(images => {
            /* Once all promises are resolved, update state with image URI array */
            updateRoomImage(images)            
         }, error => {
            console.error(error);
         });

   };
   console.log(RoomImageFile, 'RoomImageFile')

   const roomImageUploadApi = async()=>{
      let sendData = new FormData();
      for (let i = 0; i < RoomImageFile.length; i++) {
        sendData.append('roomImage', RoomImageFile[i]);
      }
      setFields((prevState) => ({ ...prevState, ["roomImage"]: sendData }));
      console.log(sendData, 'im')
   }

   const handleFileDelete = (key) => {
      //e.preventDefault()
      const findArr = RoomImage.splice(key, 1);
      const propertyImageFileNew = RoomImageFile.splice(key, 1);
   }
   return (
      <div className="home">
         <div className="header">
            <Header />
            <div className="maindata py-4"></div>
            <Container className="mb-3">
               <Row className="justify-content-center mt-5">
                  <Col xs={12} sm={12} md={12} lg={10}>
                     <h2 className="custm_hding">Add Property</h2>
                     <div className="userDetailsBox p-4 bg-white mt-2 custm_userDetailsBox">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                           <Row>
                              {/* <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>Property Name</Label>
                                    <InputUI
                                       className="custm_inpt"
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
                              </Col> */}
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
                                          props.city && props.city.cityList.map((val) => {
                                             return (
                                                <option value={val.cityName}>{val.cityName}</option>
                                             );
                                          })
                                       }
                                    </InputUI>
                                 </FormGroup>
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
                                       <p style={{ color: "red" }}>{errAdd}</p>
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
                              {/* </Row> */}
                              <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>Room Name</Label>
                                    <InputUI
                                       className="custm_inpt"
                                       type="text"
                                       name="roomName"
                                       id="roomName"
                                       placeholder="Room Name"
                                       errors={errors}
                                       innerRef={register({
                                          required: 'This is required field',
                                       })}
                                       fields={fields}
                                       onChange={(e) =>
                                          handleChange(e.target.name, e.target.value)
                                       }
                                    />

                                 </FormGroup>
                              </Col>
                              <Col className="pr-0" xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>Prefer Gender Types</Label>
                                    <InputUI
                                       className="custm_inpt"
                                       type="select"
                                       name="flateMate"
                                       id="flateMate"
                                       placeholder="flatmates"
                                       errors={errors}
                                       innerRef={register({
                                          required: 'This is required field',
                                       })}
                                       value={fields.flateMate}
                                       onChange={(e) =>
                                          handleChange(e.target.name, e.target.value)
                                       }
                                    >
                                       <option value="">Prefer Gender Types </option>
                                       <option value="male">Male</option>
                                       <option value="female">Female</option>
                                       <option value="other">Other</option>
                                    </InputUI>
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>ZIP Code</Label>
                                    <InputUI
                                       className="custm_inpt"
                                       type="text"
                                       name="zipCode"
                                       id="zipCode"
                                       placeholder="Enter ZIP Code"
                                       errors={errors}
                                       innerRef={register({
                                          required: 'This is required field',
                                       })}
                                       fields={fields}
                                       onChange={(e) =>
                                          handleChange(e.target.name, e.target.value)
                                       }
                                    />
                                 </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>Area sq/ft</Label>
                                    <InputUI
                                       className="custm_inpt"
                                       type="text"
                                       name="area"
                                       id="area"
                                       placeholder="Area sq/ft"
                                       errors={errors}
                                       innerRef={register({
                                          required: 'This is required field',
                                       })}
                                       fields={fields}
                                       onChange={(e) =>
                                          handleChange(e.target.name, e.target.value)
                                       }
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
                                       className="custm_inpt"
                                       type="textarea"
                                       name="aboutRoom"
                                       id="aboutRoom"
                                       placeholder="About Room"
                                       errors={errors}
                                       innerRef={register({
                                          required: 'This is required field',
                                       })}
                                       fields={fields}
                                       onChange={(e) =>
                                          handleChange(e.target.name, e.target.value)
                                       }
                                    />
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>
                              <Row>
                                 <Col className="pr-0">
                                    <InputUI
                                       className="custm_inpt"
                                       type="text"
                                       name="budget"
                                       id="budget"
                                       placeholder="Maximum Budget"
                                       errors={errors}
                                       innerRef={register({
                                          required: 'This is required field',
                                       })}
                                       fields={fields}
                                       onChange={(e) =>
                                          handleChange(e.target.name, e.target.value)
                                       } />
                                 </Col>
                                 <Col>
                                    <InputUI
                                       className="custm_inpt"
                                       type="text"
                                       name="deposite"
                                       id="deposite"
                                       placeholder="Deposit"
                                       errors={errors}
                                       innerRef={register({
                                          required: 'This is required field',
                                       })}
                                       fields={fields}
                                       onChange={(e) =>
                                          handleChange(e.target.name, e.target.value)
                                       } />
                                 </Col>
                              </Row>
                           </Row>
                           <Row>
                              <Col>
                                 <InputUI
                                    className="custm_inpt"
                                    type="number"
                                    name="charges"
                                    id="charges"
                                    placeholder="Charges"
                                    errors={errors}
                                    innerRef={register({
                                       required: 'This is required field',
                                    })}
                                    fields={fields}
                                    onChange={(e) =>
                                       handleChange(e.target.name, e.target.value)
                                    } />

                              </Col>


                              <Col>
                                 <InputUI
                                    className="custm_inpt"
                                    type="select"
                                    name="chargesType"
                                    id="chargesType"
                                    placeholder="Charges Type"
                                    errors={errors}
                                    innerRef={register({
                                       required: 'This is required field',
                                    })}
                                    value={fields.chargesType}
                                    onChange={(e) =>
                                       handleChange(e.target.name, e.target.value)
                                    }
                                 >
                                    <option value="">Choose your Charges Type </option>
                                    <option value="monthly">monthly</option>
                                    <option value="yearly">yearly</option>

                                 </InputUI>
                              </Col>


                           </Row>
                           <Row>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>No of Bedrooms</Label>
                                    <InputUI
                                       className="custm_inpt"
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
                                    {/* 
                        <select className="input">
                           <option>1 - 3 year</option>
                           <option>18+</option>
                        </select>
                        */}
                                    <InputUI
                                       className="custm_inpt"
                                       type="number"
                                       name="ageRange"
                                       id="age"
                                       placeholder="Age range"
                                       errors={errors}
                                       innerRef={register({
                                          required: 'This is required field',
                                       })}
                                       fields={fields}
                                       onChange={(e) =>
                                          handleChange(e.target.name, e.target.value)
                                       }
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
                                          handleChange("aminities", value)
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
                                          handleChange("houseRules", value)
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
                                       selected={fields.moveIn}
                                       className="form-control w-100 custm_inpt"
                                       placeholderText="Ready to Move"
                                       onChange={e =>
                                          setReadyToMove(e)}
                                       required
                                    />
                                 </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>Choose your Duration</Label>
                                    {/* <input className="input" type="text" placeholder="Choose your Duration" /> */}
                                    <InputUI
                                       className="custm_inpt"
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

                                 {/* <div className="d-flex flex-wrap">
                                    <div class="addImages m-2">
                                       <FileInput
                                          label=""
                                          name="roomImage"
                                          value={fields.roomImage}
                                          onChange={(e) =>
                                             handleChange(e.target.name, e.target.value)
                                          }
                                          register={register}
                                          errors={errors}
                                          required={false}
                                       />
                                    </div>
                                    <div className="uploadImgs ml-0">
                                       <div className="uPic m-2">
                                          <a href="#">
                                             <FontAwesomeIcon icon={faTimesCircle} />
                                          </a>
                                       </div>
                                    </div>
                                 </div> */}
                                 <div className="uploadImgs">
                                    {
                                       RoomImage && RoomImage.length > 0 &&
                                       RoomImage.map((value, key) => {
                                          return (
                                             <div className="uPic">
                                                <img key={key} src={value} alt="Image Preview" />
                                                <a href="#" onClick={e => handleFileDelete(key)} >
                                                   <FontAwesomeIcon icon={faTimesCircle} />
                                                </a>
                                             </div>
                                          );
                                       })
                                    }
                                 </div>
                                 <FormGroup className="mb-5 th">
                                    <div className="addImages">
                                       <input type="file" id="exampleCustomFileBrowser" name="customFile" label="Pick a file!" accept=".png, .jpg, .jpeg" maxlength={1024} maxCount={10} minCount={4} multiple onChange={e => handlemultipleFileChange(e)} />
                                    </div>
                                    {/* <Label for="exampleCustomFileBrowser">Add Room Images</Label> */}
                                    {/* <Button type="button" color="primary" className="login-bt mt-4 mb-2" onClick={roomImageUploadApi}> Upload </Button> */}
                                 </FormGroup>
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
      </div >
   )
}
// export default AddProperty;
const mapStateToProps = state => {
   const { agent, house, agentt, city } = state;
   return {
      agent,
      house,
      agentt,
      city
   }
}
const mapDispatchToProps = dispatch => {
   return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "AGENT")),
      resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
      crudActionHouseCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "HOUSE")),
      crudActionAgenttCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "AGENTT")),
      crudActionCityCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY")),
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProperty));