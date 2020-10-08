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
import {getImageUrl} from '../../shared/helpers'

const LoginNavbaar = (props) => {
  const history = useHistory();
  const [isView, setIsView] = useState(true);
  const [fields, setFields] = useState();
  const [pImage,setPImage] = useState(localStorage.getItem('profileImg'));
  console.log('imafe',localStorage.getItem('profileImg'));
  const tgl = () => setIsView(!isView);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

   
  useEffect(() => {
    if (props.user.user) {
      setFields({...fields,...props.user.user})
    }
}, [props.user]);

  const logout = () =>{
    localStorage.removeItem("access-token");
    // this.setState({
    //     Authtoken: '',
    //   });
      toast.info("Sucessfully logout", {
        position: toast.POSITION.TOP_LEFT
        });
          
    history.push('/')
} 
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
                :<NavLink href={`/home/${userId}`}>Home</NavLink>
                }
              </NavItem>
              <NavItem>
                <NavLink href="/CmsDetails/community">Community</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/CmsDetails/How_it_works">How it Works</NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-icon">
                  <FontAwesomeIcon color="white" icon={faEnvelope} />
                  <div className="blink">8</div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <FontAwesomeIcon color="white" icon={faBell} />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="border-0 pr-0">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle1}>
                    <DropdownToggle caret className="login-hd">
                      <img src={getImageUrl(fields && fields?fields.profilePicture:pImage)} href="/" alt="image"/>
                    </DropdownToggle>
                    <DropdownMenu>
                      {/* <Link to={`/editProfile/${userId}`} > <DropdownItem header>My Account</DropdownItem></Link>  */}
                      <DropdownItem header><Link to={`/viewProfile/${userId}`} className ='dark'> My Account</Link></DropdownItem>
                      {/* <a href={`/changePassword/${userId}`}  onClick={change2}> <DropdownItem header>Settings</DropdownItem></a>    */}
                      <DropdownItem header><Link to={`/changePassword/${userId}`} className ='dark'> Settings</Link></DropdownItem>
                      
                      <DropdownItem header>My Favorites</DropdownItem>
                      <a href="#"><DropdownItem header>My Messages</DropdownItem></a>
                      <a href="#"><DropdownItem header>Notifications</DropdownItem></a>
                      <a href="#" onClick={logout}><DropdownItem header  >Logout</DropdownItem></a>
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