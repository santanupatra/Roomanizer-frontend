import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Media } from 'reactstrap';
import { Row, Col} from 'reactstrap';

const ChatBoxLight = (props) => {
    return (
          <div className="p-4 d-flex justify-content-start w-100">

            <div className="whitebox">
              <div className="white-shape"></div>
              <h6>I'm just looking around.
Will you tell me something about yourself?</h6>
              <p className="mb-0">8:10 PM</p>
            </div>

          </div>
        
    );
  }
  
  export default ChatBoxLight;