import React,{useState,useEffect} from 'react';
import './style.css';
import { Container, Row, Col, Navbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import imagePath from '../../../Config/imageConstants';
import Header from '../../Common/header';
import Footer from '../../Common/footer';
import { CONTACTUS_URL } from '../../../shared/allApiUrl';
import { useForm } from "react-hook-form";
import { crudAction } from '../../../store/actions/common';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InputUI from '../../../UI/InputUI';

// export default class Home extends React.Component {
const ContactUs = (props) => {
  const initialFields = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  }
  
  const [fields, setFields] = useState(initialFields);
  const { handleSubmit, register, errors } = useForm();
  useEffect(() => {
    const action = props.contactUs.action;
    setFields({ ...fields, ...props.contactUs.contactUs })
    if (action.isSuccess && action.type === "ADD")
      props.history.push("/success")
  }, [props.contactUs]);

  const onSubmit = (data) => {
    props.crudActionCall(CONTACTUS_URL, data,"ADD");
  }
    
    return (
      <div className="home">
        <div className="header">
          <Header></Header>
            <div className="">
              <Container className="mb-3">
                <Row className="align-items-center">
                  <Col>
                      <div className="page-bg">
                        
                        <Row className="d-flex justify-content-center">
                          <Col xs={12} sm={12} md={12} lg={8} className="contactus how">
                            <h1 className="text-center mb-5">Contact Us</h1>
                            
                            <Form onSubmit={handleSubmit(onSubmit)}>
                              
                                  <Row form>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="exampleEmail">First Name</Label>
                                        <InputUI 
                                        type="text" 
                                        name="firstName" 
                                        placeholder="First Name"
                                        errors={errors}
                                        innerRef={register({
                                          required: 'This is required field',
                                        })}
                                        fields={fields.firstName} 
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="examplePassword">Last Name</Label>
                                        <InputUI
                                        type="text" 
                                        name="lastName" 
                                        placeholder="Last Name"
                                        errors={errors}
                                        innerRef={register({
                                          required: 'This is required field',
                                        })}
                                        fields={fields.lastName} />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                              <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <InputUI
                                type="email" 
                                name="email" 
                                placeholder="Email"
                                errors={errors}
                                innerRef={register({
                                  required: 'This is required field',
                                })}
                                fields={fields.email}/>
                              </FormGroup>
                              <FormGroup>
                                <Label for="exampleAddress">Subject</Label>
                                <InputUI 
                                type="text" 
                                name="subject" 
                                placeholder="Subject"
                                errors={errors}
                                innerRef={register({
                                  required: 'This is required field',
                                })}
                                fields={fields.subject}/>
                              </FormGroup>
                              <FormGroup>
                                <Label for="exampleText">Message</Label>
                                <InputUI 
                                type="textarea" 
                                name="message" 
                                errors={errors}
                                innerRef={register({
                                  required: 'This is required field',
                                })}
                                fields={fields.message}/>
                              </FormGroup>
                              <Button type="submit" className="black-bt mb-3">
                              Submit
                              </Button>
                            </Form>
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
const mapStateToProps = state => {
  const { contactUs } = state;
  return {
    contactUs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CONTACTUS")),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactUs));
