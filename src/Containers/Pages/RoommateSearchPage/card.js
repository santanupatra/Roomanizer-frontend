import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShareAlt, } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card, CardImg, CardText, CardBody, CardFooter,
  CardTitle, CardSubtitle} from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import moment from 'moment';

import { getImageUrl } from '../../../shared/helpers';


const Cardbox = (props) => {
  const val = (props.val)  
  return (

    <Card>
      <CardImg top width="100%" src={getImageUrl(val.profilePicture)} alt="Card image cap" />
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <CardTitle>{val.firstName + ' ' +val.lastName}</CardTitle>
          <CardSubtitle>{val.gender}</CardSubtitle>
        </div>
        <div className="d-flex justify-content-between">
          <h6><FontAwesomeIcon icon={faCalendarAlt} />{(val.readyToMove)? moment(val.readyToMove).format('YYYY-MM-DD') : ''}</h6>
            <CardSubtitle>Age: {val.age}</CardSubtitle>
        </div>
      </CardBody>
      <CardFooter className="">
        <Row>
          <Col sm={8} className="py-2"><h6 className="org">${val.maxBudget} / Month</h6></Col>
          <Col sm={2} className="border-left border-right py-2"><FontAwesomeIcon color="red" icon={faHeart} /></Col>
          <Col sm={2} className="py-2"><FontAwesomeIcon icon={faShareAlt} /></Col>
        </Row>
      </CardFooter>
    </Card>

    );
  }
  
  export default Cardbox;