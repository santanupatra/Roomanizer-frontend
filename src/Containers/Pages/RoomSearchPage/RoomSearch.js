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

const RoomSearch = (props) => {
  const perPage = 3;
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
  // const [houserules, setHouserules] = useState('');
  const [page, setPage] = useState('');
  const [gender, setGender] = useState('');
  const [cityList, setCityList] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [houserulesList, setHouseRulesList] = useState([]);
  const [formData, setFormData] = useState('');
  const [checkedBoxess, setCheckedBoxes] = useState([]);

  // const [amenities, setAmenities] = useState('');
  // const [houserules, setHouseRules] = useState('');
  const [houserules, setHouseRules] = useState('');
  const [address, setAddress] = useState('');

  const history = useHistory();

  // useEffect(() => {

  //   let params = new URLSearchParams(props.location.search);
  //   let city = params.get('city');
  //   let moveIn = params.get('moveIn');
  //   let duration = params.get('duration');
  //   let budget = params.get('budget');
  //   let location = params.get('location');
  //   let bedrooms = params.get('bedrooms');
  //   let amenities = params.get('amenities');
  //   let houserules = params.get('houserules');
  //   let page = params.get('page');
  //   setCity(city);
  //   setMoveIn(moveIn);
  //   setDuration(duration);
  //   setBudget(budget);
  //   setLocation(location);
  //   setBedrooms(bedrooms);
  //   setAmenities(amenities);
  //   setHouserules(houserules);
  //   setPage(page);

  //   let searchpara;
  //   if(localStorage.getItem('userId')!=null){
  //           searchpara = '?city='+city+'&moveIn='+moveIn+'&duration='
  //                           +duration+'&budget='+budget+'&location='+location+'&bedrooms='
  //                           +bedrooms+'&amenities='+amenities+'&houserules='
  //                           +houserules+'&loginUserId='+localStorage.getItem('userId')+'&page='+page+'&perpage='+perPage;
  //   }else{
  //           searchpara = '?city='+city+'&moveIn='+moveIn+'&duration='
  //                 +duration+'&budget='+budget+'&location='+location+'&bedrooms='
  //                 +bedrooms+'&amenities='+amenities+'&houserules='
  //                 +houserules+'&page='+page+'&perpage='+perPage;
  //         }
  //                   callApi(apiBaseUrl+"/web/landlord-api/"+searchpara,'GET','').then(
  //                     response => {
  //                       let totalpagecount = Math.ceil(response.data.count/perPage);
  //                       setShowList(true);
  //                       setListCount(response.data.count);
  //                       setSearchList(response.data.list);
  //                       setPageCount(totalpagecount);
  //                     }
  //                   )
  //   },[props.location.search]);
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
    let latitude = params.get('lat');
    let longitude = params.get('lng');
    // let longitude = params.get('lng');
    let address = params.get('location');



    setGender(gender);
    setCity(city);
    // setOccupation(occupation);
    // setAge(age);
    setBedrooms(bedrooms);
    setAmenities(amenities);
    setAddress(address)
    let searchpara;
    if (localStorage.getItem('userId') != null) {
      searchpara = '?city=' + city +
        '&location=' + address +
        '&gender='
        + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
        // '&age='+age+'&lat='+latitude+'&lng='+longitude+
        '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&loginUserId=' + localStorage.getItem('userId') + '&page=' + page + '&perpage=' + perPage;
    } else {
      searchpara = '?city=' + city +
        '&location=' + address +
        '&gender=' + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
        //  '&age='+age+'&lat='+latitude+'&lng='+longitude+
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
  // console.log("asmita====",formData)
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
  // if(formData.isSearch == true){
  //   if(formData.city !=''){
  //     setCity(formData.city);
  //   }
  //   if(formData.address !=''){
  //     setLocation(formData.address);
  //   }

  // }
  //  useEffect(() => {
  //     let searchpara;
  //     if(formData.isSearch == true){
  //       if(formData.city !=''){
  //         setCity(formData.city);
  //       }
  //       if(formData.address !=''){
  //         setLocation(formData.address);
  //       }


  //   if(localStorage.getItem('userId')!=null){
  //           searchpara = '?city='+city+'&moveIn='+moveIn+'&duration='
  //                           +duration+'&budget='+budget+'&location='+location+'&bedrooms='
  //                           +bedrooms+'&amenities='+amenities+'&houserules='
  //                           +houserules+'&loginUserId='+localStorage.getItem('userId')+'&page='+page+'&perpage='+perPage;
  //   }else{
  //           searchpara = '?city='+city+'&moveIn='+moveIn+'&duration='
  //                 +duration+'&budget='+budget+'&location='+location+'&bedrooms='
  //                 +bedrooms+'&amenities='+amenities+'&houserules='
  //                 +houserules+'&page='+page+'&perpage='+perPage;
  //         }

  //          console.log("searchpara==",searchpara)
  //         // props.history.push('/roomSearch/'+searchpara);
  //         // window.location.reload();

  //                   callApi(apiBaseUrl+"/web/landlord-api/"+searchpara,'GET','').then(
  //                     response => {
  //                       let totalpagecount = Math.ceil(response.data.count/perPage);
  //                       setShowList(true);
  //                       setListCount(response.data.count);
  //                       setSearchList(response.data.list);
  //                       setPageCount(totalpagecount);
  //                     }
  //                   )
  //     }
  //    },[formData.isSearch==true])
  const filterSubmit = (page) => {
    console.log(address)
    setShowList(false);
    let params = new URLSearchParams(props.location.search);
    // let flocation = '';
    //let location = params.get('location');
    let latitude = params.get('lat');
    let longitude = params.get('lng');

    if (localStorage.getItem('userId') != null) {
      let searchpara = '?city=' + city +
        '&location=' + address +
        '&gender='
        + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
        // '&age='+age+
        '&lat=' + latitude + '&lng=' + longitude + '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&loginUserId=' + localStorage.getItem('userId') + '&page=' + page + '&perpage=' + perPage;

      history.push('/roomSearch/' + searchpara);
      window.location.reload();
    } else {

      let searchpara = '?city=' + city +
        '&location=' + address +
        '&gender=' + gender + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget +
        // '&age='+age+
        '&lat=' + latitude + '&lng=' + longitude + '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&page=' + page + '&perpage=' + perPage;

      history.push('/roomMateSearch/' + searchpara);
      window.location.reload();
    }

  }
  const paginationCallFunction = (e) => {
    const selectedPage = e.selected;
    setShowList(false);
    let params = new URLSearchParams(props.location.search);
    // let flocation = '';
    let location = params.get('location');

    let searchpara
    if (localStorage.getItem('userId') != null) {
      searchpara = '?city=' + city + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget + '&location=' + location + '&bedrooms='
        + bedrooms + '&amenities=' + amenities + '&houserules='
        + houserules + '&loginUserId=' + localStorage.getItem('userId') + '&page=' + selectedPage + '&perpage=' + perPage;
    } else {
      searchpara = '?city=' + city + '&moveIn=' + moveIn + '&duration='
        + duration + '&budget=' + budget + '&location=' + location + '&bedrooms='
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

    // var checked = e.target.checked;
    console.log(e.target.checked)
    if (name == "amenities") {
      if (amenities) {
        setAmenities(amenities + ',' + e.target.value);
        setChecked( e.target.checked?e.target.value:'')
      } else {
        setAmenities(e.target.value);
      }
    }
    if (name == "houserules") {
      // console.log("houserules===>", houserules)
      if (houserules) {
        setHouseRules(houserules + ',' + e.target.value, e.target.checked);
        // setChecked( e.target.checked)
      } else {
        setHouseRules(e.target.value);
      }
    }
  }
  const toggle1 = () => {
    setModal(!modal)
    setAmenities('');
    setHouseRules('');
    setBedrooms('')
    // window.location.reload();
  };
  console.log("houserules",houserules)
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
                              <Input
                                className="search"
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Enter a street, area or city"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                              />
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
                                      checked={amenities===val._id}
                                      onChange={(e) => createFilterString("amenities", e)}
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
                                      checked={houserules === val._id}
                                      onChange={(e) => createFilterString("houserules", e)}
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
                          <button className="view-bt m-1 d-sm-block"><img src={imagePath.listviewImage} alt="image" />List view</button>
                          <button className="view-bt m-1 d-sm-block"><img src={imagePath.maptviewImage} alt="image" />Map view</button>
                          <button className="view-bt m-1 d-sm-block"><img src={imagePath.splitviewImage} alt="image" />Split view</button>
                        </div>
                      </Col>

                    </Row>
                  </div>

                  <Row className="px-2 py-4">
                    <Col xs={12} sm={12} md={12} lg={7} className="pl-4 pr-0">

                      <Searchlist searchList={searchList} show={showList} listCount={listCount} />

                    </Col>

                    <Col xs={12} sm={12} md={12} lg={5} className="px-4">
                      <div className="mapview mt-5">
                        <div className=""><img src={imagePath.mapmarkImage} alt="image" /></div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d659064.2706871205!2d5.572872077027312!3d49.814834630019895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479545b9ca212147%3A0x64db60f602d392ef!2sLuxembourg!5e0!3m2!1sen!2sin!4v1600248985937!5m2!1sen!2sin" width="100%" height="650px" frameborder="0"></iframe>

                      </div>
                    </Col>
                  </Row>

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


