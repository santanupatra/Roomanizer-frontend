import React ,{useEffect,useState}from 'react';
import './style.css';
import {FormGroup, Button, Label, Input, Col, Row,Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Pageno from '../pageno';
import Cardbox from './card';
import Footer from '../../Common/footer';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { USER_URL } from '../../../shared/allApiUrl';
import { getImageUrl } from '../../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { Modal, ModalHeader, ModalBody, ModalFooter, CustomInput, Form, } from 'reactstrap';
import ReactSimpleRange from 'react-simple-range';
import { callApi} from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";
import { CITY_URL} from '../../../shared/allApiUrl';
import imagePath from '../../../Config/imageConstants';


const RoomMateSearch =(props)=> {

  const {buttonLabel,className} = props;
  const toggle = () => setModal(!modal);

  const [modal, setModal] = useState(false);
  const [fcityList, setFilterCityList] = useState([]);
  
  const [searchList, setSearchList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [listCount, setListCount] = useState(0);

  const [fgender, setGender] = useState('');
  const [foccupation, setOccupation] = useState('');
  const [fcity, setCity] = useState('');
  const [fage, setAge] = useState('');
  

  useEffect(() => {

    let params = new URLSearchParams(props.location.search);
    let city = params.get('city');
    let occupation = params.get('occupation');
    let gender = params.get('gender');
    let age = params.get('age');
    let location = params.get('location');

    setGender(gender);
    setCity(city);
    setOccupation(occupation);
    setAge(age);

    let searchpara = '?city='+city+'&occupation='+occupation+'&gender='+gender+'&age='+age+'&location='+location+'&page=0';

    callApi(apiBaseUrl+"/web/user-api/"+searchpara,'GET','').then(
      response => {
        setShowList(true);
        setListCount(response.data.count);
        setSearchList(response.data.list);
      }
    )

  },[]);

  useEffect(() => {
    callApi(apiBaseUrl+"/web/"+CITY_URL,'GET','').then(
      response => {
        let option = response.data;
        setFilterCityList(option);
      }
    )

  },[]);


  const filterSubmit = () => {
    setShowList(false);
    let params = new URLSearchParams(props.location.search);
    let flocation = '';
    // let location = params.get('location');

    let searchpara = '?city='+fcity+'&occupation='+foccupation+'&gender='+fgender+'&age='+fage+'&location='+flocation+'&page=0';
    console.log("parameters",searchpara);
    callApi(apiBaseUrl+"/web/user-api/"+searchpara,'GET','').then(
      response => {
        setShowList(true);
        setListCount(response.data.count);
        setSearchList(response.data.list);
        
      }
    )
  }
  

  return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">  
                        <Row>
                          <Col xs={12} m={12} md={12} lg={12}>
                              <div className="form-bg1">
                                <h3 className="heading2 mt-3 mb-4">Find A Roommate :</h3>
                                
                                <div className="">
                                  <Row>
                                    <Col xs={12} sm={12} md={6} lg={2}>
                                      <Label for="">City</Label>
                                      <Input 
                                        type="select" 
                                        name="fcity" 
                                        id="fcity"
                                        value={fcity}
                                        onChange={(e) =>setCity(e.target.value)}
                                      >
                                        <option value="">City</option>
                                        {
                                          fcityList!='' && fcityList.map((val) =>{
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
                                          value = {fage}
                                          onChange={(value)=>{setAge(value.value);}}
                                        />
                                    </Col>
                                    <Col xs={12} sm={12} md={6} lg={2}>
                                      <Label for="">Occupation</Label>
                                      <Input 
                                        type="select" 
                                        name="foccupation" 
                                        id="foccupation"
                                        value={foccupation}
                                        onChange={(e) =>setOccupation(e.target.value)}
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
                                        name="fgender" 
                                        id="fgender"
                                        value={fgender}
                                        onChange={(e) =>setGender(e.target.value)}
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
                                      <button onClick={filterSubmit} className="black-bt mt-4">Search Now</button>
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

                            </div>
                          </Col>
                        </Row>

                        <Col xs={12} m={12} md={12} lg={12}>
                          {searchList && listCount > 0 ? 
                            <h3 className="heading2 mt-3 mb-4">All Roommates: {listCount}   Results</h3>
                          :
                          <h3 className="heading2 mt-3 mb-4"></h3>}
                        </Col>
                        
                        <Col xs={12} m={12} md={12} lg={12}>
                          <Row className="d-flex flex-wrap">
                            {showList ? 
                            searchList && listCount > 0 ? searchList.map((val) => {
                              return (
                                <Col xs={12} sm={6} md={6} lg={4} className="mb-4">
                                  <div>
                                    <Cardbox val={val}></Cardbox>
                                  </div>
                                </Col>
                                  );
                                })
                                :
                                <Col xs={12} sm={6} md={6} lg={4} className="mb-4">
                                  <div>No Roommates found!</div>
                                </Col>
                                 :
                                 <Col xs={12} sm={6} md={6} lg={4} className="mb-4">
                                  <div>Loading data ....</div>
                                </Col>
                                }
                          </Row>
                        </Col>

                        

                        <Row>
                          <Col>
                            <Pageno></Pageno>
                          </Col>
                        </Row>
                        
                      </div>
                  </Col>
                </Row>

              </Container>
            </div>
        </div>
      <Footer></Footer>
      </div>
    )
  
}
const mapStateToProps = state => {
  const { user } = state;
  return {
      user
  }
}

const mapDispatchToProps = dispatch => {
  return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER"))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomMateSearch));
//export default  roomMateSearch;