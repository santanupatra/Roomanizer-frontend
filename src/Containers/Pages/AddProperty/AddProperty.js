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
import { ADD_AGENT_URL, HOUSE_RULE_URL, CITY_URL, AMINITIES_URL, LIST_AGENTT_URL, UPDATE_AGENTT_URL, ADD_PROPERTY } from '../../../shared/allApiUrl';
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
import {getImageUrl} from '../../../shared/helpers';

const palceKey = mapApiKey;
Geocode.setApiKey(palceKey);
Geocode.setLanguage("en");
// import 'moment-timezone';
const AddProperty = (props) => {
   const initialFields = {
      user_Id: "",
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
      ageRange: "",
      zipCode: "",
      city: "",
      address: "",
      flateMate: "",
      deposite: "",
      budget: "",
      charges: "",
      chargesType: "",
      latitude: 0,
      longitude: 0,

   }
   const params = props.match.params;
   let propertyId = props.match.params && props.match.params.propertyId && props.match.params.propertyId;
   const [fields, setFields] = useState(initialFields);
   const [userId, setUserId] = useState(null);
   const { handleSubmit, register, errors } = useForm();
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

   useEffect(() => {
      props.crudActionAgentCall(`${ADD_PROPERTY}/${propertyId}`, null, "GET_ALL");
   }, [propertyId]);

   const onSubmit = (data) => {
      let userId = localStorage.getItem("userId");
      let formData = new FormData();
      data.user_Id = localStorage.getItem("userId");
      data.moveIn = fields.moveIn;
      data.address = fields.address;
      data.longitude = fields.longitude;
      data.latitude = fields.latitude;
      data.aminities = fields.aminities;
      data.houseRules = fields.houseRules;
      for (let i = 0; i < RoomImageFile.length; i++) {
         formData.append('roomImage', RoomImageFile[i]);
      }
      for (let [key, value] of Object.entries(data)) {
         if (key == 'aminities') {
            formData.append(key, JSON.stringify(value));
         }
         if (key == 'houseRules') {
            formData.append(key, JSON.stringify(value));
         }
         formData.append(key, value);
      }
      if (props.room.roomList) {
         props.crudActionCall(`${ADD_PROPERTY}/${propertyId}`, formData, "UPDATE");
      } else {
         props.crudActionCall(ADD_PROPERTY, formData, "ADD");
      }
      props.history.push(`/Dashboard/${userId}`);
   }
   const options = props.house.houseList.map((val) =>
      ({ label: val.name, value: val._id })
   );
   const handleChange = (name, value) => {
      setFields((prevState) => ({ ...prevState, [name]: value }));
   }
   useEffect(() => {
      if (userId) props.crudActionAgenttCall(`${LIST_AGENTT_URL}/${userId}`, null, "GET")
   }, [userId])

   useEffect(() => {
      const action = props.agentt.action;
      if (props.agentt.agentt && userId) {
         setFields({ ...fields, ...props.agentt.agentt })
      }
   }, [props.agentt]);

   useEffect(() => {
      if (props.room.roomList) {
         setFields({
            ...fields,
            roomName: props.room.roomList && props.room.roomList.roomName ? props.room.roomList.roomName : "",
            aboutRoom: props.room.roomList && props.room.roomList.aboutRoom ? props.room.roomList.aboutRoom : "",
            noOfBedRoom: props.room.roomList && props.room.roomList.noOfBedRoom ? props.room.roomList.noOfBedRoom : "",
            houseRules: props.room.roomList && props.room.roomList.houseRules ? props.room.roomList.houseRules : [],
            aminities: props.room.roomList && props.room.roomList.aminities ? props.room.roomList.aminities : [],
            duration: props.room.roomList && props.room.roomList.duration ? props.room.roomList.duration : "",
            moveIn: props.room.roomList && props.room.roomList.moveIn ? moment(props.room.roomList.moveIn).toDate() : "",
            city: props.room.roomList && props.room.roomList.city ? props.room.roomList.city : "",
            ageRange: props.room.roomList && props.room.roomList.ageRange ? props.room.roomList.ageRange : "",
            area: props.room.roomList && props.room.roomList.area ? props.room.roomList.area : "",
            ageRange: props.room.roomList && props.room.roomList.ageRange ? props.room.roomList.ageRange : "",
            zipCode: props.room.roomList && props.room.roomList.zipCode ? props.room.roomList.zipCode : "",
            address: props.room.roomList && props.room.roomList.address ? props.room.roomList.address : "",
            flateMate: props.room.roomList && props.room.roomList.flateMate ? props.room.roomList.flateMate : "",
            deposite: props.room.roomList && props.room.roomList.deposite ? props.room.roomList.deposite : "",
            budget: props.room.roomList && props.room.roomList.budget ? props.room.roomList.budget : "",
            charges: props.room.roomList && props.room.roomList.charges ? props.room.roomList.charges : "",
            chargesType: props.room.roomList && props.room.roomList.chargesType ? props.room.roomList.chargesType : "",
            latitude: props.room.roomList && props.room.roomList.latitude ? props.room.roomList.latitude : "",
            longitude: props.room.roomList && props.room.roomList.longitude ? props.room.roomList.longitude : "",

         })
         updateRoomImageFile(props.room.roomList && props.room.roomList.roomImage && props.room.roomList.roomImage);
      }
   }, [props.room.roomList]);

   const setReadyToMove = (e) => {
      setFields((prevState) => ({ ...prevState, "moveIn": e }));
   }


   const handleChangeAddress = address => {
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
         .then(({ lat, lng }) => {
            setFields((prevState) => ({ ...prevState, ["address"]: address }));
            setFields((prevState) => ({ ...prevState, ["longitude"]: lng }));
            setFields((prevState) => ({ ...prevState, ["latitude"]: lat }));
         });
   };

   const searchOptions = {
      componentRestrictions: { country: ['us', 'ca', 'uy'] },
   }

   let fileData = [];
   const handlemultipleFileChange = e => {
      const files = Array.from(e.target.files);
      updateRoomImageFile(fileData);

      Promise.all(files.map(file => {
         fileData.push(file);
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

   const handleFileDelete = (key) => {
      const findArr = RoomImage.splice(key, 1);
      const propertyImageFileNew = RoomImageFile.splice(key, 1);
   }

   const handleFileDeleteApi = async(roomId,imageId) =>{
      let  {data}  = await axiosApiCall.delete(`${ADD_PROPERTY}/${roomId}/${imageId}`, null);
      setFields({ ...fields, ...props.room.roomList })

    }
   // console.log(props.room.roomList,fields, 'propertyId edit===============')
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
                              <Col xs={12} sm={12} md={6} lg={12}>
                                 <FormGroup>
                                    <Label>Search Places</Label>
                                    <PlacesAutocomplete
                                       onChange={handleChangeAddress}
                                       onSelect={handleSelect}
                                       searchOptions={searchOptions}
                                       value={fields.address}

                                    >
                                       {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                          <>
                                             <input
                                                {...getInputProps({
                                                   placeholder: 'Search Places ...',
                                                   className: 'form-control custm_inpt',
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
                                          </>
                                       )}
                                    </PlacesAutocomplete>
                                 </FormGroup>
                              </Col>
                           </Row>
                           <Row>

                              {/* </Row> */}

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
                              <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>Property Name</Label>
                                    <InputUI
                                       className="custm_inpt"
                                       type="text"
                                       name="roomName"
                                       id="roomName"
                                       placeholder="Property Name"
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
                           </Row>
                           <Row>
                              <Col xs={12} sm={12} md={12} lg={6}>
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
                              <Col xs={12} sm={12} md={6} lg={6}>
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
                                    <Label>Maximum Budget</Label>
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
                                 </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>Deposit</Label>
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
                                 </FormGroup>
                              </Col>
                           </Row>

                           <Row>
                              <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>Charges</Label>
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
                                 </FormGroup>

                              </Col>


                              <Col xs={12} sm={12} md={6} lg={6}>
                                 <FormGroup>
                                    <Label>Charges Type</Label>
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
                                 </FormGroup>
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
                                       <option value="">Choose your Bedrooms </option>
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
                                    <InputUI
                                       type="select"
                                       name="ageRange"
                                       id="ageRange"
                                       placeholder="Age Range"
                                       errors={errors}
                                       innerRef={register({
                                          required: 'This is required field',
                                       })}
                                       value={fields.ageRange}
                                       onChange={(e) =>
                                          handleChange(e.target.name, e.target.value)
                                       }
                                    >
                                       <option value="">Choose your Age Range </option>
                                       <option value="Early 20s">Early 20s</option>
                                       <option value="Late 20s">Late 20s</option>
                                       <option value="30s">30s</option>
                                       <option value="40s and older">40s and older</option>


                                    </InputUI>
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
                                 <div className="uploadImgs">

                                    {
                                       props.room.roomList && props.room.roomList.roomImage && props.room.roomList.roomImage.length > 0 &&
                                       props.room.roomList.roomImage.map((value, key) => {
                                          return (
                                             <div className="uPic">
                                                <img key={key} src={getImageUrl(value.image)} alt="Image Preview" />
                                                <a href="#" onClick={e => handleFileDeleteApi(props.room.roomList._id, value._id)} >
                                                   <FontAwesomeIcon icon={faTimesCircle} />
                                                </a>
                                             </div>
                                          );
                                       })
                                    }

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
                           <Button color="blue" type="submit" className="px-4"  >{propertyId ? "Update Property " : "Upload Property"}</Button>
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
   const { agent, house, agentt, city, room } = state;
   return {
      agent,
      house,
      agentt,
      city,
      room
   }
}
const mapDispatchToProps = dispatch => {
   return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "AGENT")),
      resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
      crudActionHouseCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "HOUSE")),
      crudActionAgenttCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "AGENTT")),
      crudActionCityCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY")),
      crudActionAgentCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, 'ROOM')),
      crudActionEditCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM")),
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProperty));