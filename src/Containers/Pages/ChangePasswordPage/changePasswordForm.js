import React,{useState} from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Col, Input } from 'reactstrap';



const changePasswordForm = (props) => {
    return (
      <div className="">
        
        <div className="login-form">
                      <Form>
                        <FormGroup row>
                          <Col sm={12}>
                            <Input type="password" name="password" id="examplePassword" placeholder="Create Password" />
                            <Input type="password" name="password" id="examplePassword" placeholder="Confirm Password" />
                            <a href="#" className="login-bt mt-5">Submit</a>
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                    
      </div>
    );
  }
  
  export default changePasswordForm;