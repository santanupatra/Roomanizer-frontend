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
import { withRouter ,useHistory} from "react-router";
import { connect } from 'react-redux';
import { crudAction } from '../../../store/actions/common';
import { FAV_URL } from '../../../shared/allApiUrl';

import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import moment from 'moment';

import { getImageUrl } from '../../../shared/helpers';


const Cardbox = (props) => {
  const history = useHistory();
  console.log(localStorage.getItem('userId'))
  const[fav,setFav]=useState();
   
  let loginUserId = localStorage.getItem('userId');
  //console.log(props.match.params.userId)



  const getCityList = () => {
    props.crudActionCall(`${FAV_URL}/${loginUserId}`, null, "GET_ALL")
}

 useEffect(() => {
     getCityList();
     return () => {
         // cleanup
     }
 }, []);


  const click = () =>{
  if(localStorage.getItem('userId') == null){
   history.push('/login') 
  }else{ 
   // localStorage.setItem('a',val._id)
    let a = true
       // let a = true
        // const b = localStorage.getItem('userId')
        // console.log(b)
        // const c = "roomMate"
        // console.log(c)
        // data.loginUserId = b
        // data.roomMateId = val._id 
        // data.type = c
        // console.log(data)
       const data = {
          loginUserId : localStorage.getItem('userId') ,
          roomMateId :   val._id     ,
         // type :    "roomMate"    ,
        }
        console.log(data)
        props.crudActionCall(FAV_URL,data,"ADD");
        setFav(a)
      }
 }
 const click2 = () =>{
  
  //localStorage.removeItem('a')
  let a = false
  const data = {
    loginUserId : localStorage.getItem('userId') ,
    roomMateId :   val._id     ,
    type :    "roomMate"    ,
  }
  console.log(data)
  props.crudActionCall(FAV_URL,data,"ADD");
  setFav(a)

 }
 const listItems = props.favorite.favoriteList.map((myList) =>  
    <li>{myList}</li>
  
  
  );
  console.log(listItems[0])
  console.log(props.favorite.favoriteList)
  const val = (props.val) 
  console.log(val) 
  return (

    <Card>
      <div className="listingImgBox">
        {val.profilePicture ?
        <CardImg  src={getImageUrl(val.profilePicture)} alt="Card image cap" />
        :
        <CardImg  src={imagePath.noImage} alt="Card image cap" />
        }
      </div>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <CardTitle>{val.firstName?val.firstName:''} {val.lastName?val.lastName:''}</CardTitle>
          <CardSubtitle>{val.gender}</CardSubtitle>
        </div>
        <div className="d-flex justify-content-between">
          <h6><FontAwesomeIcon icon={faCalendarAlt} />{(val.readyToMove)? moment(val.readyToMove).format('YYYY-MM-DD') : ''}</h6>
            <CardSubtitle>Age: {val.age}</CardSubtitle>
        </div>
      </CardBody>
      <CardFooter className="">
        <div className="d-flex justify-content-between">
      <div className="py-2"><h6 className="org">${val.maxBudget}</h6></div>
      {fav?
        
       <div className="border-left border-right p-2"><button type="checkbox" onClick={click2} className="wishlistbtn"><img src={imagePath.heartsolid}/></button></div>
       : <div className="border-left border-right p-2"><button type="checkbox"  onClick={click} className="wishlistbtn"><img src={imagePath.heartoutLine}/></button></div>
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
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "FAVORITE")),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cardbox));
  
  
  
  
 // export default Cardbox;