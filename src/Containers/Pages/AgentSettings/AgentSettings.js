import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, FormGroup, Label, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import MultiSelect from "react-multi-select-component";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AgentSettings = () => {
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
              <Container className="mb-3">
                <Col xs={12} sm={12} md={6} lg={4}>
                    <h2>Change Password</h2>
                    <div className="userDetailsBox p-4 bg-white mt-2">
                    <FormGroup>
                      <Label>Current Password</Label>
                      <input className="input" type="password" placeholder="Enter Current Password" />
                    </FormGroup>
                    <FormGroup>
                      <Label>New Password</Label>
                      <input className="input" type="password" placeholder="Enter New Password" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Re-new Password</Label>
                      <input className="input" type="password" placeholder="Enter Re-new Password" />
                    </FormGroup>
                    <Button color="blue" className="px-4">Save Change</Button>
                    

                    </div>
                  </Col>
              </Container>
        </div>
      </div>
    )
}
export default AgentSettings;
