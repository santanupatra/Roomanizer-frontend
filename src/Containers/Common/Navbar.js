import React,{useState} from 'react';
import '../Pages/HomePage/style.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav, 
  NavItem, 
  NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbaar = (props) => {

  const [isView, setIsView] = useState(true);
  
  const tgl = () => setIsView(!isView);


  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
   
  const logout = () =>{
    localStorage.removeItem("access-token");
    localStorage.removeItem('userId')
    localStorage.removeItem('userType')
  }
  const userId = localStorage.getItem('userId')
  

      return (
        <div className="navigation">
        <Navbar light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
               <NavLink href="/home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/CmsDetails/community">Community</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/CmsDetails/How_it_works">How it Works</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Log In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signUp">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/AgentSignup">Agent</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      );
    
    }

    
    export default Navbaar;