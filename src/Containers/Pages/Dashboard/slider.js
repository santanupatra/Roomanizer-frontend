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
import {getImageUrl} from '../../../shared/helpers'


    

const Slider = (props) => {
    const [roomImageItem, setroomImageItem] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [itemTrue, setItemTrue] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
      setroomImageItem(props.roomImage)
      setItemTrue(true)
    },[props.roomImage]);
    useEffect(() => {
      getItem()
    },[itemTrue,roomImageItem]);
    
    
    let itemsArr =[];
    const getItem=async()=>{
      if(roomImageItem && roomImageItem.length > 0){
        const newList = await Promise.all(roomImageItem.map(async(val,key) => {
          itemsArr.push({ src: getImageUrl(val.image)}) 
        }))
        setItems(itemsArr)
      }
    }

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
        <img src={item.src}  className="img-fluid slider-img"/>
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

 export default Slider;


// const mapStateToProps = state => {
//   const { room } = state;
//   return {
//     room
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM"))
//   }
// }

//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Slider));
