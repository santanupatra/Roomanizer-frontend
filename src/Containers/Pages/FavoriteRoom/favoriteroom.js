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
import { FAVROOM_URL} from '../../../shared/allApiUrl';

const Home =(props)=>{
  let loginUserId = props.match.params.userId;
  console.log(props.match.params.userId)
 // let loginUserId = localStorage.getItem('userId')


  const getFavRoomList = () => {
    props.crudActionCall(`${FAVROOM_URL}/${loginUserId}`, null, "GET_ALL")
}



 useEffect(() => {
  getFavRoomList();
     return () => {
         // cleanup
     }
 }, []);

 
 console.log(props.favoriteRoom)
 
 console.log(props.favoriteRoom.favoriteroomList)

useEffect(() => {
    const { type, isSuccess } = props.favoriteRoom.action;
    if (type === "DELETE" && isSuccess)
    getFavRoomList();
}, [props.favoriteRoom]);
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
                                  <h3 className="mt-5 mb-0">Favorites Room :</h3>

                                </div>
                            </Col>
                          </Row>
                        </div>
                        
                        <Row className="px-2 py-4">

                        {props.favoriteRoom && props.favoriteRoom.favoriteroomList.count > 0 ?
                               props.favoriteRoom.favoriteroomList.list.map((val) => {

                          return (
                          <Col xs={12} sm={12} md={6} lg={4} className="px-4">  
                            <Cardbox val={val}  getFavRoomList={getFavRoomList} ></Cardbox>
                          </Col>

                             );
                           })

                           : null}
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
  const { favoriteRoom } = state;
  return {
    favoriteRoom
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "FAVORITEROOM")),
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));