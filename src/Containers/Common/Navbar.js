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
     localStorage.removeItem('userId')
  }
  const userId = localStorage.getItem('userId')
  

      return (
        <div className="navigation">
        <Navbar light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
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
              { //Check if message failed
          (localStorage.getItem('userId') === null)
          ? <NavLink href="/login">Log In</NavLink>
          : <NavLink href="/" onClick={logout}>Log Out</NavLink> 
      }
                {/* <NavLink href="/login">Log In</NavLink> */}
               

              </NavItem>
              <NavItem>
              { //Check if message failed
              (localStorage.getItem('userId') === null)
              ? <NavLink href="/signUp">Sign Up</NavLink>
              // :(isView===false)
              //   ?<NavLink href={`/viewProfile/${userId}`} onClick={tgl}>View Profile</NavLink>
                :<NavLink href={`/editProfile/${userId}`} /*onClick={tgl}*/>Edit Profile</NavLink>
              } 
                
              </NavItem>
      
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      );
    
    }

    
    export default Navbaar;