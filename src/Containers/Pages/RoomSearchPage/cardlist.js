import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card, CardImg, CardBody, CardFooter,
  CardTitle, CardSubtitle,Row, Col} from 'reactstrap';
import{getImageUrl} from '../../../shared/helpers';


const Cardlist = (props) => {
  const roomData = props.val;
console.log("props.val",props.val.user_Id._id)
    return (
    <Card className="mt-5 d-block d-sm-flex d-md-flex d-lg-flex">
      <div className="">
      <CardImg className="roomimg" top width="100%" src={roomData.roomImage && roomData.roomImage.length>0?getImageUrl(roomData.roomImage[0]?roomData.roomImage[0].image:''):imagePath.roomImage1} alt="Card image cap"/>
        <div className="roomuser">
          
            <img src={roomData.user_Id && roomData.user_Id.profilePicture?getImageUrl(roomData.user_Id.profilePicture):imagePath.roomuserImage} alt="image"/>
          
          {/* <a href="#"><img src={imagePath.userfbImage} alt="image"/></a> */}
        </div>
      </div>
      <CardBody className="px-3 pt-3 pb-0">
        <div className="">
              <CardTitle>{roomData?roomData.roomName:"...."}</CardTitle>
              <CardSubtitle><img src={imagePath.mappinImage} alt="image"/>{roomData.address?roomData.address:"......"}</CardSubtitle>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <h6><img src={imagePath.bedImage} className="pr-2" alt="image"/>{roomData.noOfBedRoom?roomData.noOfBedRoom:'No bedroom'}</h6>
          <CardSubtitle><img src={imagePath.areaImage} className="pr-2" alt="image"/>{roomData.area?roomData.area:"0"} sq ft</CardSubtitle>
        </div>

        <CardFooter className="mt-2">
        <div className="d-flex">
          <Col sm={8} className="py-2"><h6 className="org">{roomData.charges?'$'+roomData.charges+'/'+roomData.chargesType:'No charges'}</h6></Col>
          <Col sm={2} className="border-left border-right px-2 py-2"><FontAwesomeIcon color="red" icon={faHeart} /></Col>
          <Col sm={2} className="py-2"><FontAwesomeIcon icon={faShareAlt} /></Col>
        </div>
      </CardFooter>

      </CardBody>
      
    </Card>

    );
  }
  
  export default Cardlist;