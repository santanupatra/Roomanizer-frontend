import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, CustomInput, } from 'reactstrap';


const Roompic = (props) => {
    return (
                <div className="">

                    <div className="user-pic mt-5">
                      <img src={imagePath.slider3Image} alt="image"/>
                      <div class="upload-btn-wrapper">
                        <button><FontAwesomeIcon icon={faCamera} /></button>
                        <input type="file" name="myfile" />
                      </div>
                    </div>
                    <FormGroup className="mb-5 th">
                      <Label for="exampleCustomFileBrowser">Add Room Images</Label>
                      <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Pick a file!" />
                    </FormGroup>
                    <div class="thumbnail-file mt-4">
                        <button><h2 className="mb-0 mt-1">+ Add Thumbnail File </h2></button>
                        <p>Recomended resolution 800x500, 650x450</p>
                        <input type="file" name="myfile" />
                    </div>        
                </div>
    );
  }
  
  export default Roompic;