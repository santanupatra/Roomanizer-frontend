import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, FormGroup, Label, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Common/header';
import MultiSelect from "react-multi-select-component";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AddProperty = () => {
  const options = [
    { label: "In-unit Washer", value: "In-unit Washer" },
    { label: "Furnished", value: "Furnished", },
    { label: "Parking", value: "Parking" },
    { label: "Cleaning personnel", value: "Cleaning personnel" },
    { label: "Outdoor Space", value: "Outdoor Space" },
    { label: "Private Bathroom", value: "Private Bathroom" }
  ];
  const [selected, setSelected] = useState([]);

  const houseRules = [
    { label: "Dogs OK", value: "Dogs OK" },
    { label: "No Smoking", value: "No Smoking", },
    { label: "No Pets", value: "No Pets" },
    { label: "Cats OK", value: "Cats OK" },
    { label: "No Drugs", value: "No Drugs" },
    { label: "Couples OK", value: "Couples OK" },
    { label: "No Drinking", value: "No Drinking" },
    { label: "Other Pets OK", value: "Other Pets OK" },
    { label: "Vegan Only", value: "Vegan Only" },
    { label: "Drinking friendly", value: "Drinking friendly" },
    { label: "420 friendly", value: "420 friendly" }
  ];
  const [HRselected, setHRselected] = useState([]);


  


    return (
      
      <div className="home">
        <div className="header">
          <Header></Header>
              <Container className="mb-3">
                <Row className="justify-content-center mt-5">
                  <Col xs={12} sm={12} md={12} lg={10}>
                    <h2>Add Property</h2>
                    <div className="userDetailsBox p-4 bg-white mt-2">
                      
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Property Name</Label>
                          <input className="input" type="text" placeholder="Enter Property Name" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>City</Label>
                          <input className="input" type="text" placeholder="Enter City" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>ZIP Code</Label>
                          <input className="input" type="text" placeholder="Enter ZIP Code" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Room Name</Label>
                          <input className="input" type="text" placeholder="Enter Room Name" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>ZIP Code</Label>
                          <input className="input" type="text" placeholder="Enter ZIP Code" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Area sq/ft</Label>
                          <input className="input" type="text" placeholder="Area sq/ft" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                          <Label>About Room</Label>
                          <textarea className="input" placeholder="Enter About Room"></textarea>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>No of Bedrooms</Label>
                          <select className="input">
                            <option>No of Bedrooms</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Choose Age Range</Label>
                          <select className="input">
                            <option>1 - 3 year</option>
                            <option>18+</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                          <Label>Listing Amenities</Label>
                          <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy={"Select"}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                          <Label>House Rules</Label>
                          <MultiSelect
                            options={houseRules}
                            value={HRselected}
                            onChange={setHRselected}
                            labelledBy={"Select"}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Move In</Label>
                          <input className="input" type="text" placeholder="Move In" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                          <Label>Choose your Duration</Label>
                          <input className="input" type="text" placeholder="Choose your Duration" />
                        </FormGroup>
                      </Col>
                    </Row>

                    
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Label>Upload Property Images</Label>
                        <div className="d-flex flex-wrap">
                          <div class="addImages m-2">
                            <input type="file" id="exampleCustomFileBrowser" name="customFile" label="Pick a file!" accept=".png, .jpg, .jpeg" maxlength="1024" maxcount="10" mincount="4" multiple="" />
                          </div>
                          <div className="uploadImgs ml-0">
                            <div className="uPic m-2">
                              <img src={imagePath.roomImage1} alt="Image Preview" />
                              <a href="#">
                                <FontAwesomeIcon icon={faTimesCircle} />
                              </a>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Button color="blue" className="px-4">Upload Property</Button>
                    

                    </div>
                  </Col>
                </Row>
              </Container>
        </div>
      </div>
    )
}
export default AddProperty;
