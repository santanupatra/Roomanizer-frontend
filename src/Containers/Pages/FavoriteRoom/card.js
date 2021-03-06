import React, { useState } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShareAlt, } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card, CardImg, CardBody, CardFooter,
  CardTitle, CardSubtitle, Row, Col
} from 'reactstrap';
import { getImageUrl } from '../../../shared/helpers';
import { FAV_URL } from '../../../shared/allApiUrl';
import { connect } from 'react-redux';
import { withRouter, useHistory } from "react-router";
import { crudAction } from '../../../store/actions/common';


const Cardbox = (props) => {
  //console.log(props.val)
  const val=props.val
  //console.log(val.roomId.user_Id)
  //console.log(val.roomId.roomImage.length)
  const[fav,setFav]=useState(false);
  const[fa,setFa]=useState(false);

  // const val = (props.val) 
  console.log(props.getFavRoomList)
  const clickToSolidHeart = () => {
    const a = true
    const data = {
      loginUserId: localStorage.getItem('userId'),
      roomId: val.roomId._id,
      type: "room",
    }
    console.log(data)
    props.crudActionCall(FAV_URL, data, "ADD");
    console.log('run')
    props.getFavRoomList()
  }
  return (

    <Card className="mt-5">
      <div className="">
        <CardImg className="roomimg" top width="100%" src={val.roomId.roomImage && val.roomId.roomImage.length > 0 ? getImageUrl(val.roomId.roomImage[0] ? val.roomId.roomImage[0].image : "") : imagePath.roomImage1} alt="Card image cap" />
        <div className="roomuser">
          <img src={val.roomId.user_Id && val.roomId.user_Id.profilePicture ? getImageUrl(val.roomId.user_Id.profilePicture) : imagePath.roomuserImage} alt="image" />
          {/* <a href="#"><img src={imagePath.userfbImage} alt="image"/></a> */}
        </div>
      </div>
      <CardBody className="px-3 py-2">
        <div className="">
          <CardTitle>{val.roomId.roomName}</CardTitle>
          <CardSubtitle><img src={imagePath.mappinImage} alt="image" />{val.roomId.address},{val.roomId.city},{val.roomId.zipCode}</CardSubtitle>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <h6><img src={imagePath.bedImage} className="pr-2" alt="image" />{val.roomId.noOfBedRoom}</h6>
          <CardSubtitle><img src={imagePath.areaImage} className="pr-2" alt="image" />{val.roomId.area} sq ft</CardSubtitle>
        </div>
      </CardBody>
      <CardFooter className="">
        <div className="d-flex justify-content-between">
          <div className="py-2"><h6 className="org">${val.roomId.charges} / {val.roomId.chargesType}</h6></div>
          {/* <div className="border-left border-right p-2"><FontAwesomeIcon color="red" icon={faHeart} /></div>
               */}
          {fav ?
            <div className="border-left border-right p-2"><button className="wishlistbtn"><img src={imagePath.heartoutLine} /></button></div>
            :
            <div className="border-left border-right p-2"><button className="wishlistbtn"
              onClick={() => {
                clickToSolidHeart();
                props.getFavRoomList();
              }} >
              <img src={imagePath.heartsolid} /></button></div>
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