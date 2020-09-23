import React,{useState} from 'react';
import './style.css';
import imagePath from '../imageConstants';
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


const Cardlist = (props) => {
    return (

    <Card className="mt-5">
      <div className="">
      <CardImg className="roomimg" top width="100%" src={imagePath.roomImage1} alt="Card image cap"/>
        <div className="roomuser">
          <img src={imagePath.roomuserImage} alt="image"/>
          <a href="#"><img src={imagePath.userfbImage} alt="image"/></a>
        </div>
      </div>
      <CardBody className="px-3 pt-3 pb-0">
        <div className="">
          <CardTitle>Park Road Appartment Rent</CardTitle>
          <CardSubtitle><img src={imagePath.mappinImage} alt="image"/>528/9 Street Name Lane Boise</CardSubtitle>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <h6><img src={imagePath.bedImage} className="pr-2" alt="image"/>3 Bedroom</h6>
          <CardSubtitle><img src={imagePath.areaImage} className="pr-2" alt="image"/>720 sq ft</CardSubtitle>
        </div>

        <CardFooter className="mt-2">
        <Row>
          <Col sm={8} className="py-2"><h6 className="org">$2.50 / Month</h6></Col>
          <Col sm={2} className="border-left border-right px-2 py-2"><FontAwesomeIcon color="red" icon={faHeart} /></Col>
          <Col sm={2} className="py-2"><FontAwesomeIcon icon={faShareAlt} /></Col>
        </Row>
      </CardFooter>

      </CardBody>
      
    </Card>

    );
  }
  
  export default Cardlist;