import React,{useState} from 'react';
import '../Pages/HomePage/style.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import imagePath from '../../Config/imageConstants';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
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

  

  const [isView, setIsView] = useState(true);
  
  const tgl = () => setIsView(!isView);

  const [isOpen, setIsOpen] = useState(false);

   
  const logout = () =>{
    //console.log("atimmm")
     localStorage.removeItem('userId')
     localStorage.removeItem('access-token')
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
                      <DropdownItem header>Notifications</DropdownItem>
                      <DropdownItem header  onClick={logout}>Logout</DropdownItem>
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