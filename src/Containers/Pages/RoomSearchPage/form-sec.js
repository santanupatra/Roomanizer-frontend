import React,{useState} from 'react';
import './style.css';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagePath from '../../../Config/imageConstants';
import {FormGroup, Button, Label, Col, Input, Row } from 'reactstrap';
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
        <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
            <Input type="select" name="select" id="exampleSelect" className="mb-2">
                <option>Luxembourg</option>
                <option>2</option>
                <option>3</option>
            </Input>
            </Col>
            <Col xs={12} sm={12} md={5} lg={5}>
              <Input className="search mb-2" type="email" name="email" id="exampleEmail" placeholder="Enter a street, area or city" />
            </Col>
            <Col xs={12} sm={12} md={2} lg={2}>
              <button className="filter mb-2 d-sm-block w-100" onClick={toggle}>{buttonLabel}<img src={imagePath.filterImage} alt="image"/></button>
            </Col>
            <Col xs={12} sm={12} md={2} lg={2}>
              <button className="black-bt d-sm-block w-100 mb-2">Search</button>
            </Col>
      </Row>

      <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Filter</ModalHeader>
              <ModalBody className="p-4">
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
                    <Label for="exampleCheckbox" className="filter-modal">Preferred Gender</Label>
                    <div className="filt d-flex justify-content-between">
                      <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Male" />
                      <CustomInput type="radio" id="exampleCustomRadio1" name="customRadio" label="Female" />
                      <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Either" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Listing Amenities</Label>
                    <div className="filt d-flex justify-content-between">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="In-unit Washer" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Cleaning Personnel" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Furnished" />                     
                    </div>
                    <div className="filt d-flex justify-content-between">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Private Bathroom" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Parking" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Outdoor Space" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">House Rules</Label>
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
                    <div className="filt d-flex justify-content-between">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="vegan Only" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="420 Friendly" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Drinking Friendly" />
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