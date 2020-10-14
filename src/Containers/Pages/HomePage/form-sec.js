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

const Formsec = () => {
  const initialFields = {
    gender: "",
    occupation: "",
    city:"",
    cityList:""
  }

  const [activeTab, setActiveTab] = useState('1');
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const [fields, setFields] = useState(initialFields);
  const [cityList, setCityList] = useState([]);
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const history = useHistory();

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

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

    history.push('/roomMateSearch/?city='+city+'&occupation='+occupation+'&gender='+gender+'&age='+age+'&location='+address);
    
  }

  const handleChange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }

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
                  <DatePicker selected={startDate} placeholderText="Move Date" className="form-control" name="date" id="exampleDate" onChange={date => setStartDate(date)} />
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
            <Col xs={12} sm={12} md={3} lg={3}>
              <FormGroup>
                <InputGroup>
                  <Input placeholder="Budget" className="numberfild" min={0} max={100} type="number" step="1" />
                  <InputGroupAddon addonType="icon"><img src={imagePath.moneyImage} alt="image" /></InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <span><Button color="" className="black-bt">Search Now</Button></span>
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