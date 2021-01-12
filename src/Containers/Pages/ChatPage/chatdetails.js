import React,{Component, PureComponent} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col , Alert} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShareAlt, faPhone, faVideo, faEllipsisH, faEllipsisV, } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import firebase from 'firebase';
import {firebaseConfig,apiBaseUrl} from '../../../shared/helpers';

class Chatdetails extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          senderId: localStorage.getItem("userId"),
          senderName: '',
          senderImage: '',
          userId: this.props.goToChatDetails
            ? this.props.goToChatDetails.receiverid
            : '',
          username: this.props.goToChatDetails
            ? this.props.goToChatDetails.receivername
            : '',
          userImage: this.props.goToChatDetails
            ? this.props.goToChatDetails.receiverprofilePicture
            : '',
          chatRoomId: this.props.goToChatDetails
            ? this.props.goToChatDetails.chatRoomId
            : '',
          messageSender: this.props.goToChatDetails
            ? this.props.goToChatDetails.messageSender
            : '',
          uniqueKey: '',
          chatList: [],
          typeMessage: '',
          IsCustomerSender: true,
          loader: false,
        };
    
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
          this.state.chatRef = firebase
            .database()
            .ref()
            .child('chatMessages');
        } else {
          this.state.chatRef = firebase
            .database()
            .ref()
            .child('chatMessages');
        }
    
        this.state.chatRef.on('child_added', snapshot => {
          //console.warn('snapshot value',snapshot.val())
          const snapShotVal = snapshot.val();
          if (snapShotVal.chatRoomId == this.state.chatRoomId) {
            let chatList = this.state.chatList;
            const item = snapShotVal;
            chatList.push(item);
            this.setState({typeMessage: '', chatList: chatList});
          }
          setTimeout(() => {
            if (this.refs && this.refs.scrollView) {
              this.refs.scrollView.scrollToEnd(true);
            }
          }, 400);
        });
      }

    async componentDidMount() {
      console.log("key++++++",this.state.uniqueKey)
      
       await this.getStorageValue();
        // if (this.state.senderId != this.state.messageSender) {
        //   this.state.chatRef.child(this.state.uniqueKey).update({msgCount: 0});
        // }
        this.getStorageValue();
      }
    async componentDidUpdate(prevProps, prevState){
        console.log("prevState==",prevState)
        if(this.state.uniqueKey != prevState.uniqueKey){
          await this.getStorageValue();
              if (this.state.senderId != this.state.messageSender) {
                console.log('asmita');
                this.state.chatRef.child(this.state.uniqueKey).update({msgCount: 0});
              }
              this.getStorageValue();
        }
      }

      UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
         
          this.setState({userId: nextProps.goToChatDetails
            ? nextProps.goToChatDetails.receiverid
            : '',
          username: nextProps.goToChatDetails
            ? nextProps.goToChatDetails.receivername
            : '',
          userImage: nextProps.goToChatDetails
            ? nextProps.goToChatDetails.receiverprofilePicture
            : '',
          chatRoomId: nextProps.goToChatDetails
            ? nextProps.goToChatDetails.chatRoomId
            : '',
          messageSender: nextProps.goToChatDetails
            ? nextProps.goToChatDetails.messageSender
            : ''},()=>{this.getStorageValue();})   // <- this is setState equivalent
            
        }
      
      }

      getStorageValue = () => {
        //localStorage.getItem("profileImg")
        //localStorage.getItem("username")
        //localStorage.getItem("userId")
        this.setState({
          senderId: localStorage.getItem("userId"),
          senderImage: localStorage.getItem("profileImg"),
          senderName: localStorage.getItem("username"),
          //chatRoomId: roomId,
          chatList: this.state.chatList,
        });
        //console.warn('chatroomId:',this.state.chatRoomId);
    
        this.state.chatRef
          .orderByChild('chatRoomId')
          .equalTo(this.state.chatRoomId)
          .once('value')
          .then(snapshot => {
            console.log("snapshot++++",snapshot.val());
            if (snapshot.val()) {
              var listMesage = [];
              var unique = '';
              for (let key in snapshot.val()) {
                console.log("key",key)
                listMesage.push(snapshot.val()[key]);
                unique = key;
              }
              this.setState({
                chatList: listMesage,
                uniqueKey: unique,
                //loader: false,
              });
            }
          })
          .catch(Err => {
            this.setState({
              loader: false,
            });
          });
      };
    
      sendMessage = () => {
        console.log('sendMessage', this.state);
        const nowDate = Date.now();
        if (this.state.typeMessage && this.state.typeMessage.trim()) {
          this.state.chatRef.push({
            senderId: this.state.senderId,
            senderName: this.state.senderName,
            senderImage: this.state.senderImage,
            Message: this.state.typeMessage,
            userId: this.state.userId,
            username: this.state.username,
            userImage: this.state.userImage,
            chatRoomId: this.state.chatRoomId,
            date: nowDate,
            msgCount: this.state.chatList[this.state.chatList.length - 1]
              ? this.state.chatList[this.state.chatList.length - 1].msgCount + 1
              : 1,
          });
          
        } else {
          alert('Plesae type message to send.');
        }
      };
      convertDate = date => {
        let axb = new Date(date).toDateString();
        return axb;
      };

    render() {
      const BASE_URL = apiBaseUrl;
    return (
       
                            <Col xs={12} sm={12} md={12} lg={7} className="pl-0 chat-main-body position-relative">
                              <div className="px-4 py-3 border-bottom">
                                <Row>
                                  <Col sm={12} className="">
                                    <div className="d-flex align-items-center">
                                    <div className="chatpic">
                                      <img src={BASE_URL+this.state.userImage} alt="image"/>
                                      <div className="green-ball"></div>                                     
                                    </div>
                                    <span className="d-block ml-2">{this.state.username}</span>
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="light-bg chat-list-body">
                                <Scrollbars style={{height:480,width:"100%"}}>
                              {this.state.chatList.map((data, key) =>
                              data.senderId == this.state.senderId ? (
                                
                                  <div className="innerChatBody">
                                  <div className="p-4 d-flex justify-content-end w-100">

                                    <div className="greybox">
                                    <div className="grey-shape"></div>
                                    <h6>{data.Message}</h6>
                                    <p className="chatdate">{this.convertDate(data.date)}</p>
                                    </div>

                                    </div>
                                  </div>
                                
                              ) : <div className="p-4 d-flex justify-content-start w-100">

                              <div className="whitebox">
                                <div className="white-shape"></div>
                                <h6>{data.Message}</h6>
                                <p className="chatdate">{this.convertDate(data.date)}</p>
                              </div>
                  
                            </div>)}


                            </Scrollbars>
                                  <div className="chatfooter">
                                    <FormGroup className="chat-fl">
                                      <Input type="textarea" onChange={e => this.setState({typeMessage: e.target.value})}
            value={this.state.typeMessage}  name="text" id="exampleText" />
                                        {/* <a href="#" className="attach"><img src={imagePath.attachImage} alt="image"/></a> */}
                                        <button onClick={this.sendMessage} className="chat-bt"><img src={imagePath.chatbtImage} alt="image"/></button>
                                    </FormGroup>
                                  </div>
                                
                                  
                              </div>

                            </Col>
                        
    )
                              }
  
}


export default Chatdetails;
