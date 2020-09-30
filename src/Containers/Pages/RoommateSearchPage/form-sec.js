import React,{useState} from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagePath from '../../../Config/imageConstants';
import {FormGroup, Button, Label, Input, Col } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, CustomInput, Form, } from 'reactstrap';



const Formsec = (props) => {

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

    return (
      <div className="">
        
        <FormGroup row>
            <Col sm={3}>
            <Label for="">Location</Label>
            <Input type="select" name="select" id="exampleSelect">
                <option>Luxembourg</option>
                <option>2</option>
                <option>3</option>
            </Input>
            </Col>
            <Col Col sm={2}>
              <Label for="">Age</Label>
              <Input type="range" name="range" id="exampleRange" />
            </Col>
            <Col sm={2}>
            <Label for="">Occupation</Label>
                <Input className="work" type="email" name="email" id="exampleEmail" placeholder="Students" />
            </Col>
        <Col sm={2}>
          <Label for="">Gender</Label>
          <Input type="select" name="select" id="exampleSelect">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </Input>
        </Col>
        <Col sm={1} className="pr-0">
          <Label for="">Filter</Label>
          <a className="filter" onClick={toggle}>{buttonLabel}<img src={imagePath.filterImage} alt="image"/></a>
        </Col>
        <Col sm={2} className="pt-4 pl-4">
          <a href="#" className="black-bt">Search Now</a>
        </Col>
      </FormGroup>

      <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Filter</ModalHeader>
              <ModalBody className="">
                <Form>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">No of Bedrooms</Label>
                    <div className="filt d-flex justify-content-between">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="2 Bedroom" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="3 Bedroom" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="4+ Bedroom" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Listing Amenities</Label>
                    <div className="filt d-flex justify-content-between">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="In-unit Washer" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Furnished" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Private Bathroom" />
                    </div>
                    <div className="filt d-flex justify-content-between">                
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Outdoor Space" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Home Rules</Label>
                    <div className="filt d-flex justify-content-between">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="No Smoking" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="No Pets" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="No Drugs" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="No Drinking" />               
                    </div>
                    <div className="filt d-flex justify-content-between">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Dogs Ok" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Cats Ok" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Other Pets Ok" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Couples Ok" />
                    </div>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>Reset</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </div>

      </div>


    );
  }
  
  export default Formsec;