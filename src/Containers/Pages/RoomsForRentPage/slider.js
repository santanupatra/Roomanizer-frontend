import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { ROOM_URL } from '../../../shared/allApiUrl';
import {getImageUrl} from '../../../shared/helpers'

// const items = [
//   {
//     src: imagePath.slider1Image,
//   },
//   {
//     src: imagePath.slider1Image,
//   },
//   {
//     src: imagePath.slider1Image,
//   }
// ];

const Slider = (props) => {
  const initialFields = {
    user_Id: "",
    roomNo: "",
    bathNo:"",
    aboutRoom:"",
    address:"",
    age:"",
    aminities: null,
    area:"",
    budget:"",
    charges:"",
    chargesType:"",
    city:"",
    deposite:"",
    duration:"",
    flateMate:"",
    houseRules:[],
    latitude:null,
    location:[],
    longitude:null,
    moveIn:"",
    noOfBedRoom:'',
    roomName:"",
    zipCode:"",
    ageRange:"",
    aminities:[],
    roomImage:[]
  
      }
    
    
    
      //const params = props.match.params;
    let userId = props.match.params.userId;
    // const userData = props.user.user;
    const [fields, setFields] = useState(initialFields);
    const [userData, setUserDate] = useState(null);
    const [settingId, setSettingId] = useState(null);
  
  
    useEffect(() => {
      props.crudActionCall(`${ROOM_URL}/${userId}`, null, "GET")
      //setUserDate(props.user.action.data);
      
  
      
    },[userId]);
  
    useEffect(() => {
      const action = props.room.room;
  
      if (props.room.room) {
        setFields({ ...fields, ...props.room.room });
       setSettingId(props.room.room._id);
       
      }
      
  
    }, [props.room]);
     console.log(fields.houseRules)
     console.log(fields.roomImage)

  // console.log(props.val)
  const items = fields.roomImage.map((val) =>  
  // src={getImageUrl(fields.profilePicture)}
    ({ src: getImageUrl(val.image)})  
  )
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  const slides = items===''?'':items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src}  />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >

      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

// export default Slider;


const mapStateToProps = state => {
  const { room } = state;
  return {
    room
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Slider));