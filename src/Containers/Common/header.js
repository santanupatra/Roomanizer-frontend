import React,{useState,useEffect} from 'react';
import '../Pages/HomePage/style.css';
import { SETTING_URL } from '../../shared/allApiUrl';

import imagePath from '../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getImageUrl } from '../../shared/helpers';
//import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';
import Navbaar from './Navbar';
import LoginNavbar from './LoginNavbar';
import AgentHeader from './agentHeader';
import { crudAction } from '../../store/actions/common';
import { NavLink, withRouter } from 'react-router-dom';

 const  Header =(props)=> {

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
  
  const params = props.match.params;


  useEffect(() => {
    
    props.crudActionCall(`${SETTING_URL}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.setting.action;

    if (props.setting.setting) {
      setFields({ ...fields, ...props.setting.setting });
      setSettingId(props.setting.setting._id);
     
    }
    

  }, [props.setting]);
   //console.log('propsuser',props);
  const userId = props.user.user && props.user.user._id && props.user.user._id
  // const userToken =  localStorage.getItem('access-token')
  const userType = props.user.user && props.user.user.userType && props.user.user.userType
  // console.log("userId11",localStorage.getItem('access-token'))

        return (
          <div className="header-sec">
            <Container fluid className="mb-3">
              <Row className="align-items-center">
                <Col xs={12} sm={12} md={3} lg={3}>
                  {
                    userType=="agent"?
                  <NavLink to={`/Dashboard/${userId}`}>
                    <img src={getImageUrl(fields.siteLogo)} alt="image"/>
                    {/* <img src={imagePath.LogoImage}  alt="image"/> */}
                  </NavLink>:
                  <NavLink to="/">
                  <img src={getImageUrl(fields.siteLogo)} alt="image"/>
                  {/* <img src={imagePath.LogoImage}  alt="image"/> */}
                </NavLink>
                  }
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>                  
                  {userId 
                  && userType!='agent'
                  ?
                  <LoginNavbar />
                  :
                  <Navbaar />}
                </Col>
              </Row>
            </Container>
            
          </div>
        )
    
}
//export default  Header;
const mapStateToProps = state => {
  const { user ,setting } = state;
  return {
    user,
    setting
  }
}
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "SETTING"))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));