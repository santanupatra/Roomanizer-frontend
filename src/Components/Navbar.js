import React,{useState} from 'react';
import './HomePage/style.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';


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
                <NavLink href="">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Community</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">How it Works</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Log In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Sign Up</NavLink>
              </NavItem>
      
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        // <div className="navigation">
        //   <Nav>
        //     <NavItem>
        //       <NavLink href="#">Home</NavLink>
        //     </NavItem>
        //     <NavItem>
        //       <NavLink href="#">Community</NavLink>
        //     </NavItem>
        //     <NavItem>
        //       <NavLink href="#">How it Works</NavLink>
        //     </NavItem>
        //     <NavItem>
        //       <NavLink href="#">Log In</NavLink>
        //     </NavItem>
        //     <NavItem>
        //       <NavLink href="#">Sign Up</NavLink>
        //     </NavItem>
        //   </Nav>
        // </div>
      );
    }
    
    export default Navbaar;