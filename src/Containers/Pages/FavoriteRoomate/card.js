import React,{useState,useEffect} from 'react';
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
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter, useHistory } from "react-router";
import { crudAction } from '../../../store/actions/common';
import { FAV_URL } from '../../../shared/allApiUrl';
import { getImageUrl } from '../../../shared/helpers';


const Cardbox = (props) => {
  const[fav,setFav]=useState(false);
  const[fa,setFa]=useState(false);

  const val = (props.val) 
  console.log(props.getFavRoommateList)
  
  const clickToSolidHeart = () => {
    const a = true
    const data = {
      loginUserId: localStorage.getItem('userId'),
      roomMateId: val.roomMateId._id,
      type: "roomMate",
    }
    console.log(data)
    props.crudActionCall(FAV_URL, data, "ADD");
    console.log('run')
     props.getFavRoommateList()
  }
  return (
    <Card>
      <div className="listingImgBox">
      <Link to={`/viewProfile/${val.roomMateId._id}`}>
        {val.roomMateId.profilePicture ?
        <CardImg  src={getImageUrl(val.roomMateId.profilePicture)} alt="Card image cap" />
        
        :<CardImg  src={imagePath.noImage} alt="Card image cap" />
          }
      </Link>    
      </div>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <CardTitle>{val.roomMateId.firstName?val.roomMateId.firstName:''} {val.roomMateId.lastName?val.roomMateId.lastName:''}</CardTitle>
          <CardSubtitle>{val.roomMateId.gender}</CardSubtitle>
        </div>
        <div className="d-flex justify-content-between">
          <h6><FontAwesomeIcon icon={faCalendarAlt} />{(val.roomMateId.readyToMove)? moment(val.roomMateId.readyToMove).format('YYYY-MM-DD') : ''}</h6>
            <CardSubtitle>Age: {val.roomMateId.age}</CardSubtitle>
        </div>
      </CardBody>
      <CardFooter className="">
          <div className="d-flex justify-content-between">
            <div className="py-2"><h6 className="org">${val.roomMateId.maxBudget}</h6></div>
                {fav  ?
                  <div className="border-left border-right p-2"><button className="wishlistbtn"><img src={imagePath.heartoutLine}/></button></div> 
                  :
                  <div className="border-left border-right p-2"><button className="wishlistbtn" 
                  onClick={() => {
                    clickToSolidHeart();
                    props.getFavRoommateList();
                }} >
                  <img src={imagePath.heartsolid}/></button></div>
                }
              <div className="py-2"><FontAwesomeIcon icon={faShareAlt} /></div>
          </div>
      </CardFooter>
    </Card>

    );
  }
  const mapStateToProps = state => {
    const { favorite } = state;
    return {
      favorite
      
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "FAVORITE"))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cardbox));