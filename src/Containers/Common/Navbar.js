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
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
   
  const logout = () =>{
     localStorage.removeItem('userId')


  }
  

      return (
        <div className="navigation">
        <Navbar light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/CmsDetails/community">Community</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/CmsDetails/How_it_works">How it Works</NavLink>
              </NavItem>
              <NavItem>
              { //Check if message failed
          (localStorage.getItem('userId') === null)
          ? <NavLink href="/login">Log In</NavLink>
          : <NavLink href="/" onClick={logout}>Log Out</NavLink> 
      }
                {/* <NavLink href="/login">Log In</NavLink> */}
               

              </NavItem>
              <NavItem>
                <NavLink href="/signUP">Sign Up</NavLink>
              </NavItem>
      
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      );
    
    }

    
    export default Navbaar;