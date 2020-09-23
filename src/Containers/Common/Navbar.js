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
                <NavLink href="https://github.com/reactstrap/reactstrap">Community</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">How it Works</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Log In</NavLink>
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