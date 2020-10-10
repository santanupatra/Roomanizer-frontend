import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Media } from 'reactstrap';
import { Row, Col} from 'reactstrap';

const ChatLeft = (props) => {
    return (
          <div className="p-4 border-bottom">
            <Row>
              <Col xs={3} sm={3} md={3} lg={3} className="">
                <div className="chatpic">
                  <img src={imagePath.chatpicImage} alt="image"/>
                  <div className="green-ball"></div>
                </div>
              </Col>
              <Col xs={9} sm={9} md={9} lg={9} className="d-flex justify-content-between pl-0">
                <div>
                    <h6>Ruby Perrin</h6>
                    <p>Hey, How are you?</p>
                </div>

                <div>
                  <h6>8:14 PM</h6>
                  <span className="ch-green">12</span>
                </div>
              </Col>
            </Row>
          </div>
        
    );
  }
  
  export default ChatLeft;