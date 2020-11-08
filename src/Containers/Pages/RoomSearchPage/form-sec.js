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
import { propTypes } from 'react-bootstrap/esm/Image';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { AMINITIES_URL,HOUSE_RULE_URL} from '../../../shared/allApiUrl';

const Formsec = (props) => {
 console.log(props)
  // const initialFields = {
  //   // gender: "",
  //   // occupation: "",
  //   city:"",
  //   // cityList:"",
  //   // duration:"",
  //   // budget:"",
  //   // address:'',
  //   isSearch:false
  // }
  const perPage = 6;

 const [cityList, setCityList] = useState([]);
 const [bedrooms, setBedrooms] = useState('');
 const [city, setCity] = useState('');
 const [address, setAddress] = useState('');
 const [amenities, setAmenities] = useState('');
 const [houserules, setHouseRules] = useState('');
 const [pageCount, setPageCount] = useState('');
 const [amenitiesList, setAmenitiesList] = useState([]);
 const [houserulesList, setHouseRulesList] = useState([]);
 const [showList, setShowList] = useState(false);
 const [gender, setGender] = useState('');
 const [listCount, setListCount] = useState(0);
 const [searchList, setSearchList] = useState([]);
 const [location, setLocation] = useState('');

 const history = useHistory();



 useEffect(() => {

  let params = new URLSearchParams(props.location.search);
  let city = params.get('city');
  let occupation = params.get('occupation');
  let gender = params.get('gender');
  let age = params.get('age');
  let location = params.get('location');
  let bedrooms = params.get('bedrooms');
  let amenities = params.get('amenities');
  let houserules = params.get('houserules');
  let page = params.get('page');
  let latitude = params.get('lat');
  let longitude = params.get('lng');
  

  setGender(gender);
  setCity(city);
  setBedrooms(bedrooms);
  //setAmenities(amenities); 
  
  let searchpara;
  if(localStorage.getItem('userId')!=null){
          searchpara = '?city='+city+'&gender='
                          +gender+
                          // '&lat='+latitude+'&lng='+longitude+
                          '&bedrooms='
                          +bedrooms+'&amenities='+amenities+'&houserules='
                          +houserules+'&loginUserId='+localStorage.getItem('userId')+'&page='+page+'&perpage='+perPage;
  }else{
         searchpara = '?city='+city+'&gender='
                        +gender+
                        // '&lat='+latitude+'&lng='+longitude+
                        '&bedrooms='
                        +bedrooms+'&amenities='+amenities+'&houserules='
                        +houserules+'&page='+page+'&perpage='+perPage;
        }
                  callApi(apiBaseUrl+"/web/user-api/"+searchpara,'GET','').then(
                    response => {
                      let totalpagecount = Math.ceil(response.data.count/perPage);
                      setShowList(true);
                      setListCount(response.data.count);
                      setSearchList(response.data.list);
                      setPageCount(totalpagecount);
                    }
                  )
  },[]);


  console.log("location===>",location)

 const filterSubmit = (page) => {
  setShowList(false);
  let params = new URLSearchParams(props.location.search);
  console.log(params)
  console.log("location===>",location)
  // let flocation = '';
  //let location = params.get('location');
  // let latitude = params.get('lat');
  // let longitude = params.get('lng');
  
  if(localStorage.getItem('userId')!=null && gender!=null && bedrooms!=null && city!=null){
  
  let searchpara = '?city='+city+'&location='+location+'&bedrooms='
                  +bedrooms+'&gender='+gender+'&amenities='+amenities+'&houserules='
                  +houserules+'&loginUserId='+localStorage.getItem('userId')+'&page='+page;
  
  history.push('/roomSearch/'+searchpara);
  window.location.reload();
  }else{

    let searchpara = '?city='+city+'&location='+location+'&bedrooms='
                  +bedrooms+'&gender='+gender+'&amenities='+amenities+'&houserules='
                  +houserules+'&page='+page;

  history.push('/roomSearch/'+searchpara);
  window.location.reload();
  

}

}
// console.log()
const createFilterString = (name,e) => {

  if(name=="amenities"){
    if(amenities){
      setAmenities(amenities+','+e);
      // setChecked(!checked)
    } else {
      setAmenities(e);
      // setChecked(!checked)
    }
  }
  if(name=="houserules"){
    console.log(houserules)
    if(houserules){
      setHouseRules(houserules+','+e);
      // setChecked(!checked)
    } else {
      setHouseRules(e);
      // setChecked(!checked)
    }
  }
}
console.log("location===>",location)

//  const [fields, setFields] = useState(initialFields);
//  useEffect(() => {
//   setFields((prevState) => ({ ...prevState, city: props.urlData[0].city, }));
//   setFields((prevState) => ({ ...prevState, address: props.urlData[1].address }));
//  },[props.urlData])
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

    callApi(apiBaseUrl+"/web/"+AMINITIES_URL,'GET','').then(
      response => {
        let option = response.data;
        setAmenitiesList(option);
      }
    )

    callApi(apiBaseUrl+"/web/"+HOUSE_RULE_URL,'GET','').then(
      response => {
        let option = response.data;
        setHouseRulesList(option);
      }
    )

  },[]);
  // const handleChange = (name,value)=>{
  //   setFields((prevState) => ({ ...prevState, [name]: value,isSearch:true }));
  // }
  console.log("houserulesList+++++++",houserulesList);
    return (
      <div className="">
        <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
            <Input 
                  type="select" 
                  name="city" 
                  id="city"
                  value={city}
                  onChange={(e) =>setCity(e.target.value)}
                  // onChange={(e) =>
                  //   handleChange(e.target.name, e.target.value)
                  // }
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
                    value={location}
                    placeholder="Enter a street, area or city"
                    onChange={(e) =>setLocation(e.target.value)}
                    // onChange={(e) =>
                    //   handleChange(e.target.name, e.target.value)
                    // }
                    // value={address}
                  />
            </Col>
            {/* <Col xs={12} sm={12} md={6} lg={2}>
                                      {/* <Label for="">Gender</Label> */}
                                      {/* <Input 
                                        type="select"
                                        name="fgender" 
                                        id="fgender"
                                        value={gender}
                                        onChange={(e) =>setGender(e.target.value)}
                                      >
                                        <option value="">Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="either">Other</option>
                                      </Input> */}
                                    {/* </Col> */} 
            <Col xs={12} sm={12} md={2} lg={2}>
              <button className="filter mb-2 d-sm-block w-100" onClick={toggle}>{buttonLabel}<img src={imagePath.filterImage} alt="image"/></button>
            </Col>
            <Col xs={12} sm={12} md={2} lg={2}>
              {/* <button className="black-bt d-sm-block w-100 mb-2" type="button" onClick={(e)=>props.formData(fields)}>Search</button> */}
              <button onClick={(e)=>filterSubmit(0)} className="black-bt d-sm-block w-100 mb-2">Search</button>

            </Col>
      </Row>

      <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Filter</ModalHeader>
              <ModalBody className="p-4">
                {/* <Form>
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
                      <CustomInput type="checkbox" id="exampleCustomCheckbox1" label="In-unit Washer" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Cleaning Personnel" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Furnished" />                     
                    
                      <CustomInput type="checkbox" id="exampleCustomCheckbox4" label="Private Bathroom" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox5" label="Parking" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox6" label="Outdoor Space" />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">House Rules</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      <CustomInput type="checkbox" id="exampleCustomCheckbox1" label="No Smoking" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="No Pets" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="No Drugs" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox4" label="No Drinking" />               
                    
                      <CustomInput type="checkbox" id="exampleCustomCheckbox5" label="Dogs Ok" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox6" label="Cats Ok" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox7" label="Other Pets Ok" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox8" label="Couples Ok" />
                    
                      <CustomInput type="checkbox" id="exampleCustomCheckbox9" label="vegan Only" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox10" label="420 Friendly" />
                      <CustomInput type="checkbox" id="exampleCustomCheckbox11" label="Drinking Friendly" />
                    </div>
                  </FormGroup>
                </Form> */}
                <Form>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">No of Bedrooms</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      <CustomInput 
                      type="radio" 
                      name="no_bedrooms" 
                      id="no_bedrooms1" 
                      value="2"
                      checked={bedrooms==2} 
                      label="2 Bedroom"
                      onChange={(e) =>setBedrooms(e.target.value)} 
                     />
                      <CustomInput 
                      type="radio" 
                      name="no_bedrooms" 
                      id="no_bedrooms2" 
                      value="3"
                      checked={bedrooms==3} 
                      label="3 Bedroom"
                      onChange={(e) =>setBedrooms(e.target.value)} 
                      />
                      <CustomInput
                      type="radio" 
                      name="no_bedrooms" 
                      id="no_bedrooms3" 
                      value="5"
                      checked={bedrooms==5} 
                      label="4+ Bedroom"
                      onChange={(e) =>setBedrooms(e.target.value)} 
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Preferred Gender</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      <CustomInput
                      type="radio" 
                      name="gender" 
                      id="gender1" 
                      value="male"
                      checked={gender=="male"} 
                      label="Male"
                      onChange={(e) =>setGender(e.target.value)} 
                      />
                      <CustomInput
                      type="radio" 
                      name="gender" 
                      id="gender2" 
                      value="female"
                      checked={gender=="female"} 
                      label="Female"
                      onChange={(e) =>setGender(e.target.value)} 
                       />
                      <CustomInput
                      type="radio" 
                      name="gender" 
                      id="gender3" 
                      value="either"
                      checked={gender=="either"} 
                      label="Either"
                      onChange={(e) =>setGender(e.target.value)} 
                     />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Listing Amenities</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      {/* <CustomInput type="checkbox" id="listing_amenities1" label="In-unit Washer" />
                      <CustomInput type="checkbox" id="listing_amenities2" label="Furnished" />
                      <CustomInput type="checkbox" id="listing_amenities3" label="Private Bathroom" />
                   
                      <CustomInput type="checkbox" id="listing_amenities4" label="Outdoor Space" /> */}
                      {/* <CustomInput type="checkbox" id="listing_amenities1" label="In-unit Washer" />
                      <CustomInput type="checkbox" id="listing_amenities2" label="Cleaning Personnel" />
                      <CustomInput type="checkbox" id="listing_amenities3" label="Furnished" />                     
                    
                      <CustomInput type="checkbox" id="listing_amenities4" label="Private Bathroom" />
                      <CustomInput type="checkbox" id="listing_amenities5" label="Parking" />
                      <CustomInput type="checkbox" id="listing_amenities6" label="Outdoor Space" /> */}
                       { amenitiesList!='' && amenitiesList.map((val,i) =>{
                                                return(
                                                  <CustomInput 
                                                    type="checkbox" 
                                                    id={val._id} 
                                                    value={val._id}
                                                    label={val.name}
                                                  //  checked={amenities===val._id} 
                                                  // checked={checked}
                                                    onChange={(e) =>createFilterString("amenities",e.target.value)} 
                                                  />
                                                );
                                              })
                                            }
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox" className="filter-modal">Home Rules</Label>
                    <div className="filt d-flex justify-content-between flex-wrap">
                      {/* <CustomInput type="checkbox" id="home_rules1" label="No Smoking" />
                      <CustomInput type="checkbox" id="home_rules2" label="No Pets" />
                      <CustomInput type="checkbox" id="home_rules3" label="No Drugs" />
                      <CustomInput type="checkbox" id="home_rules4" label="No Drinking" />               
                    
                      <CustomInput type="checkbox" id="home_rules5" label="Dogs Ok" />
                      <CustomInput type="checkbox" id="home_rules6" label="Cats Ok" />
                      <CustomInput type="checkbox" id="home_rules7" label="Other Pets Ok" />
                      <CustomInput type="checkbox" id="home_rules8" label="Couples Ok" /> */}
                      {/* <CustomInput type="checkbox" id="home_rules1" label="No Smoking" />
                      <CustomInput type="checkbox" id="home_rules2" label="No Pets" />
                      <CustomInput type="checkbox" id="home_rules3" label="No Drugs" />
                      <CustomInput type="checkbox" id="home_rules4" label="No Drinking" />               
                    
                      <CustomInput type="checkbox" id="home_rules5" label="Dogs Ok" />
                      <CustomInput type="checkbox" id="home_rules6" label="Cats Ok" />
                      <CustomInput type="checkbox" id="home_rules7" label="Other Pets Ok" />
                      <CustomInput type="checkbox" id="home_rules8" label="Couples Ok" />
                    
                      <CustomInput type="checkbox" id="home_rules9" label="vegan Only" />
                      <CustomInput type="checkbox" id="home_rules10" label="420 Friendly" />
                      <CustomInput type="checkbox" id="home_rules11" label="Drinking Friendly" /> */}
                      { houserulesList!='' && houserulesList.map((val) =>{
                                                return(
                                                  <CustomInput 
                                                    type="checkbox" 
                                                    id={val._id} 
                                                    value={val._id}
                                                    // checked={houserules==val.name}
                                                    // checked={checked}
                                                    //fields={houserules}
                                                    label={val.name}
                                                    onChange={(e) =>createFilterString("houserules",e.target.value)} 
                                                  />
                                                );
                                              })
                                            }

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
  
  // export default Formsec;
  const mapStateToProps = state => {
    const { room } = state;
    return {
        room
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM"))
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Formsec));