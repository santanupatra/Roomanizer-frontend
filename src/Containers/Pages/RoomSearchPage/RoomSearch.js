import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { FormGroup, Button, Label, Input, Col, Row, Container } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, CustomInput, Form, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Pageno from '../pageno';
import Formsec from './form-sec';
import Searchlist from './RoomSearchlist';
import Footer from '../../Common/footer';
import { callApi } from '../.../../../../api/index';
import { apiBaseUrl } from "../../../shared/helpers";
import { CITY_URL, AMINITIES_URL, HOUSE_RULE_URL } from '../../../shared/allApiUrl';
import ReactPaginate from 'react-paginate';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import GoogleMap from './googleMap';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
//import 'react-google-places-autocomplete/dist/index.min.css';
import Geocode from "react-geocode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faList, faMapMarkedAlt, faColumns, faMapMarked, faMapMarker } from '@fortawesome/free-solid-svg-icons';
const palceKey = "AIzaSyA5LrPhIokuSBO5EgKEcfu859gog6fRF8w";
  Geocode.setApiKey(palceKey);
  Geocode.setLanguage("en");
const RoomSearch = (props) => {
  const perPage = 4;
  const { buttonLabel, className } = props;
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [showList, setShowList] = useState(false);
  const [listCount, setListCount] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [checked1, setChecked] = useState([]);
  const [pageCount, setPageCount] = useState('');
  const [city, setCity] = useState('');
  const [moveIn, setMoveIn] = useState('');
  const [duration, setDuration] = useState('');
  // const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [amenities, setAmenities] = useState('');
  const [page, setPage] = useState('');
  const [gender, setGender] = useState('');
  const [cityList, setCityList] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [houserulesList, setHouseRulesList] = useState([]);
  const [houserules, setHouseRules] = useState('');
  const [houseRuleArr,setHouseRuleArr]=useState([])
  const [aminitiesArr,setAminitiesArr]=useState([])
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [activeInfoWindow, setActiveInfoWindow] = useState('');
  const [view, setView] = useState('splitView');

  const history = useHistory();
  
  useEffect(() => {

    let params = new URLSearchParams(props.location.search);
    let city = params.get('city');
    let moveIn = params.get('moveIn');
    let gender = params.get('gender');
    let budget = params.get('budget');
    let duration = params.get('duration');
    let bedrooms = params.get('bedrooms');
    let amenities = params.get('amenities');
    let houserules = params.get('houserules');
    let page = params.get('page');
    let getlatitude = params.get('lat');
    let getlongitude = params.get('lng');
    let address = params.get('location');

    setGender(gender);
    setCity(city);
    setLatitude(getlatitude)
    setLongitude(getlongitude)
    setBedrooms(bedrooms);
    setAddress(address)
    setAmenities(amenities); 
    let animitiesArray = amenities.split(',');
    setAminitiesArr(animitiesArray)
    setHouseRules(houserules); 
    let houseRulesArray = houserules.split(',');
    setHouseRuleArr(houseRulesArray)
    let searchpara;
    if (localStorage.getItem('userId') != null) {
      searchpara = '?city=' + city +
        '&location=' + address +
        '&gender='
        + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
         //'&age='+age+
         '&lat='+getlatitude+'&lng='+getlongitude+
        '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&loginUserId=' + localStorage.getItem('userId') + '&page=' + page + '&perpage=' + perPage;
    } else {
      searchpara = '?city=' + city +
        '&location=' + address +
        '&gender=' + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
         //'&age='+age+
         '&lat='+getlatitude+'&lng='+getlongitude+
        '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&page=' + page + '&perpage=' + perPage;
    }
    callApi(apiBaseUrl + "/web/landlord-api/" + searchpara, 'GET', '').then(
      response => {
        let totalpagecount = Math.ceil(response.data.count / perPage);
        setShowList(true);
        setListCount(response.data.count);
        setSearchList(response.data.list);
        setPageCount(totalpagecount);
      }
    )
  }, []);
  
  const navToRoomDetailsPage = _id =>
  props.history.push(`/roomRent/${_id}`);
  useEffect(() => {
    callApi(apiBaseUrl + "/web/" + CITY_URL, 'GET', '').then(
      response => {
        let option = response.data;
        setCityList(option);
      }
    )

    callApi(apiBaseUrl + "/web/" + AMINITIES_URL, 'GET', '').then(
      response => {
        let option = response.data;
        setAmenitiesList(option);
      }
    )

    callApi(apiBaseUrl + "/web/" + HOUSE_RULE_URL, 'GET', '').then(
      response => {
        let option = response.data;
        setHouseRulesList(option);
      }
    )

  }, []);
  
  const filterSubmit = (page) => {
    
    setShowList(false);
    let params = new URLSearchParams(props.location.search);
    // let flocation = '';
    //let location = params.get('location');
    //let latitude = params.get('lat');
    //let longitude = params.get('lng');
     let searchpara;
    if (localStorage.getItem('userId') != null) {
       searchpara = '?city=' + city +
        '&location=' + address +
        '&gender='
        + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
        '&lat=' + latitude + '&lng=' + longitude + '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&loginUserId=' + localStorage.getItem('userId') + '&page=' + page + '&perpage=' + perPage;

      history.push('/roomSearch/' + searchpara);
     
    } else {

       searchpara = '?city=' + city +
        '&location=' + address +
        '&gender=' + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
        // '&age='+age+
        '&lat=' + latitude + '&lng=' + longitude + '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&page=' + page + '&perpage=' + perPage;

      history.push('/roomMateSearch/' + searchpara);
     // window.location.reload();
    }
    callApi(apiBaseUrl + "/web/landlord-api/" + searchpara, 'GET', '').then(
      response => {
        let totalpagecount = Math.ceil(response.data.count / perPage);
        setShowList(true);
        setListCount(response.data.count);
        setSearchList(response.data.list);
        setPageCount(totalpagecount);
      }
    )

  }
  const paginationCallFunction = (e) => {
    const selectedPage = e.selected;
    setShowList(false);
    let params = new URLSearchParams(props.location.search);
    // let flocation = '';
    let location = params.get('location');
    let latitude = params.get('lat');
    let longitude = params.get('lng');
    let searchpara
    if (localStorage.getItem('userId') != null) {
      searchpara = '?city=' + city +
        '&location=' + address +
        '&gender='
        + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
        // '&age='+age+
        '&lat=' + latitude + '&lng=' + longitude + '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&loginUserId=' + localStorage.getItem('userId') + '&page=' + selectedPage + '&perpage=' + perPage;
    } else {
      searchpara = '?city=' + city +
        '&location=' + address +
        '&gender=' + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
        // '&age='+age+
        '&lat=' + latitude + '&lng=' + longitude + '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&page=' + selectedPage + '&perpage=' + perPage;
        

    }
    callApi(apiBaseUrl + "/web/landlord-api/" + searchpara, 'GET', '').then(
      response => {
        setShowList(true);
        setSearchList(response.data.list);
      }
    )
  }


  const createFilterString = (name, e) => {

    if(name=="amenities"){
      if(!aminitiesArr.includes(e.value)){
          aminitiesArr.push(e.value)
          setAminitiesArr(aminitiesArr)
      }else{
          remove_array_element(aminitiesArr,e.value)
      }
      function remove_array_element(array, n)
      {
        var index = array.indexOf(n);
        if (index > -1) {
          array.splice(index, 1);
      }
        return array;
      }

    setAmenities(aminitiesArr.toString())
  }

  
    if(name=="houserules"){
      if(!houseRuleArr.includes(e.value)){
        houseRuleArr.push(e.value)
        setHouseRuleArr(houseRuleArr)
      }else{
          remove_rules_element(houseRuleArr,e.value)
      }
    function remove_rules_element(rules, n)
    {
      var index = rules.indexOf(n);
      if (index > -1) {
        rules.splice(index, 1);
    }
      return rules;
    }
    setHouseRules(houseRuleArr.toString())
      
    }
  }
  const toggle1 = () => {
    setAmenities('');
    setAminitiesArr([]);
    setHouseRuleArr([]);
    setHouseRules('');
    setBedrooms('')
    //setModal(!modal)
  };
  const searchOptions = {
    componentRestrictions: { country: ['us','ca','uy'] },
    //types: ['city']
  }
  const handleChangeAddress = address => {
    setAddress(address);
  };
  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
              setAddress(address);
              setLatitude(lat)
              setLongitude(lng)
            });
  };

  return (
    <div className="home">
      <div className="header">
        <Header></Header>
        <div className="">
          <Container className="mb-3">
            <Row className="align-items-center">
              <Col>
                <div className="page-bg">
                  <div className="border-bottom">
                    <Row className="align-items-center">
                      <Col xs={12} sm={12} md={12} lg={8}>
                        <div className="form-bg2">
                          <h3 className="mt-3 mb-4">Find A Room :</h3>
                          {/* <Formsec formData={(data)=>setFormData(data)} urlData={[{city:city},{location:location}]}></Formsec> */}
                          <Row>
                            <Col xs={12} sm={12} md={6} lg={2}>
                              <Label for="">City</Label>
                              <Input
                                type="select"
                                name="fcity"
                                id="fcity"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              >
                                <option value="">City</option>
                                {cityList != '' && cityList.map((val) => {
                                  return (
                                    <option value={val.cityName}>{val.cityName}</option>
                                  );
                                })
                                }
                              </Input>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={5}>
                            <Label for="">Location</Label>
                              {/* <Input
                                className="search"
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Enter a street, area or city"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                              /> */}
                               <PlacesAutocomplete
                                  onChange={handleChangeAddress}
                                  //onChange={event => setAddress(event.target.value)}
                                  onSelect={handleSelect}
                                  searchOptions={searchOptions}
                                  value={address}
                                  //className="search"
                              >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <input
                          {...getInputProps({
                            placeholder: 'Enter a street, area or city',
                            className: 'form-control search',
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                    )}
                  </PlacesAutocomplete>
                            </Col>

                            <Col xs={12} sm={12} md={6} lg={2}>
                              <Label for="">Gender</Label>
                              <Input
                                type="select"
                                name="fgender"
                                id="fgender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                              >
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </Input>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={2}>
                              <Label for="">Filter</Label>
                              <a className="filter" onClick={toggle}>{buttonLabel}<img src={imagePath.filterImage} alt="image" /></a>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={2}>
                              <button onClick={(e) => filterSubmit(0)} className="black-bt mt-4">Search</button>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Filter</ModalHeader>
                        <ModalBody className="p-4">
                          <Form>
                            <FormGroup>
                              <Label for="exampleCheckbox" className="filter-modal">No of Bedrooms</Label>
                              <div className="filt d-flex justify-content-between flex-wrap">
                                <CustomInput
                                  type="radio"
                                  name="no_bedrooms"
                                  id="no_bedrooms1"
                                  value="2"
                                  checked={bedrooms == 2}
                                  label="2 Bedroom"
                                  onChange={(e) => setBedrooms(e.target.value)}
                                />
                                <CustomInput
                                  type="radio"
                                  name="no_bedrooms"
                                  id="no_bedrooms2"
                                  value="3"
                                  checked={bedrooms == 3}
                                  label="3 Bedroom"
                                  onChange={(e) => setBedrooms(e.target.value)}
                                />
                                <CustomInput
                                  type="radio"
                                  name="no_bedrooms"
                                  id="no_bedrooms3"
                                  value="5"
                                  checked={bedrooms == 5}
                                  label="4+ Bedroom"
                                  onChange={(e) => setBedrooms(e.target.value)}
                                />
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <Label for="exampleCheckbox" className="filter-modal">Listing Amenities</Label>
                              <div className="filt d-flex justify-content-between flex-wrap">
                                {amenitiesList != '' && amenitiesList.map((val) => {
                                  return (
                                    <CustomInput
                                      type="checkbox"
                                      id={val._id}
                                      label={val.name}
                                      name={val.name}
                                      value={val._id}
                                      // checked={checked1}
                                      checked={aminitiesArr.includes(val._id)}
                                      onChange={(e) => createFilterString("amenities", e.target)}
                                    />
                                  );
                                })
                                }
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <Label for="exampleCheckbox" className="filter-modal">Home Rules</Label>
                              <div className="filt d-flex justify-content-between flex-wrap">
                                {houserulesList != '' && houserulesList.map((val) => {
                                  return (
                                    <CustomInput
                                      type="checkbox"
                                      id={val._id}
                                      value={val._id}
                                      label={val.name}
                                      name={val.name}
                                    // checked={houserules == val._id}
                                      checked={houseRuleArr.includes(val._id)}
                                      onChange={(e) => createFilterString("houserules", e.target)}
                                    />
                                  );
                                })
                                }
                              </div>
                            </FormGroup>
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={toggle1}>Reset</Button>{' '}
                          <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                      <Col xs={12} sm={12} md={12} lg={4}>
                        <div className="d-flex align-items-center flex-wrap form-bg2 px-lg-0">
                        
                          <div className="swtich-radio">
                            <input type="radio" className="radioC" name="view" id="swtich1" 
                                  value="listView"
                                  checked={view=="listView"}
                                  onChange={(e) => setView(e.target.value)}
                                  />
                            <label for="swtich1"> <FontAwesomeIcon icon={faList} />  List View</label>
                          </div>
                          <div className="swtich-radio">
                            <input type="radio" className="radioC" name="view" id="swtich2" 
                                    value="mapView"
                                    checked={view=="mapView"}
                                    onChange={(e) => setView(e.target.value)}
                            />
                            <label for="swtich2"><FontAwesomeIcon icon={faMapMarker} />   Map View</label>
                          </div>
                          <div className="swtich-radio">
                            <input type="radio" className="radioC" name="view" id="swtich3" 
                                  value="splitView"
                                  checked={view=="splitView"}
                                  onChange={(e) => setView(e.target.value)}
                              />
                            <label for="swtich3"> <FontAwesomeIcon icon={faColumns} />  Split View</label>
                          </div>
                        
                        </div>
                      </Col>

                    </Row>
                  </div>
                 {/* List view */}
                  {view=="listView"?<div>
                    <Row className="px-2 py-4">
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Searchlist searchList={searchList} show={showList} listCount={listCount} />

                      </Col>
                    </Row>
                </div>:''}
                 {/* map view */}
                {view=="mapView"?<div>
                    <Row className="px-2 py-4">
                      
                      <Col xs={12} sm={12} md={12} lg={12} className="px-4">
                      
                      <GoogleMap
                          properties={searchList}
                          activeInfoWindow={activeInfoWindow}
                          setActiveInfoWindow={setActiveInfoWindow}
                          navToRoomDetailsPage={navToRoomDetailsPage}
                    />
                      </Col>
                    </Row>
                </div>:''}
                {/* split view */}
                {view=="splitView"?<div>
                    <Row className="px-2 py-4">
                      <Col xs={12} sm={12} md={12} lg={7} className="splitView">

                        <Searchlist searchList={searchList} show={showList} listCount={listCount} />

                      </Col>
                      <Col xs={12} sm={12} md={12} lg={5} className="px-4">
                      
                      <GoogleMap
                          properties={searchList}
                          activeInfoWindow={activeInfoWindow}
                          setActiveInfoWindow={setActiveInfoWindow}
                          navToRoomDetailsPage={navToRoomDetailsPage}
                    />
                      </Col>
                    </Row>
                </div>:''}
                 
                  
                  {/* <Row>
                          <Col>
                            <Pageno></Pageno>
                          </Col>
                        </Row> */}
                  <Row>
                    <Col>
                      {searchList && listCount > 0 ?
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={">"}
                          breakLabel={"..."}
                          pageCount={pageCount}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={2}
                          onPageChange={paginationCallFunction}
                          containerClassName={"pagination pagination-sm"}
                          pageLinkClassName={"page-link"}
                          previousLinkClassName={"page-link"}
                          nextLinkClassName={"page-link"}
                          activeClassName={"page-item active"}
                          activeLinkClassName={"page-link"}
                          disabledClassName={"page-item disabled"}
                          breakClassName={"page-item"}
                          breakLinkClassName={"page-link"}

                        />
                        : null}
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
// export default RoomSearch;
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomSearch));


