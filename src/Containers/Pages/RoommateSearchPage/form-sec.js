import React,{useState} from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormGroup, Label, Input, Col } from 'reactstrap';



const Formsec = (props) => {
    return (
      <div className="">
        
        <FormGroup row>
            <Col sm={3}>
            <Label for="">Location</Label>
            <Input type="select" name="select" id="exampleSelect">
                <option>Luxembourg</option>
                <option>2</option>
                <option>3</option>
            </Input>
            </Col>
            <Col Col sm={2}>
              <Label for="">Age</Label>
              <Input type="range" name="range" id="exampleRange" />
            </Col>
            <Col sm={2}>
            <Label for="">Occupation</Label>
                <Input className="work" type="email" name="email" id="exampleEmail" placeholder="Students" />
            </Col>
        <Col sm={2}>
          <Label for="">Gender</Label>
          <Input type="select" name="select" id="exampleSelect">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </Input>
        </Col>
        <Col sm={1} className="pr-0">
            <Label for="">Filter</Label>
            <a href="#" className="filter"></a>
        </Col>
        <Col sm={2} className="pt-4 pl-4">
          <a href="#" className="black-bt">Search Now</a>
        </Col>
      </FormGroup>
      </div>
    );
  }
  
  export default Formsec;