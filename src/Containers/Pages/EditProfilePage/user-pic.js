import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';


const Userpic = (props) => {
    return (
            <div className="">

                  <div className="user-pic mt-5">
                      <img src={imagePath.userImage} alt="image"/>
                      <div class="upload-btn-wrapper">
                        <button><FontAwesomeIcon icon={faCamera} /></button>
                        <input type="file" name="myfile" />
                      </div>
                    </div>
                    <div class="thumbnail-file mt-4">
                        <button><h2 className="mb-0 mt-1">+ Add Thumbnail File </h2></button>
                        <p>Recomended resolution 800x500, 650x450</p>
                        <input type="file" name="myfile" />
                    </div>

             </div>
    );
  }
  
  export default Userpic;