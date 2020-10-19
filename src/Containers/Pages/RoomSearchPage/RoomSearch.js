import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Pageno from '../pageno';
import Formsec from './form-sec';
import Searchlist from './RoomSearchlist';
import Footer from '../../Common/footer';
import { callApi} from '../.../../../../api/index';
import { apiBaseUrl } from "../../../shared/helpers";
import { CITY_URL,AMINITIES_URL,HOUSE_RULE_URL} from '../../../shared/allApiUrl';

const RoomSearch =(props)=>{
  const perPage = 6;
  const [showList, setShowList] = useState(false);
  const [listCount, setListCount] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [pageCount, setPageCount] = useState('');


  useEffect(() => {

    let params = new URLSearchParams(props.location.search);
    let city = params.get('city');
    let moveIn = params.get('moveIn');
    let duration = params.get('duration');
    let budget = params.get('budget');
    let location = params.get('location');
    let bedrooms = params.get('bedrooms');
    let amenities = params.get('amenities');
    let houserules = params.get('houserules');
    let page = params.get('page');
    
    let searchpara;
    if(localStorage.getItem('userId')!=null){
            searchpara = '?city='+city+'&moveIn='+moveIn+'&duration='
                            +duration+'&budget='+budget+'&location='+location+'&bedrooms='
                            +bedrooms+'&amenities='+amenities+'&houserules='
                            +houserules+'&loginUserId='+localStorage.getItem('userId')+'&page='+page+'&perpage='+perPage+'&perpage='+perPage;
    }else{
            searchpara = '?city='+city+'&moveIn='+moveIn+'&duration='
                  +duration+'&budget='+budget+'&location='+location+'&bedrooms='
                  +bedrooms+'&amenities='+amenities+'&houserules='
                  +houserules+'&page='+page+'&perpage='+perPage+'&perpage='+perPage;
          }
                    callApi(apiBaseUrl+"/web/landlord-api/"+searchpara,'GET','').then(
                      response => {
                        let totalpagecount = Math.ceil(response.data.count/perPage);
                        setShowList(true);
                        setListCount(response.data.count);
                        setSearchList(response.data);
                        setPageCount(totalpagecount);
                      }
                    )
    },[props.location.search]);
    console.log("searchList",searchList)
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">  
                        <div className= "border-bottom">
                          <Row className="align-items-center">
                            <Col xs={12} sm={12} md={12} lg={8}>
                                <div className="form-bg2">
                                  <h3 className="mt-3 mb-4">Find A Room :</h3>
                                  <Formsec></Formsec>
                                </div>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={4}>
                                <div className="d-flex align-items-center flex-wrap form-bg2 px-lg-0">
                                  <button className="view-bt m-1 d-sm-block"><img src={imagePath.listviewImage} alt="image"/>List view</button>
                                  <button className="view-bt m-1 d-sm-block"><img src={imagePath.maptviewImage} alt="image"/>Map view</button>
                                  <button className="view-bt m-1 d-sm-block"><img src={imagePath.splitviewImage} alt="image"/>Split view</button>
                                </div>
                            </Col>

                          </Row>
                        </div>
                        
                        <Row className="px-2 py-4">
                          <Col xs={12} sm={12} md={12} lg={7} className="pl-4 pr-0">  

                            <Searchlist searchList={searchList}/>

                          </Col>

                          <Col xs={12} sm={12} md={12} lg={5} className="px-4">
                            <div className="mapview mt-5">
                                <div className=""><img src={imagePath.mapmarkImage} alt="image"/></div>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d659064.2706871205!2d5.572872077027312!3d49.814834630019895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479545b9ca212147%3A0x64db60f602d392ef!2sLuxembourg!5e0!3m2!1sen!2sin!4v1600248985937!5m2!1sen!2sin" width="100%" height="650px" frameborder="0"></iframe>

                            </div>
                          </Col>
                        </Row>

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
export default RoomSearch;