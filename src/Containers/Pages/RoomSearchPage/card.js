import React, { useState } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faShareAlt, } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card, CardImg, CardBody, CardFooter,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { Button, Modal } from 'react-bootstrap';
import { withRouter, useHistory } from "react-router";
import { connect } from 'react-redux';
import { crudAction } from '../../../store/actions/common';
import { FAV_URL } from '../../../shared/allApiUrl';
import { useForm } from "react-hook-form";
import { login } from "../../../store/actions/auth";
import { NavLink } from 'reactstrap';
import { Form, FormGroup, Input} from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { getImageUrl } from '../../../shared/helpers';
import { toast } from 'react-toastify';
import { callApi } from "../../../api";
import { FORGET_PASSWORD_URL } from '../../../shared/allApiUrl';
import { SET_PASSWORD_URL } from '../../../shared/allApiUrl';
import { Link } from "react-router-dom";

const Cardbox = (props) => {
  console.log("Cardbox", props.val)
  const roomData = props.val;

  const { handleSubmit, register } = useForm();
  const [status, setStatus] = useState(false);

  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowForget = () => setShoww(true);
  const handleCloseForget = () => setShoww(false);

  const history = useHistory();
  console.log(localStorage.getItem('userId'))
  const [fav, setFav] = useState(false);
  const onSubmit = (data) => {
    props.loginApiCall(data);
    handleClose();
    props.history.push("/roomSearch/?city=&moveIn=&duration=&budget=&location=&bedrooms=&amenities=&houserules=&page=0");
    //handleClose();
    // setTimeout(function() {
    //   window.location.reload();
    // }, 1000)
  };
  const clickToSignup = () => {
    props.history.push('/signUP')
  }
  const onSubmitForget = async (data) => {
    console.log(data)
    if (status === false) {
      try {
        await callApi(FORGET_PASSWORD_URL, "POST", data);
        setStatus(true);
        toast.info('Email Verified', {
          position: toast.POSITION.TOP_CENTER
        });
      }
      catch (error) {
        toast.error("Email is not valid!", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
    else if (data.password != data.confirmPassword) {
      toast.error("Password and Confirm_Password not match!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    else {
      try {
        await callApi(SET_PASSWORD_URL, "PUT", data);
        console.log(data)
        toast.info('Password changed succesfully!', {
          position: toast.POSITION.TOP_CENTER
        });

        props.history.push("/roomSearch/?city=&moveIn=&duration=&budget=&location=&bedrooms=&amenities=&houserules=&page=0");
        handleCloseForget()
      }
      catch (error) {
        console.log("Error");
        toast.error("OTP  is not valid!", {
          position: toast.POSITION.TOP_CENTER
        });
      }

    }
  }
  const clickToOutLineHeart = () => {
    if (localStorage.getItem('userId') == null) {
      handleShow();

    } else {
      let a = true

      const data = {
        loginUserId: localStorage.getItem('userId'),
        roomId: val._id,
        // type :    "roomMate"    ,
      }
      console.log(data)
      props.crudActionCall(FAV_URL, data, "ADD");
      setFav(a)
    }
  }
  const clickToSolidHeart = () => {
    const a = false
    const data = {
      loginUserId: localStorage.getItem('userId'),
      roomId: val._id,
      type: "room",
    }
    console.log(data)
    props.crudActionCall(FAV_URL, data, "ADD");
    setFav(a)

  }
  const val = (props.val)
  console.log(val, "fav")

  return (

    <Card className="mt-5">
      <div className="">
        <div className="roomPic">
        <Link to={`/roomRent/${val.user_Id._id}`}
        >
          <CardImg className="roomimg" top width="100%" src={roomData.roomImage && roomData.roomImage.length > 0 ? getImageUrl(roomData.roomImage[0] ? roomData.roomImage[0].image : '') : imagePath.roomImage1} alt="Card image cap" />
          </Link>
          
        </div>
        
        <div className="roomuser">
          
            <img src={roomData.user_Id && roomData.user_Id.profilePicture ? getImageUrl(roomData.user_Id.profilePicture) : imagePath.roomuserImage} alt="image" />
          
          {/* <a href="#"><img src={imagePath.userfbImage} alt="image"/></a> */}
        </div>

      </div>
      <CardBody className="px-3 py-2">
        <div className="">
          <CardTitle>{roomData ? roomData.roomName : "...."}</CardTitle>
          <CardSubtitle className="d-flex"><img src={imagePath.mappinImage} alt="image" style={{width:'18px', height:'18px', marginRight:'10px'}} /><p className="text-management" title={roomData.address ? roomData.address : "......"}>{roomData.address ? roomData.address : "......"}</p></CardSubtitle>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <h6><img src={imagePath.bedImage} className="pr-2" alt="image" />{roomData.noOfBedRoom ? roomData.noOfBedRoom : 'No bedroom'}</h6>
          <CardSubtitle><img src={imagePath.areaImage} className="pr-2" alt="image" />{roomData.area ? roomData.area : "0"} sq ft</CardSubtitle>
        </div>
      </CardBody>
      <CardFooter className="">

        <div className="d-flex justify-content-between">
          <div className="py-2"><h6 className="org">{roomData.charges ? '$' + roomData.charges + '/' + roomData.chargesType : 'No charges'}</h6></div>
          {/* <div className="border-left border-right p-2"><FontAwesomeIcon color="red" icon={faHeart} /></div> */}
          {(val.isFav || fav) || (val.isFav && fav) ?
            <div className="border-left border-right p-2"><button type="checkbox" onClick={clickToSolidHeart} className="wishlistbtn"><img src={imagePath.heartsolid} /></button></div>
            : <div className="border-left border-right p-2"><Button type="checkbox" onClick={clickToOutLineHeart} className="wishlistbtn"><img src={imagePath.heartoutLine} /></Button></div>
          }
          <div className="py-2"><FontAwesomeIcon icon={faShareAlt} /></div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form >
                <FormGroup row>
                  <Col sm={12}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="username"
                      innerRef={register}
                      required
                    />
                    <Input
                      style={{ marginTop: "20px" }}
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      innerRef={register}
                      required
                    />
                    <a className="forgot" onClick={handleShowForget}><p>Forgot Password?</p></a>
                    <Modal show={showw} onHide={handleCloseForget}>
                      <Modal.Header closeButton>
                        <Modal.Title> <h1>Forget Password</h1></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form >
                          <p className="text-muted">Please put your Email</p>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="email"
                              name="email"
                              placeholder="Email"
                              disabled={status}
                              autoComplete="username"
                              innerRef={register}
                              required
                            />
                          </InputGroup>
                          {status ? <> <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              name="otp"
                              placeholder="O.T.P"
                              autoComplete="current-password"
                              innerRef={register}
                              required
                            />
                          </InputGroup>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="password"
                                name="password"
                                placeholder="New Password"
                                //   autoComplete="current-password"
                                innerRef={register}
                                required
                              />
                            </InputGroup>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                // autoComplete="current-password"
                                innerRef={register}
                                required
                              />
                            </InputGroup> </> : null}
                          <Row>
                            <Col xs="3">
                              <Button variant="secondary" onClick={handleClose}>Close</Button>
                            </Col>
                            <Col xs="3">
                              <Button type="button" onClick={handleSubmit(onSubmitForget)} style={{ marginLeft: "236px" }} color="primary" className="px-4 mr-4">Submit</Button>
                            </Col>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                      </Modal.Footer>
                    </Modal>
                    <Button type="button" onClick={handleSubmit(onSubmit)} color="primary" className="login-bt mb-2">Login</Button>
                    <NavLink onClick={clickToSignup} className="forgot mt-3 mb-0">Don’t have an account? <span>Register</span></NavLink>
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </CardFooter>
    </Card>
  );
}
const mapStateToProps = state => {
  const { favorite, auth } = state;
  return {
    favorite,
    auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "FAVORITE")),
    loginApiCall: (data) => dispatch(login(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cardbox));