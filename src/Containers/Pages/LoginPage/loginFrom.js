import React from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Input,Col} from 'reactstrap';

const loginFrom = (props) => {
    return (
      <div className="">
        <div className="login-form">
                      <Form>
                        <FormGroup row>
                          <Col sm={12}>
                            <Input type="email" name="name" id="examplename" placeholder="Email" />
                            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                            <a href="/ForgetPassword" className="forgot"><p>Forgot Password?</p></a>
                            <a href="#" className="login-bt mb-2">Login</a>
                            <img src={imagePath.orImage} alt="image"/>
                            <a href="#"><img src={imagePath.fbImage} alt="image"/></a>
                            <a href="#"><img src={imagePath.gsImage} alt="image"/></a>
                            <p className="forgot mt-3 mb-0">Don’t have an account? <span>Register</span></p>
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
      </div>
    );
  }
  
  export default loginFrom;