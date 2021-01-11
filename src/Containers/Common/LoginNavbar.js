import React,{useState,useEffect} from 'react';
import '../Pages/HomePage/style.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import imagePath from '../../Config/imageConstants';
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell, } from "@fortawesome/free-regular-svg-icons";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav, 
  NavItem, 
   NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { white } from 'color-name';
import {getImageUrl,firebaseConfig} from '../../shared/helpers'

import firebase from 'firebase';
const LoginNavbaar = (props) => {
  const history = useHistory();
  const [isView, setIsView] = useState(true);
  const [fields, setFields] = useState();
  const [msgCountData, setMsgCountData] = useState(0);
  //const [userId, setUserd] = useState();
  const profileImg = localStorage.getItem('profileImg');
  console.log('imafe',localStorage.getItem('profileImg'));
  const tgl = () => setIsView(!isView);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
    if (props.user.user) {
      setFields({...fields,...props.user.user})

    }
    console.log("props.user.user========",props.user.user)
    if (props.user.user) {
      let userId = props.user.user._id;
      let UserDetails = props.user.user;
     // setUserd(props.user.user._id);
        chatRef
        .orderByChild('date')
        .once('value')
        .then(snapShot => {
            
          if (snapShot.val()) {
            let chatList = [];
            let msgCount=0;
            let keys = Object.keys(snapShot.val())
            console.log("keys==",keys)
            for (let key = keys.length-1; key >= 0; key--) {
              let IsPresent = false;
              //console.log("snapShot.val()[keys[key]].senderId",snapShot.val()[keys[key]].senderId,"userId==",userId)
              if (
                snapShot.val()[keys[key]].senderId == userId ||
                snapShot.val()[keys[key]].userId == userId
              ) {
               // console.log("hu")
                for (let i = 0; i < chatList.length; i++) {
                  if (
                    chatList[i].chatRoomId == snapShot.val()[keys[key]].chatRoomId
                  ) {
                    IsPresent = true;
                    break;
                  }
                }
                if (!IsPresent) {
                  //console.log("nothu")

                  chatList.push(snapShot.val()[keys[key]]);
                  //console.log("snapShot.val()[keys[key]]",snapShot.val()[keys[key]])
                }
              }
            }
            console.log("chatList==",chatList)

            if(chatList && chatList.length>= 0){
              //console.log('ji',userId)
                for(let i=0; i<chatList.length; i++){
                    if(chatList[i].senderId != userId){
                      console.log("senderId==",chatList[i].senderId,"tyuio",userId)

                      msgCount = msgCount + chatList[i].msgCount
                    }
                }
            }
            console.log("msgcount in sidebar",msgCount);
            setMsgCountData(msgCount)
          } 
        })
        .catch(err => {
        });
    } 

}, [props.user]);

  const logout = () =>{
    localStorage.removeItem("access-token");
    localStorage.removeItem('userId')
    // this.setState({
    //     Authtoken: '',
    //   });
      toast.info("Sucessfully logout", {
        position: toast.POSITION.TOP_LEFT
        });
          
    history.push('/')
} 

// componentFocused = () => {
//   // console.log("this.props.details sidebar",this.props.details);
   
//      if (props.user.user) {
//        let userId = props.user.user._id;
//        let UserDetails = props.user.user;
//       // setUserd(props.user.user._id);
//          chatRef
//          .orderByChild('date')
//          .once('value')
//          .then(snapShot => {
             
//            if (snapShot.val()) {
//              let chatList = [];
//              let msgCountData=0;
//              let keys = Object.keys(snapShot.val())
//              for (let key = keys.length-1; key >= 0; key--) {
//                let IsPresent = false;
//                if (
//                  snapShot.val()[keys[key]].senderId == UserDetails.userId ||
//                  snapShot.val()[keys[key]].userId == UserDetails.userId
//                ) {
//                  for (let i = 0; i < chatList.length; i++) {
//                    if (
//                      chatList[i].chatRoomId == snapShot.val()[keys[key]].chatRoomId
//                    ) {
//                      IsPresent = true;
//                      break;
//                    }
//                  }
//                  if (!IsPresent) {
//                    chatList.push(snapShot.val()[keys[key]]);
//                  }
//                }
//              }
//              if(chatList && chatList.length>= 0){
//                  for(let i=0; i<chatList.length; i++){
//                      if(chatList[i].senderId != userId){
//                       msgCountData = msgCountData + chatList[i].msgCountData
//                      }
//                  }
//              }
//              console.log("msgcount in sidebar",msgCountData);
//              setMsgCount(msgCountData)
//            } 
//          })
//          .catch(err => {
//          });
//      } 
//    }

// const change = () =>{
//   history.push(`/editProfile/${userId}`)
// } 
// const change2 = () =>{
//   history.push(`/changePassword/${userId}`)
// } 
  const userId = localStorage.getItem('userId')

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle1 = () => setDropdownOpen(prevState => !prevState);


      return (
        <div className="navigation">
        <Navbar light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {
                (localStorage.getItem('userId') === null)
                ?<NavLink href="/home">Home</NavLink>
                :<NavLink href="/home">Home</NavLink>
                // <NavLink href={`/home/${userId}`}>Home</NavLink>
                }
              </NavItem>
              <NavItem>
                <NavLink href="/CmsDetails/community">Community</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/CmsDetails/How_it_works">How it Works</NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-icon" href="/chat">
                  <FontAwesomeIcon color="white" icon={faEnvelope} />
                  <div className="blink">{msgCountData}</div>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink>
                  <FontAwesomeIcon color="white" icon={faBell} />
                </NavLink>
              </NavItem> */}

              <NavItem>
                <NavLink className="border-0 pr-0">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle1}>
                    <DropdownToggle caret className="login-hd">
                      <img src={getImageUrl(profileImg)} href="/" alt="image"/>
                    </DropdownToggle>
                    <DropdownMenu>
                      <Link to={`/editProfile/${userId}`}>My Account</Link>
                      <Link to={`/changePassword/${userId}`}>Settings</Link>
                      <Link to={`/favoriteroom/${userId}`}>My Favorites Room </Link>
                      <Link to={`/favoriteroomate/${userId}`}>My Favorites Roommate</Link>
                      {/* <Link to="#">My Favorites</Link> */}
                      <Link to="/chat">My Messages</Link>
                      {/* <Link to="#">Notifications</Link> */}
                      <Link to="#" onClick={logout}>Logout</Link>
                    </DropdownMenu>
                  </Dropdown> 
                </NavLink>             
              </NavItem>
      
            </Nav>
          </Collapse>
        </Navbar>
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
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
        resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
      }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginNavbaar));
    //export default LoginNavbaar;