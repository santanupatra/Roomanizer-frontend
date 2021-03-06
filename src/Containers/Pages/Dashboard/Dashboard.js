import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Button, Table} from 'reactstrap';
import {LIST_AGENT_URL,ADD_PROPERTY} from '../../../shared/allApiUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { toast  } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import {getImageUrl,firebaseConfig} from '../../../shared/helpers'
import ReactPaginate from 'react-paginate';

// import Header from '../../Common/header'
// import LoginFrom from './loginFrom';

import Header from '../../Common/agentHeader'
import ListGroupItem from 'reactstrap/lib/ListGroupItem';

const Dashboard = (props) => {
  console.log('propsroomList',props)
  //const perpage = 4;
  const userId = localStorage.getItem('userId')
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [propertyList, setPropertyList] = useState(false);
  const [pageCount, SetPagecount] = useState(0);
  const [perPage, Setperpage] = useState(2);
  const [pageNo, SetpageNo] = useState(0);
  const toggle1 = () => setDropdownOpen(prevState => !prevState);
  const logout = () =>{
    localStorage.removeItem("access-token");
    localStorage.removeItem('userId')
    // this.setState({
    //     Authtoken: '',
    //   });
      toast.info("Sucessfully logout", {
        position: toast.POSITION.TOP_LEFT
        });
          
    history.push('/')
} 
const getRoomList = () => {
  props.crudActionCall(ADD_PROPERTY + `?perpage=${perPage}&page=${pageNo}&isActive=true&userId=${userId}`, null, "GET_ALL")
}

useEffect(() => {
  getRoomList();
  return () => {
      // cleanup
  }
}, []);

useEffect(() => {
  const { type, isSuccess } = props.room.action;
  if (type === "UPDATE" && isSuccess)
      getRoomList();
}, [props.room]);
useEffect(() => {
  const { type, isSuccess } = props.room.action;
  if (type === "GET_ALL" && isSuccess)
  setPropertyList(props.room.roomList)
  let totalpagecount = Math.ceil(props.room.roomList.count/perPage);
  SetPagecount(totalpagecount)
}, [props.room]);


const navToViewPage = (roomId) => {
  props.history.push(`/room/details/${roomId}`);
}
const statusChange = (roomId,status) => {
   let data = {isActive:status};
    props.crudActionCall(`${ADD_PROPERTY}/status/${roomId}`,data, "UPDATE");
}
   console.log("52",props)

const navToEditPage = (Id) => {
  console.log("52",Id)
  props.history.push(`/AddProperty/${Id}`);
}
const paginationCallFunction = (e) => {
  const selectedPage = e.selected;
  props.crudActionCall(ADD_PROPERTY + `?perpage=${perPage}&page=${selectedPage}&isActive=true&userId=${userId}`, null, "GET_ALL")
  
}
    return (
      <React.Fragment>
        <div className="dashboard">
        <Header />
        <div className="maindata py-4">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} sm={12} md={3} lg={3}>
                <h2>My Properties</h2>
                <p>Show {propertyList?propertyList.list.length:0} Results</p>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className="filterDashboard text-center">
                  <Button color="white" className="active">Active</Button>
                  <Button color="white">Offmarket</Button>
                  <Button color="white">Drafts</Button>
                </div>
              </Col>
              <Col xs={12} sm={12} md={3} lg={3}>
                <div className="text-lg-right custm_add_proprty">
                  <Button color="blue" href={`/AddProperty/${userId}`}>Add New Properties</Button>
                </div>
              </Col>
            </Row>

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
                {/* <tr>
                  <td>
                    <a href="#">
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                    </a>
                  </td>
                  <td>
                  <a href="#">
                    28 till now - 5 hot
                    <div className="grup_images">
                      <ul className="custm_list">
                        <li><a href="#"><img src={require("../../../assets/images/f2.png")} className="img-fluid"/></a></li>
                        <li><a href="#"><img src={require("../../../assets/images/f3.png")} className="img-fluid"/></a></li>
                        <li><a href="#"><img src={require("../../../assets/images/f4.png")} className="img-fluid"/></a></li>
                        <li><a href="#"><img src={require("../../../assets/images/f5.png")} className="img-fluid"/></a></li>
                        <li><a href="#"><img src={require("../../../assets/images/f2.png")} className="img-fluid"/></a></li>
                      </ul>
                    </div>
                    </a>
                  </td>
                  <td>
                  <a href="#">
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                    </a>
                  </td>
                  <td><a href="#"><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></a></td>
                  <td>
                    <a href="#">
                    <div className="status">
                      <span className="active">Active</span>
                      <p>Till 3 Jun</p>
                    </div>
                    </a>
                  </td>
                  <td>
                    <a href="#">
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    </a>
                  </td>
                </tr> */}
                
                {propertyList && propertyList.list.length > 0 ?
                      propertyList.list.map((val) => {
                        console.log("val===",val)
                 return (
                <tr>
                  <td>
                    <a href="#">
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                    </a>
                  </td>
                  <td>
                  <a href="#">
                    28 till now - 5 hot
                    <div className="grup_images">
                      <ul className="custm_list">
                        <li><a href="#"><img src={require("../../../assets/images/f2.png")} className="img-fluid"/></a></li>
                        <li><a href="#"><img src={require("../../../assets/images/f3.png")} className="img-fluid"/></a></li>
                        <li><a href="#"><img src={require("../../../assets/images/f4.png")} className="img-fluid"/></a></li>
                        <li><a href="#"><img src={require("../../../assets/images/f5.png")} className="img-fluid"/></a></li>
                        <li><a href="#"><img src={require("../../../assets/images/f2.png")} className="img-fluid"/></a></li>
                      </ul>
                    </div>
                    </a>
                  </td>
                  <td>
                  <a href="#">
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                    </a>
                  </td>
                  <td><a href="#"><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></a></td>
                  <td>
                    <a href="#">
                    <div className="status">
                      <span className="active">Active</span>
                      <p>Till 3 Jun</p>
                    </div>
                    </a>
                  </td>
                  <td>
                    <a href="#">
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" onChange={(e)=>statusChange(val._id,false)}/>
                        <span class="slider round"></span>
                      </label>
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

          </Container>
        </div>

        </div>
      </React.Fragment>
    )
  
}
// export default Dashboard;
// export default withRouter(Dashboard);
const mapStateToProps = state => {
  const { room } = state;
  return {
      room
  }
}

const mapDispatchToProps = dispatch => {
  return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, 'ROOM'))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));