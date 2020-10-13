import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, CustomInput, FormText } from 'reactstrap';
import {USER_URL,LANDLORD_URL} from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getImageUrl} from '../../../shared/helpers';
import {axiosApiCall} from '../../../api/index'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Roompic = (props) => {
  const [userImage,setUserImage] = useState(null)
  const [userDetails,setUserDetails] = useState()
  const [roomDetails,setRoomDetails] = useState()
  const [RoomImage, updateRoomImage] = useState([]);
  const [RoomImageFile, updateRoomImageFile] = useState([]);
  //import { useHistory } from "react-router";

  console.log("userImage====",userImage)
  console.log("userImage====",userImage)
 
  useEffect(() => {
    

    setUserDetails(props.user.user)
   
    if(props.user && props.user.user)
    localStorage.setItem('profileImg', props.user.user.profilePicture);

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
    const file = event.target.files[0];
    formData.append('profilePicture',file)
    if(file){
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = e => {
        setUserImage(e.target.result);
      };

      if(props.userId){
        props.crudActionCall(`${USER_URL}/profilePicture/${props.userId}`, formData, "UPDATE")

      }
      
    }
  }
  /**Multiple Image Delete */
  const handleFileDelete = (key )=>{
    //e.preventDefault()
    const findArr = RoomImage.splice(key,1);
    const propertyImageFileNew = RoomImageFile.splice(key,1);
  }
  /**Multiple Image Upload */
  let fileData = [];
  const handlemultipleFileChange = e => {
      const files = Array.from(e.target.files);
      Promise.all(files.map(file => {
        fileData.push(file);
        updateRoomImageFile(fileData);
        return (new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', (ev) => {
                resolve(ev.target.result);
            });
            reader.addEventListener('error', reject);
            reader.readAsDataURL(file);
        }));
    }))
    .then(images => {
      console.log("images==",images)
      console.log("RoomImageFile==",RoomImageFile)
        /* Once all promises are resolved, update state with image URI array */
        updateRoomImage(images)
       

    }, error => {        
        console.error(error);
    });
    
  };
  console.log("RoomImageFile258==",RoomImageFile)
  
  const roomImageUploadApi = async()=>{
    console.log('hii',RoomImageFile);
      let sendData = new FormData();
      for (let i = 0; i < RoomImageFile.length; i++) {
        sendData.append('roomImage', RoomImageFile[i]);
      }
      let  {data}  = await axiosApiCall.put(`${LANDLORD_URL}/roomImage/${props.userId}`, sendData,
      {
        header:{
        'Content-Type': 'multipart/form-data'
  
      }
    });
                // set token in localStorage
                const details = data.msg;
                console.log("history===",data)
                if(data.ack===true){
                  let  {data}  = await axiosApiCall.get(`${LANDLORD_URL}/${props.userId}`, null);
                  //props.history.push({pathname: `/home`});
                    let roomDetailsStore = localStorage.setItem('roomDetails',JSON.stringify(data.data))
                    setRoomDetails(JSON.parse(roomDetailsStore))
                    updateRoomImage(null)
                    toast.info(details, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else{
                    toast.error(details, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
    
  }
console.log("roomDetails===",roomDetails)
    return (
                <div className="">

                    <div className="user-pic mt-5">
                      {/* <img src={imagePath.slider3Image} alt="image"/> */}
                      <img src={userImage?userImage:getImageUrl(userDetails?userDetails.profilePicture:imagePath.slider3Image)} alt="image"/>
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
                    <div>
                      {
                          roomDetails && roomDetails.roomImage && roomDetails.roomImage.length >0 &&
                          roomDetails.roomImage.map((value ,key) => {
                          console.log("value",value)
                            return (
                            <a 
                            href="#"
                            onClick={e => handleFileDelete(value._id)}
                            >
                              
                              <img
                                key ={key}
                                style={{ maxHeight: '70px' }}
                                src={getImageUrl(value.image)}
                                alt="Image Preview"
                              />
                              <FontAwesomeIcon style= {{top: "10"}} icon={faTimesCircle} />
                              </a>
                            );
                          })
                    }
                    {
                       RoomImage && RoomImage.length >0 &&
                       RoomImage.map((value ,key) => {
                       
                         return (
                         <a 
                         href="#"
                         onClick={e => handleFileDelete(key)}
                         >
                           
                           <img
                             key ={key}
                             style={{ maxHeight: '70px' }}
                             src={value}
                             alt="Image Preview"
                           />
                           <FontAwesomeIcon style= {{top: "10"}} icon={faTimesCircle} />
                           </a>
                         );
                       })
                    }
                    </div>
                    <Form >
                        <FormGroup className="mb-5 th">
                           <Row>
                              <Label for="exampleCustomFileBrowser">Add Room Images</Label>
                                <CustomInput 
                                type="file" id="exampleCustomFileBrowser" name="customFile"    label="Pick a file!" accept=".png, .jpg, .jpeg"maxlength ={1024}         maxCount={10} minCount={4} multiple onChange={e => handlemultipleFileChange(e)}
                                />
                              <Button type="button" color="primary" className="login-bt mt-4 mb-2" onClick={roomImageUploadApi}> Upload </Button>
                          </Row> 
                            
                      </FormGroup>
                    </Form>
                    
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