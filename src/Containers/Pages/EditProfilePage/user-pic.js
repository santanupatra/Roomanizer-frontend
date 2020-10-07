import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PROFILEPICTURE_URL } from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getImageUrl} from '../../../shared/helpers';
const Userpic = (props) => {
  const [userImage,setUserImage] = useState(null)
  const [userDetails,setUserDetails] = useState()
 
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
      console.log(props.userId)
      if(props.userId){
        props.crudActionCall(`${PROFILEPICTURE_URL}/${props.userId}`, formData, "UPDATE")

      }
      //setDropdownOpen(false)
    }
  }
    return (
            <div className="">

                  <div className="user-pic mt-5">
                      <img src={userImage?userImage:getImageUrl(userDetails?userDetails.profilePicture:imagePath.userImage)} alt="image"/>
                      <div class="upload-btn-wrapper">
                        <button><FontAwesomeIcon icon={faCamera} onClick={uploadHandler}/></button>
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
                    {/*<div class="thumbnail-file mt-4">
                        <button><h2 className="mb-0 mt-1">+ Add Thumbnail File </h2></button>
                        <p>Recomended resolution 800x500, 650x450</p>
                        <input type="file" name="myfile" />
                    </div>*/}

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
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Userpic));
 // export default Userpic;