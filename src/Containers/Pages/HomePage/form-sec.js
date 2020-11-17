import React,{useState , useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, InputGroupAddon ,TabContent, TabPane,Row, Col, Button,Nav, NavItem,FormGroup, Label, Input} from 'reactstrap';
import classnames from 'classnames';
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import ReactSimpleRange from 'react-simple-range';
import { callApi} from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";
import { CITY_URL} from '../../../shared/allApiUrl';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
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

const Formsec = () => {
  const initialFields = {
    gender: "",
    occupation: "",
    city:"",
    cityList:"",
    duration:"",
  //  address:"",
    budget:"",
  }
console.log("loginuseId",localStorage.getItem('userId'))
  const loginUserId = localStorage.getItem('userId');
  const [activeTab, setActiveTab] = useState('1');
  const [startDate, setStartDate] = useState('');
  const [fields, setFields] = useState(initialFields);
  const [cityList, setCityList] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const history = useHistory();
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
console.log("startDate",startDate);
  useEffect(() => {
    callApi(apiBaseUrl+"/web/"+CITY_URL,'GET','').then(
      response => {
        let option = response.data;
        setCityList(option);
      }
    )
  },[]);

  const searchSubmit = (data) => {
    let city = fields.city;
    let occupation = fields.occupation;
    let gender = fields.gender;
    let searchpara;
    
    if(loginUserId){
        searchpara = '?city='+city+'&occupation='+occupation+'&gender='
        +gender+'&age='+age+'&lat='+latitude+'&lng='+longitude+'&bedrooms=&amenities=&houserules=&page=0&loginUserId='+loginUserId;
    }else{
        searchpara = '?city='+city+'&occupation='+occupation+'&gender='
                        +gender+'&age='+age+'&lat='+latitude+'&lng='+longitude+'&bedrooms=&amenities=&houserules=&page=0';
    }
    history.push('/roomMateSearch/'+searchpara);
    
  }
const searchRoom = (data) =>{
   
    let city = fields.city;
    let duration = fields.duration;
    let budget = fields.budget;
    let gender = fields.gender;
    let sendDate;
    if(startDate==''){
      sendDate=startDate;
    }else{
      sendDate=moment(startDate).format('YYYY-MM-DD');
    }
    let searchpara;
    if(loginUserId){
       searchpara = '?city='+city+'&moveIn='+sendDate+'&gender='
       +gender+'&duration='
      +duration+'&budget='+budget+'&location='+address+'&bedrooms=&amenities=&houserules=&page=0&loginUserId='+loginUserId;
    }else {
        searchpara = '?city='+city+'&moveIn='+sendDate+'&gender='
        +gender+'&duration='
                        +duration+'&budget='+budget+'&location='+address+'&bedrooms=&amenities=&houserules=&page=0';
    }
    

        history.push('/roomSearch/'+searchpara);
}
  const handleChange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
  const searchOptions = {
    componentRestrictions: { country: ['us','ca','uy'] },
    //types: ['city']
  }
  const handleChangeAddress = address => {
    console.log(address)
    setAddress(address);
  };
  const handleSelect = address => {
    //setFields((prevState) => ({ ...prevState, ["street"]: address.structured_formatting.main_text }));
   // setFields((prevState) => ({ ...prevState, ["street"]: address })); 
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
    //  .then(latLng => console.log('Success', latLng))
    //  .catch(error => console.error('Error', error));

      .then(({ lat, lng }) => {
              console.log("lat==",lat,"lng==",lng)
              console.log(address);
              setAddress(address);
              setLatitude(lat)
              setLongitude(lng)

              
              // setFields((prevState) => ({ ...prevState, ["address"]: address }));
              // setFields((prevState) => ({ ...prevState, ["longitude"]: lng }));
              // setFields((prevState) => ({ ...prevState, ["latitude"]: lat }));
            });
  };

    return (
       
    <div className="home-form">
      
      <Nav tabs className="pl-3 pl-sm-5 pl-md-5 pl-lg-5">
        <NavItem>
          <NavLink to="#"
            className={classnames({ activeBase: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >Find a Place
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="#"
            className={classnames({ activeBase: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Find Roommate
          </NavLink>
        </NavItem>
      </Nav>
      <div className="form-bg">
      <TabContent activeTab={activeTab}>

        <TabPane tabId="1">
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <FormGroup>
                <Input 
                  type="select" 
                  name="city" 
                  id="city"
                  value={fields.city}
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                  }
                >
                  <option value="">City</option>
                  {
                    cityList!='' && cityList.map((val) =>{
                      return(
                        <option value={val.cityName}>{val.cityName}</option>
                      );
                    })
                  } 
                </Input>
              </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8}>
              <FormGroup>
                <Input 
                    className="search" 
                    type="text" 
                    name="address" 
                    id="address"
                    placeholder="Enter a street, area or city"
                    onChange={event => setAddress(event.target.value)}
                  />
                 
              </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
              <FormGroup>
                <InputGroup>
                  <DatePicker selected={startDate} placeholderText="Move Date" className="form-control" name="date" id="exampleDate" onChange={date => setStartDate(moment(date).toDate())} />
                  <InputGroupAddon addonType="icon"><FontAwesomeIcon icon={faCalendarAlt} /></InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <FormGroup>
                  {/* <InputGroup>
                    <DatePicker
                      selected={startTime}
                      onChange={date => setStartTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      className="form-control"
                      name="time"
                      id="exampleTime"
                      timeIntervals={15}
                      placeholderText="Duration"
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                    <InputGroupAddon addonType="icon"><FontAwesomeIcon icon={faClock} /></InputGroupAddon>
                  </InputGroup> */}
                      <Input 
                        type="select" 
                        name="duration" 
                        id="duration"
                        value={fields.duration}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                    >
                      <option selected >Choose your Duration </option>
                      <option value="1-3 Months">1-3 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="6 Months">6+ Months</option>
                  </Input>
                </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <FormGroup>
                <InputGroup>
                  <Input placeholder="Budget" className="numberfild" min={0} max={100} type="number" name="budget" id="budget" step="1" onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }/>
                  <InputGroupAddon addonType="icon"><img src={imagePath.moneyImage} alt="image" /></InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <span><Button color="" className="black-bt" onClick={searchRoom}>Search Now</Button></span>
            </Col>
            </Row>
        </TabPane>


        <TabPane tabId="2">
          
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <FormGroup>
              <Input 
                type="select" 
                name="city" 
                id="city"
                value={fields.city}
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value)
                }
              >
                <option value="">City</option>
                {
                  cityList!='' && cityList.map((val) =>{
                    return(
                      <option value={val.cityName}>{val.cityName}</option>
                    );
                  })
                } 
              </Input>
              </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8}>
              <FormGroup>
                {/* <Input 
                  className="search" 
                  type="text" 
                  name="address" 
                  id="address"
                  placeholder="Enter a street, area or city"
                  onChange={event => setAddress(event.target.value)}
                /> */}
                 <PlacesAutocomplete
                    onChange={handleChangeAddress}
                    //onChange={event => setAddress(event.target.value)}
                    onSelect={handleSelect}
                    searchOptions={searchOptions}
                    value={address}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <input
                          {...getInputProps({
                            placeholder: 'Enter a street, area or city',
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
              </FormGroup>
            </Col>
            </Row>
          <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
              <FormGroup>
                <Label for="">Age</Label>
                <ReactSimpleRange
                  min={1}
                  max={100}
                  label={true}
                  sliderSize={5}
                  sliderColor='#ccc'
                  trackColor='#014d81'
                  thumbColor='#014d81'
                  value = {age}
                  onChange={value =>{setAge(value.value);}}
                 />
                 </FormGroup>
              </Col>
              
              <Col xs={12} sm={12} md={3} lg={3}>
                <FormGroup>
                  <Input 
                    type="select" 
                    name="occupation" 
                    id="occupation"
                    value={fields.occupation}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  >
                    <option value="">Occupation</option>
                    <option value="Student">Student</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Other">Other</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={3} lg={3}>
                <FormGroup>
                  <Input 
                    type="select" 
                    name="gender" 
                    id="gender"
                    value={fields.gender}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={3} lg={3}>
                <Button color="" onClick={searchSubmit} className="black-bt">Search Now</Button>
              </Col>
          </Row>
        </TabPane>
      </TabContent>
      </div>
    </div>
  );
}

 
  
  export default Formsec;