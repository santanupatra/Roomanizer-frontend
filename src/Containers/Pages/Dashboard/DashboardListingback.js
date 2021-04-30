import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Button, Table } from 'reactstrap';
import { ADD_PROPERTY, LIST_AGENTT_URL } from '../../../shared/allApiUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { getImageUrl } from '../../../shared/helpers'
import ReactPaginate from 'react-paginate';
// import Header from '../../Common/header'
// import LoginFrom from './loginFrom';

import Header from '../../Common/agentHeader'
import ListGroupItem from 'reactstrap/lib/ListGroupItem';

const DashboardList = (props) => {
 
  const roomId = props.match.params.roomId;
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pageCount, SetPagecount] = useState(0);
  const [perPage, Setperpage] = useState(2);
  const [pageNo, SetpageNo] = useState(0);
  const toggle1 = () => setDropdownOpen(prevState => !prevState);

  const getUserList = () => {
    props.crudActionCall(ADD_PROPERTY + `/interest/${roomId}?perpage=${perPage}&page=${pageNo}`, null, "GET_ALL")

  }

  useEffect(() => {
    getUserList();
    return () => {
      // cleanup
    }
  }, []);
  const viewProfile = (Id) => {
    props.history.push(`/viewProfile/${Id._id}`);
  }
  return (
    <React.Fragment>
      <div className="dashboard">
        <Header />
        <div className="maindata py-4">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} sm={12} md={12} lg={12}>
                <h2 className="text-center text-black">All Applicants</h2>
              </Col>
            </Row>
            <div className="applicants_row">
              <Row>
                {props.agent && props.agent.agentList && props.agent.agentList.list && props.agent.agentList.list.length ?
                  props.agent.agentList.list.map((value) => {
                    return (
                      <Col xs={12} sm={12} md={12} lg={3}>
                        <div className="custm_Lbox" onClick={()=>viewProfile(value.userId)}>
                          <div className="AgentDP custm_aentdp">
                            <img src={value.userId.profilePicture?getImageUrl(value.userId.profilePicture):require("../../../assets/images/room-user1.png")} className="img-fluid" />
                          </div>
                          <div className="custm_txt">
                              <h6>{value.userId.name}</h6>
                          </div>
                          <h6 className="text-center">User Type : <span>{value.userId.userType == "landlord"?"Landlord":value.userId.userType =='customer'?"Customer":''}</span> </h6>
                        </div>
                      </Col>
                    );
                  })
                  : null}
                {/* <Col xs={12} sm={12} md={12} lg={3}>
                  <div className="custm_Lbox">
                    <div className="AgentDP custm_aentdp">
                      <img src={require("../../../assets/images/room-user1.png")} className="img-fluid" />
                    </div>
                    <div className="custm_txt">
                      <h6>Hanchi Mik</h6>
                    </div>
                    <h6 className="text-center">Gender : <span>Female</span> </h6>
                  </div>
                </Col>

                <Col xs={12} sm={12} md={12} lg={3}>
                  <div className="custm_Lbox">
                    <div className="AgentDP custm_aentdp">
                      <img src={require("../../../assets/images/user-img.png")} className="img-fluid" />
                    </div>
                    <div className="custm_txt">
                      <h6>David Brain</h6>
                    </div>
                    <h6 className="text-center">Gender : <span>Male</span> </h6>
                  </div>
                </Col>

                <Col xs={12} sm={12} md={12} lg={3}>
                  <div className="custm_Lbox">
                    <div className="AgentDP custm_aentdp">
                      <img src={require("../../../assets/images/profile-pic.png")} className="img-fluid" />
                    </div>
                    <div className="custm_txt">
                      <h6>Monika Sans</h6>
                    </div>
                    <h6 className="text-center">Gender : <span>Female</span> </h6>
                  </div>
                </Col> */}
              </Row>
            </div>
            {/* <Row>
              <Col> */}
                {/* //{searchList && listCount > 0 ? */}
                {/* <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  pageCount={2}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  //onPageChange={paginationCallFunction}
                  containerClassName={"pagination pagination-sm"}
                  pageLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"page-item active"}
                  activeLinkClassName={"page-link"}
                  disabledClassName={"page-item disabled"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}

                /> */}
                {/* : null} */}
              {/* </Col>
            </Row> */}
          </Container>
        </div>

      </div>
    </React.Fragment>
  )

}
// export default Dashboard;
// export default withRouter(Dashboard);
const mapStateToProps = state => {
  const { agent } = state;
  return {
    agent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, 'AGENT'))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardList));