import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Button, Table} from 'reactstrap';
import {LIST_AGENT_URL,LIST_AGENTT_URL} from '../../../shared/allApiUrl';
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

// import Header from '../../Common/header'
// import LoginFrom from './loginFrom';

import Header from '../../Common/agentHeader'
import ListGroupItem from 'reactstrap/lib/ListGroupItem';

const Dashboard = (props) => {
  console.log(props.agent.agentList)
  const userId = localStorage.getItem('userId')
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
const getLandlordList = () => {
  props.crudActionCall(LIST_AGENT_URL +`/${userId}`, null, "GET_ALL")
}

useEffect(() => {
  getLandlordList();
  return () => {
      // cleanup
  }
}, []);
const navToEditPage = (Id) => {
  console.log("52",Id)
  props.history.push(`/AddProperty/${Id}`);
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
                <Col xs={12} sm={12} md={12} lg={3}>
                  <div className="custm_Lbox">
                    <div className="AgentDP custm_aentdp">
                      <img src={require("../../../assets/images/img.jpg")} className="img-fluid"/>
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
                      <img src={require("../../../assets/images/room-user1.png")} className="img-fluid"/>
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
                      <img src={require("../../../assets/images/user-img.png")} className="img-fluid"/>
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
                      <img src={require("../../../assets/images/profile-pic.png")} className="img-fluid"/>
                    </div>
                    <div className="custm_txt">
                      <h6>Monika Sans</h6>
                    </div>
                    <h6 className="text-center">Gender : <span>Female</span> </h6>
                  </div>
                </Col>
              </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));