import React,{useState , useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import { VIEWPROFILE_URL } from '../../../shared/allApiUrl';
import { EDITPROFILE_URL } from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import InputUI from '../../../UI/InputUI';
import Facebook from '../facebook';
import Twitter from '../twitter';
import Gsuite from '../gSuite';


const Formsec = (props) => {

  const initialFields = {
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    aboutMe: "",
    readyToMove: null,
    maxBudget: "",
    houseRules:""
  }
  
  const [fields, setFields] = useState(initialFields);
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setUserId(params.userId)
    if (params.userId) props.crudActionCall(`${VIEWPROFILE_URL}/${params.userId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.user.action;
    if (props.user.user && params.userId) {
      setFields({ ...fields, ...props.user.user })
    }
    if (action.isSuccess && action.type === "UPDATE")
      props.history.push(`/viewProfile/${userId}`)

  }, [props.user]);

  const onSubmit = (data) => {
    if (userId) data.userId = userId;
    props.crudActionCall(EDITPROFILE_URL + `/${userId}`, data, "UPDATE");
    props.resetAction();
  }

  const options = [
    { label: "Clean appartment", value: "Clean appartment" },
    { label: "No smoking", value: "No smoking" },
  { label: "Dog friendly", value: "Dog friendly"/*, disabled: true*/ },
  ];
  const  handlechange = selectedOptions => {
    setFields((prevState) => ({ ...prevState, "houseRules": selectedOptions }));
  }
      return (
      <div className="">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup row>
                          <Col sm={12}>
                            
                            <Row>
                              <Col>
                                  <InputUI
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  placeholder="First Name"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={fields}/>
                              </Col>
                              <Col className="pl-0">
                                  <InputUI
                                  type="text"
                                  name="lastName"
                                  id="lastName"
                                  placeholder="Last Name"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={fields}/>
                              </Col>
                            </Row><Row>
                              <Col>
                                  <InputUI
                                  type="date"
                                  name="dateOfBirth"
                                  id="dateOfBirth"
                                  placeholder="Date Of Birth"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={fields}/>
                              </Col>
                              <Col className="pl-0">
                                  <InputUI
                                  type="text"
                                  name="maxBudget"
                                  id="maxBudget"
                                  placeholder="Maximum Budget"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  fields={fields}/>
                              </Col>
                            </Row>
                            <InputUI
                            type="textarea"
                            name="aboutMe"
                            id="aboutMe"
                            placeholder="About Me"
                            errors={errors}
                            innerRef={register({
                             required: 'This is required field',
                            })}
                            fields={fields}/>
                            <InputUI
                            type="date"
                            name="readyToMove"
                            id="readyToMove"
                            placeholder="Ready to Move"
                            errors={errors}
                            innerRef={register({
                             required: 'This is required field',
                            })}
                            fields={fields}/>
                            <br/>
                            <MultiSelect
                            options={options}
                            value={fields.houseRules}
                            onChange={handlechange}
                            labelledBy={"Preferences for house rules"}/>

                            {/* <div className="mt-4">
                              <h6 className="social d-inline-block">Link social media accounts:</h6>
                                  <a href="#" className="pr-2 pl-2"><img src={imagePath.fImage}/></a>
                                  <a href="#" className="pr-2"><img src={imagePath.tImage}/></a>
                                  <a href="#"><img src={imagePath.gImage}/></a>
                            </div> */}
                            <Button type="submit" className="login-bt mt-4 mb-2"> Submit</Button>
                            {/* <img src={imagePath.orImage} alt="image"/>
                            <a href="#" className="login-bt mt-4 mb-2">Submit</a>
                            <img src={imagePath.orImage} alt="image"/>
                            <a href="#"><img src={imagePath.fbImage} alt="image"/></a>
                            <a href="#"><img src={imagePath.gsImage} alt="image"/></a> */}
                          </Col>
                        </FormGroup>
                      </Form>
      </div>
    );
  }
  const mapStateToProps = state => {
    const { user } = state;
    return {
      user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
      resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Formsec));