import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import Facebook from '../facebook';
import Twitter from '../twitter';
import Gsuite from '../gSuite';
import Email from '../email';


const Formsec = (props) => {
    return (
    
                <div className="left-box text-center">
                    <div className="profile-img mb-2">
                      <img src={imagePath.roomuserpicImage} alt="image"/>
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
                    <div className="mt-3 d-flex align-items-center justify-content-center">
                      <Facebook></Facebook>
                      <Twitter></Twitter>
                      <Gsuite></Gsuite>
                      <Email></Email>
                    </div>
                </div>
       
    );
  }
  
  export default Formsec;