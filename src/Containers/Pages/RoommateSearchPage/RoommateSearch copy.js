import React ,{useEffect,useState}from 'react';
import './style.css';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Pageno from '../pageno';
import Formsec from './form-sec';
import Cardbox from './card';
import Footer from '../../Common/footer';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { USER_URL } from '../../../shared/allApiUrl';
import { getImageUrl } from '../../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import { callApi} from '../../../api';
import { apiBaseUrl } from "../../../shared/helpers";


const RoomMateSearch =(props)=> {

  const [searchList, setSearchList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [listCount, setListCount] = useState(0);
  
  const getSearchResult = () => {
    let params = new URLSearchParams(props.location.search);
    let city = params.get('city');
    let occupation = params.get('occupation');
    let gender = params.get('gender');
    let age = params.get('age');
    let location = params.get('location');

    let searchpara = '?city='+city+'&occupation='+occupation+'&gender='+gender+'&age='+age+'&location='+location+'&page=0';

    callApi(apiBaseUrl+"/web/user-api/"+searchpara,'GET','').then(
      response => {
        setShowList(true);
        console.log("parameters",response.data.list);
        setSearchList(response.data.list);
        
      }
    )
  }

  useEffect(() => {

    let params = new URLSearchParams(props.location.search);
    let city = params.get('city');
    let occupation = params.get('occupation');
    let gender = params.get('gender');
    let age = params.get('age');
    let location = params.get('location');

    let searchpara = '?city='+city+'&occupation='+occupation+'&gender='+gender+'&age='+age+'&location='+location+'&page=0';

    callApi(apiBaseUrl+"/web/user-api/"+searchpara,'GET','').then(
      response => {
        setShowList(true);
        setListCount(response.data.count)
        setSearchList(response.data.list);
      }
    )

  },[]);
  

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
                                <Formsec></Formsec>
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