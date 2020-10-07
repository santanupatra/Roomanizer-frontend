import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import { TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { NavLink } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';

import ReactSimpleRange from 'react-simple-range';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Formsec = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);

    return (
       
      <div className="home-form">
      
      <Nav tabs className="pl-5">
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
            <Col sm="12">

              <div className="">
            
                  <FormGroup row>
                      <Col sm={4}>
                      <Input type="select" name="select" id="exampleSelect">
                          <option>Luxembourg</option>
                          <option>2</option>
                          <option>3</option>
                      </Input>
                      </Col>
                      <Col sm={8}>
                          <Input className="search" type="email" name="email" id="exampleEmail" placeholder="Enter a street, area or city" />
                      </Col>
                </FormGroup>
                <FormGroup row className="mt-4">
                  <Col sm={4}>
                    <InputGroup>
                      <DatePicker selected={startDate} placeholderText="Move Date" className="form-control" name="date" id="exampleDate" onChange={date => setStartDate(date)} />
                      <InputGroupAddon addonType="icon"><FontAwesomeIcon icon={faCalendarAlt} /></InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col sm={4}>
                      <InputGroup>
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
                      </InputGroup>
                  </Col>
                  <Col sm={4}>
                      <InputGroup>
                        <Input placeholder="Budget" className="numberfild" min={0} max={100} type="number" step="1" />
                        <InputGroupAddon addonType="icon"><img src={imagePath.moneyImage} alt="image" /></InputGroupAddon>
                      </InputGroup>
                  </Col>
                </FormGroup>
                <div className="d-flex justify-content-center">
                    <Button color="" className="black-bt">Search Now</Button>
                </div>
              
              </div>
              
            </Col>
          </Row>
        </TabPane>


        <TabPane tabId="2">
        <div className="">
            
        <FormGroup row>
            <Col sm={4}>
            <Input type="select" name="select" id="exampleSelect">
                <option>Luxembourg</option>
                <option>2</option>
                <option>3</option>
            </Input>
            </Col>
            <Col sm={8}>
                <Input className="search" type="email" name="email" id="exampleEmail" placeholder="Enter a street, area or city" />
            </Col>
      </FormGroup>
      <FormGroup row className="mt-4">
          <Col Col sm={4}>
                <Label for="">Age</Label>
                <ReactSimpleRange
                  min={1}
                  max={100}
                  label={true}
                  sliderSize={5}
                  sliderColor='#ccc'
                  trackColor='#014d81'
                  thumbColor='#014d81'
                 />
              </Col>
              <Col sm={4}>
                <InputGroup>
                  <Input placeholder="Occupation" type="text" />
                  <InputGroupAddon addonType="icon"><FontAwesomeIcon icon={faBriefcase} /></InputGroupAddon>
                </InputGroup>
              </Col>
          <Col sm={4}>
            <Input type="select" name="select" id="exampleSelect">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </Input>
          </Col>
      </FormGroup>
      <div className="d-flex justify-content-center">
        <Button color="" className="black-bt">Search Now</Button>
      </div>
    
    </div>
        </TabPane>
      </TabContent>
      </div>
    </div>
  );
}

 
  
  export default Formsec;