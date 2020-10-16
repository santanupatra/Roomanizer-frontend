import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Cardbox from './card';
import Footer from '../../Common/footer';
import { withRouter ,useHistory} from "react-router";
import { connect } from 'react-redux';
import { crudAction } from '../../../store/actions/common';
import { FAV_URL} from '../../../shared/allApiUrl';



const RoomMateSearch =(props)=>{
  let loginUserId = props.match.params.userId;
  console.log(props.match.params.userId)



  const getCityList = () => {
    props.crudActionCall(`${FAV_URL}/${loginUserId}`, null, "GET_ALL")
}

 useEffect(() => {
     getCityList();
     return () => {
         // cleanup
     }
 }, []);
 console.log(props.favorite)
 
 console.log(props.favorite.favoriteList)

useEffect(() => {
    const { type, isSuccess } = props.favorite.action;
    if (type === "DELETE" && isSuccess)
        getCityList();
}, [props.favorite]);
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">  
                        <div className= "">
                          <Row>
                            <Col sm={12}>
                                <div className="px-4">
                                  <h3 className="mt-5 mb-0">Favorites Room Mate :</h3>

                                </div>
                            </Col>
                          </Row>
                        </div>
                        
                        <Row className="px-2 py-4">
                        {props.favorite && props.favorite.favoriteList.count > 0 ?
                                props.favorite.favoriteList.list.map((val) => {

                          return (
                          <Col xs={12} sm={12} md={6} lg={4} className="px-4">  
                            <Cardbox val={val}  ></Cardbox>
                          </Col>

                             );
                           })

                           : null}  

                           {/* <Col xs={12} sm={12} md={6} lg={4} className="px-4">  
                             <Cardbox></Cardbox>
                           </Col>

                           <Col xs={12} sm={12} md={6} lg={4} className="px-4">  
                             <Cardbox></Cardbox>
                          </Col> */}

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
  const { favorite } = state;
  return {
    favorite
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "FAVORITE")),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomMateSearch));

//export default RoomMateSearch;