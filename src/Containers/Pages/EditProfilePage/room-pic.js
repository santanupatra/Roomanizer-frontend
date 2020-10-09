import React,{useState,useEffect} from 'react';
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
import {USER_URL} from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getImageUrl} from '../../../shared/helpers';


const Roompic = (props) => {
 // console.log(props.user.user._id)
  const [userImage,setUserImage] = useState(null)
  const [userDetails,setUserDetails] = useState()
 
  useEffect(() => {
    setUserDetails(props.user.user)
    if(props.user && props.user.user)
    localStorage.setItem('roomImg', props.user.user.roomPicture);

    return () => {
      // cleanup
    }
  }, [props.user.user,props.userId])
  let imageUpload = React.createRef();
  const uploadHandler = e => {
    imageUpload.current.click();
  };
  var formData = new FormData();
  const handleFileChange = async(event) => {
    console.log(event.target.files[0])
    const file = event.target.files[0];
    formData.append('roomPicture',file)
    console.log(file)
    if(file){
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = e => {
        setUserImage(e.target.result);
      };
     console.log(formData)
     console.log(props.userId)

      if(props.userId){
        props.crudActionCall(`${USER_URL}/profilePicture/${props.userId}`, formData, "UPDATE")

      }
      //setDropdownOpen(false)
    }
  }
    return (
                <div className="">

                    <div className="user-pic mt-5">
                      {/* <img src={imagePath.slider3Image} alt="image"/> */}
                      <img src={userImage?userImage:getImageUrl(userDetails?userDetails.roomPicture:imagePath.slider3Image)} alt="image"/>
                      <div class="upload-btn-wrapper">
                        {/* <button><FontAwesomeIcon icon={faCamera} /></button> */}
                        <button><FontAwesomeIcon icon={faCamera} onClick={uploadHandler}/></button>
                        {/* <input type="file" name="myfile" /> */}
                        <input
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e)}
                          id="favicon"
                          type='file'
                          accept='.png, .jpg, .jpeg'
                          name='favicon'
                          ref={imageUpload}
                       />
                      </div>
                    </div>
                    <FormGroup className="mb-5 th">
                      <Label for="exampleCustomFileBrowser">Add Room Images</Label>
                      <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Pick a file!" />
                    </FormGroup>
                    {/* <div class="thumbnail-file mt-4">
                        <button><h2 className="mb-0 mt-1">+ Add Thumbnail File </h2></button>
                        <p>Recomended resolution 800x500, 650x450</p>
                        <input type="file" name="myfile" />
                    </div>         */}
                </div>
    );
  }
  const mapStateToProps = state => {
    const { user } = state;
    return {
      user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
      resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Roompic));
  
 // export default Roompic;