import React,{useState,useEffect} from 'react';
import './style.css';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagePath from '../../../Config/imageConstants';
import {FormGroup, Button, Label, Col, Input, Row } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, CustomInput, Form, } from 'reactstrap';
import { callApi} from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";
import { CITY_URL} from '../../../shared/allApiUrl';


const Formsec = (props) => {
 
  const initialFields = {
    gender: "",
    occupation: "",
    city:"",
    cityList:"",
    duration:"",
    budget:"",
    address:'',
    isSearch:false
  }
 const [cityList, setCityList] = useState([]);
 const [fields, setFields] = useState(initialFields);
 useEffect(() => {
  setFields((prevState) => ({ ...prevState, city: props.urlData[0].city, }));
  setFields((prevState) => ({ ...prevState, address: props.urlData[1].location }));
 },[props.urlData])
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    callApi(apiBaseUrl+"/web/"+CITY_URL,'GET','').then(
      response => {
        let option = response.data;
        setCityList(option);
      }
    )
  },[]);
  const handleChange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value,isSearch:true }));
  }
  console.log("fields+++++++",fields);
    return (
      <div className="">
        <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
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
            <Col xs={12} sm={12} md={5} lg={5}>
            <Input 
                    className="search" 
                    type="text" 
                    name="address" 
                    id="address"
                    placeholder="Enter a street, area or city"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    value={fields.address}
                  />
            </Col>
            <Col xs={12} sm={12} md={2} lg={2}>
              <button className="filter mb-2 d-sm-block w-100" onClick={toggle}>{buttonLabel}<img src={imagePath.filterImage} alt="image"/></button>
            </Col>
            <Col xs={12} sm={12} md={2} lg={2}>
              <button className="black-bt d-sm-block w-100 mb-2" type="button" onClick={(e)=>props.formData(fields)}>Search</button>
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
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="2 Bedroom" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="3 Bedroom" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="4+ Bedroom" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Preferred Gender</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Male" />
                      <CustomInput type="radio" id="exampleCustomRadio1" name="customRadio" label="Female" />
                      <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Either" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Listing Amenities</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="In-unit Washer" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Cleaning Personnel" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Furnished" />                     
                    
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Private Bathroom" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Parking" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Outdoor Space" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">House Rules</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox" label="No Smoking" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="No Pets" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="No Drugs" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="No Drinking" />               
                    
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Dogs Ok" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Cats Ok" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Other Pets Ok" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Couples Ok" />
                    
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