import React,{useState, useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col , Alert} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShareAlt, faPhone, faVideo, faEllipsisH, faEllipsisV, } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Header from '../../Common/header';
import ChatLeft from './chatleft';
import ChatboxDark from'./chat-box-dark';
import ChatBoxLight from'./chat-box-light';
import Chatdetails from './chatdetails';
import Footer from '../../Common/footer';
import firebase from 'firebase';
import {firebaseConfig} from '../../../shared/helpers';


const Home =(props)=>{

  const [data,setData] = useState();
  const [childShow,setchildShow] = useState(false)
  
 /* const [chatList, setChatList] = useState([]);
  const [typeMessage, setTypeMessage] = useState("");
  const [chatRoomId, setChatRoomId]= useState("");
  const [uniqueKey, setUniqueKey] = useState("");

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");

  const [senderId, setSenderId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderImage, setSenderImage] = useState("");
 

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

   chatRef.on('child_added', snapshot => {
    const snapShotVal = snapshot.val();
    if (snapShotVal.chatRoomId == chatRoomId) {
      let chatList1 = chatList;
      const item = snapShotVal;
      chatList1.push(item);
      setTypeMessage("")
      setChatList(chatList1)
    }
    // setTimeout(() => {
    //   if (refs && refs.scrollView) {
    //     refs.scrollView.scrollToEnd(true);
    //   }
    // }, 400);
  });

 const goToChat = async (receiverid,receivername,receiverprofilePicture,chatRoomId,messageSender) => {
  setChatRoomId(chatRoomId);
  setUserId(receiverid);
  setUsername(receivername);
  setUserImage(receiverprofilePicture)
  await getStorageValue()
  }

  

  const getStorageValue = () => {
    //let userdata = props.user.user;
    // this.setState({
    //   senderId: userdata._id,
    //   senderImage: userdata.profilePicture,
    //   senderName: userdata.username,
    //   chatList: chatList,
    // });
    //setSenderId(localStorage.getItem('userId'))
    //setUserImage(localStorage.getItem('profileImg'))
    setSenderImage("/userImage/profilePicture-1594301815811-image-fb002436-8479-41a6-a631-e9a7d07b8513.jpg");
    setSenderName("Spandanuser")
    setSenderId("5ecf9765572989a18fd91d07")
    setChatList(chatList);
    chatRef
      .orderByChild('chatRoomId')
      .equalTo(chatRoomId)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          var listMesage = [];
          var unique = '';
          for (let key in snapshot.val()) {
            listMesage.push(snapshot.val()[key]);
            unique = key;
          }
          setChatList(listMesage);
          setUniqueKey(unique)
        }
      })
      .catch(Err => {
          //loader: false,
      });
  };

 const sendMessage = () => {
   // console.log('sendMessage', this.state);
    const nowDate = Date.now();
    if (typeMessage && typeMessage.trim()) {
      chatRef.push({
        senderId: senderId,
        senderName: senderName,
        senderImage: senderImage,
        Message: typeMessage,
        userId: userId,
        username: username,
        userImage: userImage,
        chatRoomId: chatRoomId,
        date: nowDate,
        msgCount: chatList[chatList.length - 1]
          ? chatList[chatList.length - 1].msgCount + 1
          : 1,
      });
     
    } else {
      Alert.alert('', 'Plesae type message to send.');
    }
  };

  const convertDate = date => {
    let axb = new Date(date).toDateString();
    return axb;
  };*/

  const goToChat = async (receiverid,receivername,receiverprofilePicture,chatRoomId,messageSender) => {
        let data1 = {"receiverid": receiverid,"receivername":receivername,
        "receiverprofilePicture":receiverprofilePicture,"chatRoomId":chatRoomId,
        "messageSender":messageSender}
        //debugger
        setData(data1)
        setchildShow(true)
        console.log("ddddddddddddd0",data)
    }

    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">  
                        <div className= "">
                          <Row>
                            <Col xs={12} sm={12} md={12} lg={5} className="border-right pr-0">
                                <div className="px-4 py-3 border-bottom">
                                  <h3 className="mt-4 mb-0">Chats</h3>
                                </div>

                                <div className="px-4 py-4 border-bottom chat">
                                  <FormGroup className="mb-0">
                                    <Input type="email" name="email" id="exampleEmail" className="search" placeholder="search" />
                                  </FormGroup>
                                </div>

                                <div className="chat-scrool">
                                  <ChatLeft goToChat ={goToChat}></ChatLeft>
                                  
                                </div>

                            </Col>
                            {data ? <Chatdetails goToChatDetails ={data}></Chatdetails>: ""}
                            {/* <Col xs={12} sm={12} md={12} lg={7} className="pl-0">
                              <div className="px-4 py-3 border-bottom">
                                <Row>
                                  <Col sm={2} className="">
                                    <div className="chatpic">
                                      <img src={imagePath.chatpicImage} alt="image"/>
                                      <div className="green-ball"></div>
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="light-bg">

                                <Row>
                                  <Col>
                                    <ChatboxDark></ChatboxDark>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col sm={2}>
                                    <div className="chat-per pt-4 pl-4">
                                      <img src={imagePath.loginpicImage} alt="image"/>
                                    </div>
                                  </Col>
                                  <Col sm={10}>
                                    <ChatBoxLight></ChatBoxLight>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm={2}>
                                   
                                  </Col>
                                  <Col sm={10}>
                                    <ChatBoxLight></ChatBoxLight>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>
                                    <ChatboxDark></ChatboxDark>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>
                                    <FormGroup className="chat-fl">
                                      <Input type="textarea" onChangeText={text => setTypeMessage(text)} value={typeMessage} name="text" id="exampleText" />
                                        <a href="#" className="attach"><img src={imagePath.attachImage} alt="image"/></a>
                                        <a onPress={sendMessage} className="chat-bt"><img src={imagePath.chatbtImage} alt="image"/></a>
                                    </FormGroup>
                                  </Col>
                                </Row>

                              </div>

                            </Col> */}
                          </Row>
                        </div>
                        
                      </div>
                  </Col>
                </Row>

              </Container>
            </div>
        </div>
      <Footer></Footer>
      </div>
    )
  
}


export default Home;
