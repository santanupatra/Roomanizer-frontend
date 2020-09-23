import React,{useState} from 'react';
import './style.css';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormGroup, Col, Input } from 'reactstrap';



const Formsec = (props) => {
    return (
      <div className="">
        
        <FormGroup row>
            <Col sm={3} className="pr-0">
            <Input type="select" name="select" id="exampleSelect">
                <option>Luxembourg</option>
                <option>2</option>
                <option>3</option>
            </Input>
            </Col>
            <Col sm={5} className="pr-0">
              <Input className="search" type="email" name="email" id="exampleEmail" placeholder="Enter a street, area or city" />
            </Col>
        <Col sm={2} className="">
            <a href="#" className="filter"></a>
        </Col>
        <Col sm={2} className="pl-0">
          <a href="#" className="black-bt">Search</a>
        </Col>
      </FormGroup>
      </div>
    );
  }
  
  export default Formsec;