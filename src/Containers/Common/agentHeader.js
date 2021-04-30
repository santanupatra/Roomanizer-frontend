import React, { useState, useEffect } from 'react';
import '../Pages/HomePage/style.css';
import { SETTING_URL, USER_URL } from '../../shared/allApiUrl';

import imagePath from '../../Config/imageConstants';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getImageUrl } from '../../shared/helpers';
//import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, Table } from 'reactstrap';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import Navbaar from './Navbar';
import LoginNavbar from './LoginNavbar';
import { crudAction } from '../../store/actions/common';
import { NavLink, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router";

const AgentHeader = (props) => {
  const history = useHistory();
  const initialFields = {
    siteEmail: '',
    siteAddress: '',
    sitePhoneNumber: '',
    instagramUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    pinterestUrl: '',
    distanceRatio: null,
    paymentEnvironment: '',
    siteLogo: null
  }

  const [fields, setFields] = useState(initialFields);
  const [settingId, setSettingId] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle1 = () => setDropdownOpen(prevState => !prevState);
  const params = props.match.params;
  const path = props.match.path
  const userId = localStorage.getItem('userId');
  const profileImg = localStorage.getItem("profileImg");
  const username = localStorage.getItem('username');

  const userToken = localStorage.getItem('access-token')
  useEffect(() => {
    if (path == '/AddProperty' || path == '/AddProperty/:propertyId' || path == '/agentchangePassword/:userId' || path == "/AgentEditProfile/:userId" || path == "/PropertyDetails/:propertyId" || path == "/DashboardListing/:roomId" || path == "/viewProfile/:userId" || path == "/chat") {
      setShowSearch(false)
    }
    props.crudActionCall(`${SETTING_URL}`, null, "GET")
    props.crudActionUserCall(`${USER_URL}/${userId}`, null, "GET")
  }, [params, path]);

  useEffect(() => {
    const action = props.setting.action;

    if (props.setting.setting) {
      setFields({ ...fields, ...props.setting.setting });
      setSettingId(props.setting.setting._id);

    }


  }, [props.setting]);

  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem('userId')
    localStorage.removeItem('userType')
    // this.setState({
    //     Authtoken: '',
    //   });
    toast.info("Sucessfully logout", {
      position: toast.POSITION.TOP_LEFT
    });

    history.push('/home')
  }
  const searchfunc = (e) => {
    setSearchValue(e.target.value)
  }
  const searchValuePass = (data) => {
    props.searchValueFunc(data);
  }

  return (
    <div className="header-sec agent-header">
      {/* <Container className="mb-3">
              <Row className="align-items-center">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <NavLink to="/">
                    <img src={getImageUrl(fields.siteLogo)} href="/" alt="image"/>
                    
                  </NavLink>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  {userId?<LoginNavbar />:<Navbaar />}
                </Col>
              </Row>
            </Container> */}

      <Container>
        <Row className="align-items-center">
          <Col xs={12} sm={12} md={4} lg={4}><a href={`/Dashboard`}><img src={getImageUrl(fields.siteLogo)} alt="logo" /></a></Col>

          <Col xs={12} sm={12} md={8} lg={8}>
            <div className="cust_hdr">
              {showSearch ?
                <div className="searchbox custm_srch1 show_off_Srch">
                  <input type="text" placeholder="Search by name..." value={searchValue} onChange={(e) => searchfunc(e)} />
                  <button><FontAwesomeIcon icon={faSearch} onClick={() => searchValuePass(searchValue)} /></button>
                </div> : ''

              }

              <div className="text-right">
                <Dropdown isOpen={dropdownOpen} toggle={toggle1}>
                  <DropdownToggle className="login-hd custm_Login">
                    <img src={getImageUrl(profileImg)} href="/" alt="image" className="custm_img" />
                    {props.user.user && props.user.user.firstName ? props.user.user.lastName ? `${props.user.user.firstName} ${props.user.user.lastName}` : `${props.user.user.firstName} ` : "User Name"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link to={`/AgentEditProfile/${userId}`}>My Account</Link>
                    <Link to={`/agentchangePassword/${userId}`}>Settings</Link>
                    <Link to={`/chat`}>Chat</Link>
                    <Link to="#" onClick={logout}>Logout</Link>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>
      </Container>


    </div>
  )

}
//export default  Header;
const mapStateToProps = state => {
  const { user, setting } = state;
  return {
    user,
    setting
  }
}
const mapDispatchToProps = dispatch => {
  return {
    crudActionUserCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "SETTING"))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AgentHeader));