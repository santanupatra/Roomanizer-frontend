import React ,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import './style.css';
import imagePath from '../../Config/imageConstants';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Common/header';
import Footer from '../Common/footer';

import { CMS_URL } from "../../shared/allApiUrl";
import {axiosApiCall} from "../../api/index";

const CmsDetails = (props) =>{
    
  const initialFields = {
    cmsTitle: "",
    cmsContent: "",
  }
  const [fields, setFields] = useState(initialFields);
  const [SlugId, setSlugId] = useState(null);

  
  
  useEffect(() => {
  const  cmsDetail = async()=>{
    if (props.match.params.SlugId ) {
      let  {data}  = await axiosApiCall.get(`${CMS_URL}/${props.match.params.SlugId}`, null)
     
        setFields({ ...fields, ...data.data[0] })
        console.log(data)
        console.log(data.data[0])
     
    }
  }
    cmsDetail()
  }, [props.match.params.SlugId])
  return(
    
        <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">  
                        <div className="how">

                          <Row className="px-5 py-5">
                            <Col sm={7}>
                                <div>
                                  <h2 className="mt-5 mb-3">{fields.cmsTitle}</h2>
                                  <h6>{fields.cmsContent} </h6>
                                    
                                </div>
                            </Col>
                            <Col sm={5} className="pt-5 mt-2">
                              <img src={imagePath.how1Image} alt="image"/>
                            </Col>
                          </Row>

                          <Row className="px-5">
                            <Col sm={5} className="">
                              <img src={imagePath.how2Image} alt="image"/>
                            </Col>
                            <Col sm={7}>
                                
                            </Col>
                          </Row>

                        </div>
                        
                        <Row className="px-2 py-4">

                          <Col sm={4} className="px-4">  

                          </Col>


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
export default CmsDetails;