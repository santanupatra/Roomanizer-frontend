import React,{ useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Media } from 'reactstrap';
import { Row, Col} from 'reactstrap';
import firebase from 'firebase';
import {firebaseConfig} from '../../../shared/helpers';


const BASE_URL = 'http://111.93.169.90:5021';
const ChatLeft = (props) => {

const [chatList, setChatList] = useState([]);
const [userId,setuserId] = useState();

  if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
   var chatRef = firebase
      .database()
      .ref()
      .child('chatMessages');
      console.log('chatRef:', chatRef)
  } else {
    chatRef = firebase
      .database()
      .ref()
      .child('chatMessages');
    console.log('chatRef:', chatRef)
  }

  useEffect(() => {
    getChat()

  }, []);

  const getChat = () => {
    
    //loader: true;
      //let userId = localStorage.getItem('userId');
      let userId = "5ecf9765572989a18fd91d07";
      setuserId(userId)
      chatRef
        .orderByChild('date')
        .once('value')
        .then(snapShot => {
          if (snapShot.val()) {
            let chatList = [];
            let keys = Object.keys(snapShot.val())
            for (let key = keys.length-1; key >= 0; key--) {
            // for (let key in snapShot.val()) {
              let IsPresent = false;
              if (
                snapShot.val()[keys[key]].senderId == userId ||
                snapShot.val()[keys[key]].userId == userId
              ) {
                for (let i = 0; i < chatList.length; i++) {
                  if (
                    chatList[i].chatRoomId == snapShot.val()[keys[key]].chatRoomId
                  ) {
                    IsPresent = true;
                    break;
                  }
                }
                if (!IsPresent) {
                  chatList.push(snapShot.val()[keys[key]]);
                }
              }
            }
            setChatList(chatList)
            //   loader: false,
            
          } else {
            //loader: false;
          }
        })
        .catch(err => {
         // loader: false;
        });
    
  }

  const convertDate = date => {
    let axb = new Date(date).toDateString();
    return axb;
  };



    return (
      <>
      {chatList.length > 0 ? (
        chatList.map((item, key) => {
          return userId == item.senderId ? ( 
          <>
          <div className="p-4 border-bottom" key={key}>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3} className="">
                <div className="chatpic">
                  <img src={ BASE_URL + item.userImage} alt="image"/>
                  <div className="green-ball"></div>
                </div>
              </Col>
              <Col xs={9} sm={9} md={9} lg={9} className="d-flex justify-content-between pl-0">
                <div onClick={() => props.goToChat(
                                item.userId,
                                item.username,
                                item.userImage,
                                item.chatRoomId,
                                item.senderId
                              )
                            }>
                    <h6>{item.username}</h6>
                    <p>{item.Message}</p>
                </div>
                <div>
                  <h6>{convertDate(item.date)}</h6>
                  {/* {item.msgCount !== 0 ?
                  <span className="ch-green">{item.msgCount}</span> : ""} */}
                </div>
              </Col>
            </Row>
          </div>
          </>
          ) : 
          (
            <>
            <div className="p-4 border-bottom"  key={key}>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3} className="">
                <div className="chatpic">
                  <img src={BASE_URL + item.senderImage} alt="image"/>
                  <div className="green-ball"></div>
                </div>
              </Col>
              <Col xs={9} sm={9} md={9} lg={9} className="d-flex justify-content-between pl-0">
                <div onClick={() =>props.goToChat(
                                item.senderId,
                                item.senderName,
                                item.senderImage,
                                item.chatRoomId,
                                item.senderId
                              )
                            }>
                    <h6>{item.senderName}</h6>
                    <p>{item.Message}</p>
                </div>
                <div>
                  <h6>{convertDate(item.date)}</h6>
                  {item.msgCount !== 0 ?
                  <span className="ch-green">{item.msgCount}</span> : ""}
                </div>
              </Col>
            </Row>
          </div>
            </>
          )
        })
      ):
      (<div className="p-4 border-bottom">
        Sorry!No chat found.
      </div>)
    }
       </> 
    );
  }
  
  
  export default ChatLeft;
