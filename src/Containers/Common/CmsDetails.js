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
                      <div className="page-bg py-5">  
                        <div className="how">
                        <h1 className="mb-3 text-center">{fields.cmsTitle}</h1>
                          <div className="px-5 py-5">
                            <div contenteditable dangerouslySetInnerHTML={{ __html: fields.cmsContent }} />
                          </div>
                        </div>
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