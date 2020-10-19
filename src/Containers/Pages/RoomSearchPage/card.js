import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShareAlt, } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card, CardImg, CardBody, CardFooter,
  CardTitle, CardSubtitle,Row, Col} from 'reactstrap';
import{getImageUrl} from '../../../shared/helpers';
const Cardbox = (props) => {
  console.log("Cardbox",props.val)
  const roomData = props.val;
    return (

        <Card className="mt-5">
          <div className="">
          <CardImg className="roomimg" top width="100%" src={roomData.roomImage && roomData.roomImage.length>0?getImageUrl(roomData.roomImage[0]?roomData.roomImage[0].image:''):imagePath.roomImage1} alt="Card image cap"/>
            <div className="roomuser">
              <img src={roomData.user_Id && roomData.user_Id.profilePicture?getImageUrl(roomData.user_Id.profilePicture):imagePath.roomuserImage} alt="image"/>
              {/* <a href="#"><img src={imagePath.userfbImage} alt="image"/></a> */}
            </div>
          </div>
          <CardBody className="px-3 py-2">
            <div className="">
              <CardTitle>{roomData?roomData.roomName:"...."}</CardTitle>
              <CardSubtitle><img src={imagePath.mappinImage} alt="image"/>{roomData.address?roomData.address:"......"}</CardSubtitle>
            </div>
            <div className="d-flex justify-content-between mt-2">
             <h6><img src={imagePath.bedImage} className="pr-2" alt="image"/>{roomData.noOfBedRoom?roomData.noOfBedRoom:'No bedroom'}</h6>
              <CardSubtitle><img src={imagePath.areaImage} className="pr-2" alt="image"/>{roomData.area?roomData.area:"0"} sq ft</CardSubtitle>
            </div>
          </CardBody>
          <CardFooter className="">

            <div className="d-flex justify-content-between">
              <div className="py-2"><h6 className="org">{roomData.charges?'$'+roomData.charges+'/'+roomData.chargesType:'No charges'}</h6></div>
              <div className="border-left border-right p-2"><FontAwesomeIcon color="red" icon={faHeart} /></div>
              <div className="py-2"><FontAwesomeIcon icon={faShareAlt} /></div>
            </div>
          </CardFooter>
        </Card>

    );
  }
  
  export default Cardbox;