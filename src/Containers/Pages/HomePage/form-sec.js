import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { TabContent, TabPane, Card, CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';
import { NavLink } from "react-router-dom";

const Formsec = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

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
                    <Input
                      type="date"
                      name="date"
                      id="exampleDate"
                      placeholder="Move Date"
                    />
                  </Col>
                  <Col sm={4}>
                      <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="Duration"
                      />
                  </Col>
                  <Col sm={4}>
                      <InputGroup>
                        <Input placeholder="Budget" min={0} max={100} type="number" step="1" />
                        <InputGroupAddon addonType=""><img src={imagePath.moneyImage} alt="image" className="moneyImage"/></InputGroupAddon>
                      </InputGroup>
                  </Col>
                </FormGroup>
                <div className="d-flex justify-content-center">
                    <a href="#" className="black-bt">Search Now</a>
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
                <Input type="range" name="range" id="exampleRange" />
              </Col>
              <Col sm={4}>
                  <Input className="work" type="email" name="email" id="exampleEmail" placeholder="Occupation" />
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
          <a href="#" className="black-bt">Search Now</a>
      </div>
    
    </div>
        </TabPane>
      </TabContent>
      </div>
    </div>
  );
}

 
  
  export default Formsec;