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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
// import 'moment-timezone';

const Formsec = (props) => {
  
  const initialFields = {
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    aboutMe: "",
    readyToMove: null,
    maxBudget: "",
    houseRules:"",
    age: "",
    gender: "",
    occupation: ""
  }
  
  const [fields, setFields] = useState(initialFields);
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  const [setDate, setStartDate] = useState(new Date());
  const [setRtoM, setReadyToMove] = useState(null);
 
  useEffect(() => {
    setUserId(params.userId)
    if (params.userId) props.crudActionCall(`${VIEWPROFILE_URL}/${params.userId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.user.action;
    if (props.user.user && params.userId) {
      setFields({ ...fields, ...props.user.user })
      setStartDate(moment(props.user.user.dateOfBirth).toDate())
      setReadyToMove(moment(props.user.user.readyToMove).toDate())
    }
    if (action.isSuccess && action.type === "UPDATE")
      props.history.push(`/editProfile/${userId}`)
  }, [props.user]);

  const onSubmit = (data) => {
    if (userId) data.userId = userId;
    if (setDate) data.dateOfBirth = setDate;
    if (setRtoM) data.readyToMove = setRtoM;
    if (fields.houseRules) data.houseRules=fields.houseRules
    props.crudActionCall(EDITPROFILE_URL + `/${userId}`, data, "UPDATE");
    props.resetAction();
  }

  const options = [
    { label: "Clean appartment", value: "1" },
    { label: "No smoking", value: "2" },
    { label: "Dog friendly", value: "3" /*, disabled: true*/ },
  ];
  const handleChange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
  const  handlechange = value => {
    setFields((prevState) => ({ ...prevState, "houseRules": value }));
  }
  const  handleDatechange = date => {
    setStartDate(date);
    var diff_ms = Date.now() - date.getTime();
    var age_dt = new Date(diff_ms);
    var realAge = Math.abs(age_dt.getUTCFullYear() - 1970);
    setFields((prevState) => ({ ...prevState, "age": realAge }));
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
                            </Row>
                            <Row>
                              <Col>
                                <div className="form-group mt-4">
                                  <DatePicker 
                                  selected={setDate} 
                                  className="form-control"
                                  placeholderText="Date of Birth"
                                  onChange={date => handleDatechange(date)}
                                  // value={fields.dateOfBirth}
                                  />
                              </div>
                              </Col>
                              <Col className="pl-0">
                                  <InputUI
                                  type="number"
                                  name="age"
                                  placeholder="Age"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={fields.age}/>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
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
                              <Col className="pl-0">
                                  <InputUI
                                  type="select"
                                  name="gender"
                                  id="gender"
                                  placeholder="Gender"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={fields.gender}
                                  onChange={(e) =>
                                    handleChange(e.target.name, e.target.value)
                                  }
                                  >
                                  <option>Choose your gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                  </InputUI>

                              </Col>
                            </Row>
                            <InputUI
                                  type="select"
                                  name="occupation"
                                  id="occupation"
                                  placeholder="occupation"
                                  errors={errors}
                                  innerRef={register({
                                  required: 'This is required field',
                                  })}
                                  value={fields.occupation}
                                  onChange={(e) =>
                                    handleChange(e.target.name, e.target.value)
                                  }
                                  >
                                  <option>Choose your occupation</option>
                                  <option value="Student">Student</option>
                                  <option value="Engineer">Engineer</option>
                                  <option value="Other">Other</option>
                            </InputUI>
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

                            <div className="form-group my-4 py-2">
                              <DatePicker 
                                selected={setRtoM} 
                                className="form-control"
                                placeholderText="Ready to Move"
                                onChange={e => setReadyToMove(e)} 
                              />
                            </div>

                            <MultiSelect
                            options={options}
                            value={fields.houseRules}
                            onChange={(value) =>
                              handlechange(value) 
                            }
                            // onChange={handlechange}
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