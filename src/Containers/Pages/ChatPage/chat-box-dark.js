import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Media } from 'reactstrap';
import { Row, Col} from 'reactstrap';

const ChatboxDark = (props) => {
    return (
          <div className="p-4 d-flex justify-content-end w-100">

                <div className="greybox">
                  <div className="grey-shape"></div>
                  <h6>Hello. What can I do for you?</h6>
                  <p className="mb-0">8:05 PM</p>
                </div>

          </div>
        
    );
  }
  
  export default ChatboxDark;