import React,{useState} from 'react';
import './style.css';
import imagePath from '../imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';


const Formsec = (props) => {
    return (
    
                <div className="left-box text-center">
                    <div className="profile-img mb-2">
                      <img src={imagePath.profileImage} alt="image"/>
                    </div>
                      <h2>Carls Jhons</h2>
                      <h6 className="mb-3">Mail  |  Age: 25</h6>
                            
                    <div>
                      <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                      </label>
                      <span className="mt-2 mb-5 d-flex justify-content-between">
                        <a href="#" className="toggle pr-3 text-right">I am looking for a room</a>
                        <a href="#" className="toggle border-right-0 pl-3 text-left">I have an available room</a>
                      </span>
                    </div>
                    <a href="#" className="login-bt mb-2">Messsage</a>
                    <div className="mt-3">
                      <a href="#" className="pr-2 pl-2"><img src={imagePath.fImage}/></a>
                      <a href="#" className="pr-2"><img src={imagePath.tImage}/></a>
                      <a href="#"><img src={imagePath.gImage}/></a>
                    </div>
                </div>
       
    );
  }
  
  export default Formsec;