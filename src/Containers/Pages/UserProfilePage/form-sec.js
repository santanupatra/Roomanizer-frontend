import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import Facebook from '../facebook';
import Twitter from '../twitter';
import Gsuite from '../gSuite';
import Email from '../email';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { USER_URL } from '../../../shared/allApiUrl';
//import { getImageUrl } from '../../../hared/helpers';
import moment from 'moment'
import { NavLink, withRouter ,useHistory} from 'react-router-dom';
import {getImageUrl,firebaseConfig} from '../../../shared/helpers'
import firebase from 'firebase';
import { Button, Modal } from 'react-bootstrap';
import { Form, FormGroup, Input,Alert, Col} from 'reactstrap';
import { useForm } from "react-hook-form";



const FormSec = (props) => {
console.log(props.user.user)
const initialFields = {
      aboutMe: " ",
      createdDate: " ",
      dateOfBirth: " ",
      email: " ",
      firstName: " ",
      gender: " ",
      houseRules: [],
      lastLogin: " ",
      lastName: " ",
      //location: {type: "Point", coordinates: Array(0)}
      maxBudget: " ",
      profilePicture: " ",
      readyToMove: " ",
      userType: " ",
      occupation:" ",
      age:" ",
      facebookLink:'',
      twitterLink:'',
      gsuiteLink:'',
      email:''
  }
  
  // localStorage.getItem('profileImg');
  //           localStorage.getItem('username');
  //           localStorage.getItem('userId');
  console.log(" props.match.params------", localStorage.getItem('profileImg'),'name==',localStorage.getItem('username'),'userId==',localStorage.getItem('userId'))
    //const params = props.match.params;
  let userId = props.match.params.userId;
  // const userData = props.user.user;
  const { handleSubmit, register } = useForm();

  const [fields, setFields] = useState(initialFields);
  const [userData, setUserDate] = useState(null);
  const [settingId, setSettingId] = useState(null);
  const [userType, setUserType] = useState({'userType':localStorage.getItem('userType')});
  const [typeMessage,setTypeMessage]= useState('');
  const [chatList,setChatList] = useState([]);
  const [msgCount,setMsgCount] = useState();
  const [uniqueKey,setUniqueKey] =useState();
  const [chatRoomId,setChatRoomId] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleModal = () => setShow(true);
  const history = useHistory();

  let chatRef = null;
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
       chatRef = firebase
         .database()
         .ref()
         .child('chatMessages');
     } else {
      chatRef = firebase
         .database()
         .ref()
         .child('chatMessages');
      
     }
  useEffect(() => {
    props.crudActionCall(`${USER_URL}/${userId}`, null, "GET")
    //setUserDate(props.user.action.data);
  },[userId]);
  const handleChnage =(e)=>{
    if(e.target.checked==true){
       localStorage.setItem('userType','landlord')
       setUserType({userType:'landlord'});
       props.crudActionCall(`${USER_URL}` + `/${userId}`, {'userType':'landlord'}, "UPDATE");

    }else{
      localStorage.setItem('userType','customer')
      setUserType({userType:'customer'});
      props.crudActionCall(`${USER_URL}` + `/${userId}`, {'userType':'customer'}, "UPDATE");

    }
  }
  let checked;
  if(fields.userType ==='customer'){
   checked=false;
  }else if(fields.userType ==='landlord'){
   checked=true;
  }

  useEffect(() => {
    const action = props.user.user;

    if (props.user.user) {
      setFields({ ...fields, ...props.user.user });
     setSettingId(props.user.user._id);
     
    }
     getChat()

  }, [props.user]);
   
  useEffect(() => {
    console.log('abvr',chatRoomId)
    if(chatRoomId != undefined){
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
          setChatList(listMesage)
          setUniqueKey(unique)
        }
      })
      .catch(Err => {
        this.setState({
          loader: false,
        });
      });
    }
    

  }, [chatRoomId]);
   const getChat = async()=>{
     let roomId;
    await chatRef.on('child_added', snapshot => {
      const snapShotVal = snapshot.val();
      
      if (
        (snapShotVal.userId == localStorage.getItem('userId') &&
          snapShotVal.senderId == userId) ||
        (snapShotVal.senderId == localStorage.getItem('userId') &&
          snapShotVal.userId == userId)
      ) {
       
         setChatRoomId(snapShotVal.chatRoomId);
         roomId = snapShotVal.chatRoomId;
      }
    });
  }

  const sendMessage = (e) => {
   e.preventDefault()
    const nowDate = Date.now();
    if (typeMessage && typeMessage.trim()) {
        chatRef.push({
        senderId: localStorage.getItem('userId'),
        senderName: localStorage.getItem('username'),
        senderImage: localStorage.getItem('profileImg'),
        Message: typeMessage,
        userId: fields._id,
        username: fields.firstName,
        userImage: fields.profilePicture,
        chatRoomId: chatRoomId
          ? chatRoomId
          : localStorage.getItem('userId') + '_' + fields._id,
        date: nowDate,
        msgCount: chatList[chatList.length - 1]
        ? chatList[chatList.length - 1].msgCount + 1
        : 1,
      });
      //console.log("receiverId",fields._id);
      //console.log("token",this.props.details.token);
     
      setShow(false);
      history.push('/chat');

    } else {
      alert('Plesae type message to send.');
    }
  };
   
    return (
    
                <div className="left-box text-center">
                    <div className="profile-img mb-2">
                      {/* <img src={fields.profilePicture} alt="image"/> */}
                     {fields.profilePicture?<img src={getImageUrl(fields.profilePicture)} className="img-avatar" alt="admin" />
                     :<img src={imagePath.noImage} className="img-avatar" alt="admin" />}
                     
                    </div>
                      <h2>{fields.firstName + ' ' + fields.lastName}</h2>
                       <h6 className="mb-3">{fields.gender?fields.gender:''}  |  Age: {fields.age}</h6>
                            
                    <div>
                      <label class="switch">
                      <input type="checkbox" name="userType" value={fields.userType} onClick={handleChnage} defaultChecked={checked}/>
                        <span class="slider round"></span>
                      </label>
                      <span className="mt-2 mb-5 d-md-flex d-lg-flex justify-content-between">
                        <NavLink to="#" className="toggle pr-3">I am looking for a room</NavLink>
                        <NavLink to="#" className="toggle border-right-0 pl-3">I have an available room</NavLink>
                      </span>
                    </div>
                    
                    <button onClick={handleModal} className="login-bt mb-2">Messsage</button>
                    <div className="mt-3 d-flex align-items-center justify-content-center">
                    {fields.facebookLink?<a href= {fields.facebookLink} target="_blank"><Facebook></Facebook></a>:""}
                    {fields.twitterLink?<a href= {fields.twitterLink} target="_blank">  <Twitter></Twitter></a>:""}
                    {fields.gsuiteLink?<a href= {fields.gsuiteLink} target="_blank">  <Gsuite></Gsuite></a>:""}
                    {/* <a href={`mailto:${fields.email}`} target="_blank">  <Email></Email></a> */}
                     {/* <a class="btn btn-primay" href={`mailto:${val.email}`}>Reply</a> */}
                      {/* <Facebook></Facebook> */}
                      {/* <Twitter></Twitter> */}
                      {/* <Gsuite></Gsuite>
                      <Email></Email> */}
                    </div>
                    <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Type Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form >
                    <FormGroup row>
                      <Col sm={12}>
                      <Input type="textarea" 
                             value={typeMessage}
                             name="text" 
                             id="exampleText" 
                             onChange={e => setTypeMessage(e.target.value)}
                        />          
                      <button onClick={sendMessage} className="chat-bt"><img src={imagePath.chatbtImage} alt="image" style={{width:'40px', marginRight:'10px'}} /></button>
                       
                        {/* <Button type="button" onClick={handleSubmit(onSubmit)} color="primary" className="login-bt mb-2">Send</Button> */}
                        
                      </Col>
                    </FormGroup>
                  </Form>
                </Modal.Body>
              </Modal>
                </div>
                
                
       
    );
  }
  const mapStateToProps = state => {
    const { user } = state;
    return {
      user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER"))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormSec));





  //export default Formsec;