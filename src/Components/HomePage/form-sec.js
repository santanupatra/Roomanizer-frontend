import React,{useState} from 'react';
import './style.css';
import imagePath from '../imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';


const Formsec = (props) => {
    return (
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
    );
  }
  
  export default Formsec;