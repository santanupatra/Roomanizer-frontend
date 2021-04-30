import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { USER_URL } from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getImageUrl} from '../../../shared/helpers';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

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
      
      if(props.userId){
        props.crudActionCall(`${USER_URL}/profilePicture/${props.userId}`, formData, "UPDATE")
        toast.info('Uploaded successfully', {
            position: toast.POSITION.TOP_CENTER
        });

      }
      //setDropdownOpen(false)
    }
  }
    return (
        <div className="AgentDP mb-5">
        <img  src={userImage?userImage:getImageUrl(userDetails?userDetails.profilePicture:imagePath.profileImage)} alt="agentdp" />
        <div className="uploadAgentDP">
          {/* <input type="file" /> */}
          <input
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e)}
          id="favicon"
          type='file'
          accept='.png, .jpg, .jpeg'
          name='favicon'
          ref={imageUpload}
          />
          <FontAwesomeIcon icon={faUpload} onClick={uploadHandler}/>
        </div>
      </div>
            // <div className="">

            //       <div className="user-pic mt-5">
            //           <img src={userImage?userImage:getImageUrl(userDetails?userDetails.profilePicture:imagePath.userImage)} alt="image"/>
            //           <div class="upload-btn-wrapper">
            //             <button><FontAwesomeIcon icon={faCamera} onClick={uploadHandler}/></button>
                    //     <input
                    //       style={{ display: "none" }}
                    //       onChange={(e) => handleFileChange(e)}
                    //       id="favicon"
                    //       type='file'
                    //       accept='.png, .jpg, .jpeg'
                    //       name='favicon'
                    //       ref={imageUpload}
        //    />
            //           </div>
            //         </div>
            //  </div>
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