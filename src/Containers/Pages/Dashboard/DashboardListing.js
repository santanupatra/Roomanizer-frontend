import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Button, Table } from 'reactstrap';
import { LIST_AGENT_URL, ADD_PROPERTY } from '../../../shared/allApiUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { getImageUrl, firebaseConfig } from '../../../shared/helpers'
import ReactPaginate from 'react-paginate';
import moment from 'moment';

// import Header from '../../Common/header'
// import LoginFrom from './loginFrom';

import Header from '../../Common/agentHeader'


const DashboardList = (props) => {
  //const perpage = 4;
  const userId = localStorage.getItem('userId')
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [propertyList, setPropertyList] = useState(false);
  const [pageCount, SetPagecount] = useState(0);
  const [perPage, Setperpage] = useState(5);
  const [pageNo, SetpageNo] = useState(0);
  const toggle1 = () => setDropdownOpen(prevState => !prevState);
  const roomId = props.match.params.roomId;


  useEffect(() => {
    getRoomList();
    return () => {
      // cleanup
    }
  }, [roomId]);



  useEffect(() => {
    const { type, isSuccess } = props.room.action;
    if (type === "GET_ALL" && isSuccess)
      setPropertyList(props.room.roomList)
    let totalpagecount = Math.ceil(props.room.roomList.count / perPage);
    SetPagecount(totalpagecount)
  }, [props.room]);


  const getRoomList = () => {

    props.crudActionCall(ADD_PROPERTY + `/interest/${roomId}?perpage=${perPage}&page=${pageNo}`, null, "GET_ALL")
  }

  const viewProfile = (Id) => {
    props.history.push(`/viewProfile/${Id._id}`);

  }
  const paginationCallFunction = (e) => {
    const selectedPage = e.selected;
    props.crudActionCall(ADD_PROPERTY + `/interest/${roomId}?perpage=${perPage}&page=${selectedPage}`, null, "GET_ALL")
    

  }

 
  return (
    <React.Fragment>
      <div className="dashboard">
        <Header />
        <div className="maindata py-4">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} sm={12} md={3} lg={3}>
                <h2>All Applicants</h2>
                {/* <p>Show {props.room && props.room.roomList && props.room.roomList && props.room.roomList.list ? props.room.roomList.list.length : 0} Results</p> */}
              </Col>
             
            </Row>

            {props.room && props.room.roomList && props.room.roomList.list && props.room.roomList.list.length &&
              <div className="table-responsive custm_tbl">
                <Table className="table-borderless table-hover">
                  <thead>
                    <tr>
                      <th width="200">Profile Image</th>
                      <th width="100">Name</th>
                      <th width="100">Gender</th>
                      <th width="150">Age</th>
                      <th width="100">Move Date</th>
                      <th width="100">Duration</th>
                      <th width="100">Budget</th>
                      <th width="100">No's</th>
                      <th width="100">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.room && props.room.roomList && props.room.roomList.list && props.room.roomList.list.length ?
                      props.room.roomList.list.map((propertyItem) => {
                        console.log("propertyItem==",propertyItem);
                        
                        return (
                          <tr key={propertyItem._id}>
                            <td>
                                <div className="propertyDet" onClick={()=>viewProfile(propertyItem.userId)}>
                                  <div className="mr-2"><img src={propertyItem.userId? getImageUrl(propertyItem.userId ? propertyItem.userId.profilePicture : '') : require("../../../assets/images/room-user1.png")} className="propertyImg" alt="" /></div>
                                </div>
                            </td>
                            <td>
                              <a href="#">
                                <div className="stats text-center">
                                  {propertyItem.userId?propertyItem.userId.name:''}
                                </div>
                              </a>
                            </td>
                            <td>
                              <a href="#">
                                <div className="stats text-center">
                                  {propertyItem.roomId?propertyItem.roomId.flateMate:''}
                                </div>
                              </a>
                            </td>
                            <td>
                              <a href="#">
                                <div className="stats text-center">
                                  {propertyItem.userId?propertyItem.userId.age:''}
                                </div>
                              </a>
                            </td>
                            <td>
                              <a href="#">
                                <div className="stats text-center">
                                  {propertyItem.roomId?moment(propertyItem.roomId.moveIn).format("MMM D, YYYY"):''}
                                </div>
                              </a>
                            </td>
                            <td>
                              <a href="#">
                                <div className="stats text-center">
                                  {propertyItem.roomId?propertyItem.roomId.duration:''}
                                </div>
                              </a>
                            </td>
                            <td>
                              <a href="#">
                                <div className="stats text-center">
                                  {propertyItem.roomId?propertyItem.roomId.budget:''}
                                </div>
                              </a>
                            </td>
                            <td width="150">
                              <a href="#">
                                <div className="stats text-center">
                                <ul className="">
                                    {
                                      propertyItem.roomId && propertyItem.roomId.houseRules.length >0 && propertyItem.roomId.houseRules.map((value) => {

                                        return (
                                        <li style={{listStyleType:'lower-roman'}}>{value.label}</li>
                                        )

                                      })
                                    }

                                    {/* <li><a href="#" onClick={()=>goToUserList(propertyItem._id)}><img src={require("../../../assets/images/f2.png")} className="img-fluid" /></a></li> 
                                  <li><a href="/DashboardListing"><img src={require("../../../assets/images/f3.png")} className="img-fluid" /></a></li>*/}
                                    {/* <li><a href="#"><img src={require("../../../assets/images/f4.png")} className="img-fluid" /></a></li>
                                  <li><a href="#"><img src={require("../../../assets/images/f5.png")} className="img-fluid" /></a></li>
                                  <li><a href="#"><img src={require("../../../assets/images/f2.png")} className="img-fluid" /></a></li> */}
                                  </ul>
                                </div>
                              </a>
                            </td>
                            <td>
                              <a href="#">
                                <div className="stats text-center">
                                  {'open interest'}
                                </div>
                              </a>
                            </td>
                            
                          </tr>
                        );
                      })
                      : null}
                    <Row>
                      <Col>
                        {/* //{searchList && listCount > 0 ? */}
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
                        {/* : null} */}
                      </Col>
                    </Row>
                  </tbody>

                </Table>
              </div>
            }
          </Container>
        </div>

      </div>
    </React.Fragment>
  )

}
// export default Dashboard;
// export default withRouter(Dashboard);
const mapStateToProps = state => {
  const { room, agent } = state;
  return {
    room,
    agent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, 'ROOM')),
    crudActionAgentCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, 'AGENT'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardList));