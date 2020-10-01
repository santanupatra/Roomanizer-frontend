import React,{useState ,useEffect} from 'react';
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
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { USERLIST_URL } from '../../../shared/allApiUrl';
import { getImageUrl } from '../../../shared/helpers';
import { withRouter } from 'react-router-dom';


const Cardbox = (props) => {
  const getUserList = () => {
    props.crudActionCall(USERLIST_URL + '?keyword&page=0', null, "GET_ALL")
}

useEffect(() => {
    getUserList();
    return () => {
        // cleanup
    }
}, []);

useEffect(() => {
    const { type, isSuccess } = props.user.action;
    if (type === "DELETE" && isSuccess)
        getUserList();
}, [props.user]);
  //console.log(props.user.userList.list)
  return (

    <Card>
      <CardImg top width="100%" src={imagePath.roommateImage1} alt="Card image cap" />
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <CardTitle>Carls Jhons</CardTitle>
          <CardSubtitle>Male</CardSubtitle>
        </div>
        <div className="d-flex justify-content-between">
          <h6><FontAwesomeIcon icon={faCalendarAlt} />7 th April 20</h6>
          <CardSubtitle>Age: 25</CardSubtitle>
        </div>
      </CardBody>
      <CardFooter className="">
        <Row>
          <Col sm={8} className="py-2"><h6 className="org">$2.50 / Month</h6></Col>
          <Col sm={2} className="border-left border-right py-2"><FontAwesomeIcon color="red" icon={faHeart} /></Col>
          <Col sm={2} className="py-2"><FontAwesomeIcon icon={faShareAlt} /></Col>
        </Row>
      </CardFooter>
    </Card>

    );

    
  }
  const mapStateToProps = state => {
    const { user } = state;
    return {
        user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER"))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cardbox));
  //export default Cardbox;