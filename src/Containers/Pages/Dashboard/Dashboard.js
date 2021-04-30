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


const Dashboard = (props) => {
  //const perpage = 4;
  const userId = localStorage.getItem('userId')
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [propertyList, setPropertyList] = useState(false);
  const [pageCount, SetPagecount] = useState(0);
  const [perPage, Setperpage] = useState(1);
  const [pageNo, SetpageNo] = useState(0);
  const [isActive, SetisActive] = useState(true);
  const [isDraft, SetisDraft] = useState(false);
  const [roomName, SetRoomName] = useState('');
  const toggle1 = () => setDropdownOpen(prevState => !prevState);


  useEffect(() => {
    getRoomList(isActive,isDraft);
    return () => {
      // cleanup
    }
  }, [isActive, roomName]);

  useEffect(() => {

    const { type, isSuccess } = props.room.action;
    if (type === "UPDATE" && isSuccess)
      getRoomList();
  }, [props.room]);

  useEffect(() => {
    const { type, isSuccess } = props.room.action;
    if (type === "GET_ALL" && isSuccess)
      setPropertyList(props.room.roomList)
    let totalpagecount = Math.ceil(props.room.roomList.count / perPage);
    SetPagecount(totalpagecount)
  }, [props.room]);


  const setActiveFunction = (isActiveData,draftData) => {

    SetisActive(isActiveData)
    SetisDraft(draftData)
    getRoomList(isActiveData,draftData)
  }
  const getRoomList = (isActiveData,draftData) => {

    props.crudActionCall(ADD_PROPERTY + `?roomName=${roomName}&perpage=${perPage}&page=${pageNo}&isDraft=${draftData}&isActive=${isActiveData}&userId=${userId}`, null, "GET_ALL")
  }



  const statusChange = (roomId, status) => {
    let data = { isActive: status };
    props.crudActionCall(`${ADD_PROPERTY}/status/${roomId}`, data, "UPDATE");
  }

  const navToEditPage = (Id) => {
    props.history.push(`/AddProperty/${Id}`);
  }
  const paginationCallFunction = (e) => {
    const selectedPage = e.selected;
    props.crudActionCall(ADD_PROPERTY + `?roomName=${roomName}&perpage=${perPage}&page=${selectedPage}&isActive=${isActive}&isDraft=${isDraft}&userId=${userId}`, null, "GET_ALL")

  }

  const getPropertyDetails = (propertyId) => {
    props.history.push(`/PropertyDetails/${propertyId}`);
    // props.crudActionAgentCall(`${ADD_PROPERTY}/${propertyId}`, null, "GET_ALL");    
  }
  const goToUserList = (propertyId) => {
    props.history.push(`/DashboardListing/${propertyId}`);
    // props.crudActionAgentCall(`${ADD_PROPERTY}/${propertyId}`, null, "GET_ALL");    
  }
  const searchValueFunc = (data) => {

    SetRoomName(data);
  }
  return (
    <React.Fragment>
      <div className="dashboard">
        <Header searchValueFunc={searchValueFunc} />
        <div className="maindata py-4">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} sm={12} md={3} lg={3}>
                <h2>My Properties</h2>
                {/* <p>Show {props.room && props.room.roomList && props.room.roomList && props.room.roomList.list ? props.room.roomList.list.length : 0} Results</p> */}
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className="filterDashboard text-center">
                  <Button color="white" className={isActive && !isDraft? "active" : ''} onClick={() => setActiveFunction(true,false)}>Active</Button>
                  <Button color="white" className={!isActive && !isDraft ? "active" : ''} onClick={() => setActiveFunction(false,false)}>Offmarket</Button>
                  <Button color="white" className={isDraft ? "active" : ''} onClick={() => setActiveFunction(true,true)}>Drafts</Button>
                </div>
              </Col>
              <Col xs={12} sm={12} md={3} lg={3}>
                <div className="text-lg-right custm_add_proprty">
                  <Button color="blue" href={`/AddProperty`}>Add New Properties</Button>
                </div>
              </Col>
            </Row>

            {props.room && props.room.roomList && props.room.roomList.list && props.room.roomList.list.length &&
              <div className="table-responsive custm_tbl">
                <Table className="table-borderless table-hover">
                  <thead>
                    <tr>
                      <th width="200">Properties</th>
                      <th width="100">Leads</th>
                      <th width="100">Stats</th>
                      <th width="150">Post on</th>
                      <th width="100">Status</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.room && props.room.roomList && props.room.roomList.list && props.room.roomList.list.length ?
                      props.room.roomList.list.map((propertyItem) => {
                        
                        return (
                          <tr key={propertyItem._id}>
                            <td>
                              <a onClick={() => getPropertyDetails(propertyItem._id)}>
                                <div className="propertyDet">
                                  <div className="mr-2"><img src={propertyItem.roomImage && propertyItem.roomImage.length > 0 ? getImageUrl(propertyItem.roomImage ? propertyItem.roomImage[0].image : '') : imagePath.roomImage1} className="propertyImg" alt="" /></div>
                                  <div>
                                    <h6>{propertyItem.roomName}</h6>
                                    <p>{propertyItem.address}</p>
                                    <p>${propertyItem.budget}</p>
                                  </div>
                                </div>
                              </a>
                            </td>
                            <td>
                              <a href="#">
                                {/* 28 till now - 5 hot */}
                                `         <div className="grup_images">
                                  <ul className="custm_list">
                                    {
                                      propertyItem && propertyItem.interestUsers.map((value) => {

                                        return (
                                          <li><a href="#" onClick={() => goToUserList(propertyItem._id)}><img src={getImageUrl(value.profilePicture)} className="img-fluid" /></a></li>
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
                                  <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{ fontSize: '12px' }} className="text-blue" /> {propertyItem.interestUsers.length}</p>
                                  <p>Total Views</p>
                                </div>
                              </a>
                            </td>
                            <td><a href="#"><div className="postdate">{moment(propertyItem.createdDate).format("MMM D")} - {moment(propertyItem.createdDate).format("hh:mm a")}
                              {/* <span>18 days ago</span> */}
                            </div></a></td>
                            <td>
                              <a href="#">
                                <div className="status">
                                  {propertyItem.isActive && !propertyItem.isDraft? <span className="active">Active</span> :!propertyItem.isActive && !propertyItem.isDraft? <span className="inactive">Inactive</span>:<span className="active">Draft</span>}
                                  {/* <p>Till 3 Jun</p> */}
                                </div>
                              </a>
                            </td>
                            <td>
                              {/* <a href="#"> */}
                              <div className="action">
                                <button onClick={() => navToEditPage(propertyItem._id)}><FontAwesomeIcon icon={faEdit} /></button>
                                {!propertyItem.isDraft?<label class="switch">
                                  <input type="checkbox" class="input" onChange={(e) => statusChange(propertyItem._id, propertyItem.isActive ? false : true)} />
                                  <span class="slider round"></span>
                                </label>:''}
                              </div>
                              {/* </a> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));