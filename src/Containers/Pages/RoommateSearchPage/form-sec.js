import React,{useState,useEffect} from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagePath from '../../../Config/imageConstants';
import {FormGroup, Button, Label, Input, Col, Row } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, CustomInput, Form, } from 'reactstrap';
import ReactSimpleRange from 'react-simple-range';

import { callApi} from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";
import { CITY_URL} from '../../../shared/allApiUrl';


const Formsec = (props) => {
  const initialFields = {
    gender: "",
    occupation: "",
    city:"",
    cityList:""
  }

  const {buttonLabel,className} = props;

  const [modal, setModal] = useState(false);
  const [fields, setFields] = useState(initialFields);
  const [cityList, setCityList] = useState([]);
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {

    callApi(apiBaseUrl+"/web/"+CITY_URL,'GET','').then(
      response => {
        let option = response.data;
        setCityList(option);
      }
    )

  },[]);

  const handleChange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }

  const toggle = () => setModal(!modal);


    return (
      <div className="">
        
        <Row>
            <Col xs={12} sm={12} md={6} lg={2}>
            <Label for="">City</Label>
            <Input 
              type="select" 
              name="city" 
              id="city"
              value={fields.city}
              onChange={(e) =>
                handleChange(e.target.name, e.target.value)
              }
            >
              <option value="">City</option>
              {
                cityList!='' && cityList.map((val) =>{
                  return(
                    <option value={val.cityName}>{val.cityName}</option>
                  );
                })
              } 
            </Input>
            </Col>
            <Col xs={12} sm={12} md={6} lg={2}>
              <Label for="">Age</Label>
              <ReactSimpleRange
                  min={1}
                  max={100}
                  label={true}
                  sliderSize={5}
                  sliderColor='#ccc'
                  trackColor='#014d81'
                  thumbColor='#014d81'
                  value = {20}
                 />
            </Col>
            <Col xs={12} sm={12} md={6} lg={2}>
            <Label for="">Occupation</Label>
              <Input 
                type="select" 
                name="occupation" 
                id="occupation"
                value={fields.occupation}
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value)
                }
              >
                <option value="">Occupation</option>
                <option value="Student">Student</option>
                <option value="Engineer">Engineer</option>
                <option value="Other">Other</option>
              </Input>
            </Col>
            <Col xs={12} sm={12} md={6} lg={2}>
              <Label for="">Gender</Label>
              <Input 
                type="select"
                name="gender" 
                id="gender"
                value={fields.gender}
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value)
                }
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Input>
            </Col>
            <Col xs={12} sm={12} md={6} lg={2}>
              <Label for="">Filter</Label>
              <a className="filter" onClick={toggle}>{buttonLabel}<img src={imagePath.filterImage} alt="image"/></a>
            </Col>
            <Col xs={12} sm={12} md={6} lg={2}>
              <button className="black-bt mt-4">Search Now</button>
            </Col>
      </Row>

      <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Filter</ModalHeader>
              <ModalBody className="p-4">
                <Form>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">No of Bedrooms</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      <CustomInput type="checkbox" id="no_bedrooms1" label="2 Bedroom" />
                      <CustomInput type="checkbox" id="no_bedrooms2" label="3 Bedroom" />
                      <CustomInput type="checkbox" id="no_bedrooms3" label="4+ Bedroom" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Listing Amenities</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      <CustomInput type="checkbox" id="listing_amenities1" label="In-unit Washer" />
                      <CustomInput type="checkbox" id="listing_amenities2" label="Furnished" />
                      <CustomInput type="checkbox" id="listing_amenities3" label="Private Bathroom" />
                   
                      <CustomInput type="checkbox" id="listing_amenities4" label="Outdoor Space" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Home Rules</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      <CustomInput type="checkbox" id="home_rules1" label="No Smoking" />
                      <CustomInput type="checkbox" id="home_rules2" label="No Pets" />
                      <CustomInput type="checkbox" id="home_rules3" label="No Drugs" />
                      <CustomInput type="checkbox" id="home_rules4" label="No Drinking" />               
                    
                      <CustomInput type="checkbox" id="home_rules5" label="Dogs Ok" />
                      <CustomInput type="checkbox" id="home_rules6" label="Cats Ok" />
                      <CustomInput type="checkbox" id="home_rules7" label="Other Pets Ok" />
                      <CustomInput type="checkbox" id="home_rules8" label="Couples Ok" />
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