import React, { useState, useEffect } from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import Formsec from './form-sec';
import Slider from './slider';
import Footer from '../../Common/footer';
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import { ADD_PROPERTY } from '../../../shared/allApiUrl';
import moment from 'moment'
import { withRouter } from 'react-router-dom';

const PropertyDetails = (props) => {
    const initialFields = {
        roomNo: "",
        bathNo: "",
        aboutRoom: "",
        address: "",
        age: "",
        aminities: null,
        area: "",
        budget: "",
        charges: "",
        chargesType: "",
        city: "",
        deposite: "",
        duration: "",
        flateMate: "",
        houseRules: [],
        latitude: null,
        location: [],
        longitude: null,
        moveIn: "",
        noOfBedRoom: '',
        roomName: "",
        zipCode: "",
        ageRange: "",
        aminities: []
    }

    let propertyId = props.match.params.propertyId;
    const [fields, setFields] = useState(initialFields);

    useEffect(() => {
        props.crudActionAgentCall(`${ADD_PROPERTY}/${propertyId}`, null, "GET_ALL");
    }, [propertyId]);

    useEffect(() => {
        const action = props.agent.agentList;

        if (props.agent.agentList) {
            setFields({ ...fields, ...props.agent.agentList });
        }
    }, [props.agent]);


    return (
        <div className="home">
            <div className="header">
                <Header></Header>
                <div className="">
                    <Container className="mb-3">
                        <Row className="align-items-center">
                            <Col>
                                <Row className="mb-4">
                                    <Col className="sl"><Slider></Slider></Col>
                                </Row>

                                <div className="page-bg">

                                    <Row className="p-3 p-sm-5 p-md-5 p-lg-5">
                                        <Col xs={12} sm={12} md={12} lg={4}>
                                            <Formsec></Formsec>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={8}>
                                            <div className="about mt-0 pb-4">
                                                <h4>For Private Room:</h4>
                                                <h2 className="blue">$
                                                    {fields.charges} / {fields.chargesType} in {fields.city}
                                                </h2>
                                            </div>
                                            <div className="about">
                                                <h4>About Room</h4>
                                                <p className="mb-2">{fields.aboutRoom}</p>
                                                <ul className="ab pl-0 d-flex justify-content-between mb-1">
                                                    <li><img src={imagePath.bedImage} className="pr-1" alt="image" />{fields.noOfBedRoom}</li>
                                                    <li><img src={imagePath.maleImage} className="pr-1" alt="image" />{fields.flateMate} Flatmates</li>
                                                    <li><img src={imagePath.ageImage} className="pr-1" alt="image" />{fields.ageRange}</li>
                                                    <li><img src={imagePath.bathImage} className="pr-1" alt="image" />{fields.bathNo} Bathrooms</li>
                                                </ul>
                                                <ul className="ab pl-0 d-flex mb-4">
                                                    {fields.aminities.map(val => {
                                                        return (
                                                            <li><img src={fields.aminitiesImage ? fields.aminitiesImage : imagePath.bedImage} className="pr-1" alt="image" />{val.label}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>

                                            <div className="about">
                                                <Row>
                                                    <Col xs={12} sm={6} md={3} lg={3}>
                                                        <h4>Move in:</h4>
                                                        <p>{fields.moveIn ? moment(fields.moveIn).format('YYYY-MM-DD') : ''}</p>
                                                    </Col>
                                                    <Col xs={12} sm={6} md={3} lg={3}>
                                                        <h4>Duration:</h4>
                                                        <p>{fields.duration ? fields.duration : "00"}</p>
                                                    </Col>
                                                    <Col xs={12} sm={6} md={3} lg={3}>
                                                        <h4>Deposit:</h4>
                                                        <p>${fields.deposite ? fields.deposite : "00"}</p>
                                                    </Col>
                                                    <Col xs={12} sm={6} md={3} lg={3}>
                                                        <h4>Charges:</h4>
                                                        <p>${fields.charges ? fields.charges : "00"} or Included</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="about">
                                                <h4>House Rules:</h4>
                                                <ul className="pre pl-1 mb-4">
                                                    {fields.houseRules.map(val => {
                                                        return (
                                                            <li>{val.label}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="about border-0">
                                                <h4>Looking for a room in:</h4>
                                                <div className="locat mb-3">{fields.address}</div>
                                            </div>
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
    const { agent } = state;
    return {
        agent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionAgentCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, 'AGENT'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PropertyDetails));











