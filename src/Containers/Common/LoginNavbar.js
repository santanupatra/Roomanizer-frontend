import React,{useState} from 'react';
import '../Pages/HomePage/style.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import imagePath from '../../Config/imageConstants';
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from '../../history';
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

const LoginNavbaar = (props) => {
  const history = useHistory();
  const [isView, setIsView] = useState(true);
  
  const tgl = () => setIsView(!isView);

  const [isOpen, setIsOpen] = useState(false);

   
  
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
  const userId = localStorage.getItem('userId')

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);


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
                <NavLink>
                  <FontAwesomeIcon color="white" icon={faEnvelope} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <FontAwesomeIcon color="white" icon={faBell} />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="border-0 pr-0">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret className="login-hd">
                      <img src={imagePath.loginpicImage} href="/" alt="image"/>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>My Account</DropdownItem>
                      <DropdownItem header>My Favorites</DropdownItem>
                      <DropdownItem header>My Messages</DropdownItem>
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

    
    export default LoginNavbaar;