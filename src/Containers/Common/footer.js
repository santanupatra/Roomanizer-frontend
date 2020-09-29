import React, { useEffect, useState } from 'react'
import '../Pages/HomePage/style.css';
import imagePath from '../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SETTING_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



function Footer(props) {
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
   
  
        
      
  
  
    return (
      
          <div className="footer-bg">
          <div className="footer-sec">
            <Container className="">
              <Row className="pt-5">
                <Col sm={4}></Col>
                <Col sm={5} className="footer-link">
                  <h6>Contact</h6>
                  <a href="/contact">Contact Support | </a>
                  <a href="#"> Help Center | </a>
                  <a href="#">Terms and Policies</a>
                </Col>
                <Col sm={3}>
                  
                  <div className="mt-3">
                    <img src={imagePath.footerlogoImage} alt="image"/>
                    
                    <div className="social-ft mt-2">
                    
                      <a href= {fields.twitterUrl}> <img src={imagePath.ft1Image} alt="image"/></a>
                      <a href={fields.pinterestUrl}> <img src={imagePath.ft2Image} alt="image"/></a>
                      <a href= {fields.facebookUrl}> <img src={imagePath.ft3Image} alt="image"/></a>
                      <a href={fields.instagramUrl}> <img src={imagePath.ft4Image} alt="image"/></a>
                    
                       </div>
                  </div>
                </Col>

              </Row>
            </Container>
            </div>
          </div>
          )
    
}
const mapStateToProps = state => {
  const { setting } = state;
  return {
    setting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "SETTING"))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Footer));