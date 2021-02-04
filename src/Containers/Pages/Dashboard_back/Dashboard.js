import React,{useState,useEffect} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, Table } from 'reactstrap';
import {LIST_AGENT_URL,LIST_AGENTT_URL} from '../../../shared/allApiUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { toast  } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { crudAction } from "../../../store/actions/common";
import {getImageUrl,firebaseConfig} from '../../../shared/helpers'

// import Header from '../../Common/header'
// import LoginFrom from './loginFrom';

import Header from '../../Common/agentHeader'

const Dashboard = (props) => {
  console.log(props.agent.agentList)
  const userId = localStorage.getItem('userId')
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle1 = () => setDropdownOpen(prevState => !prevState);
  const logout = () =>{
    localStorage.removeItem("access-token");
    localStorage.removeItem('userId')
    // this.setState({
    //     Authtoken: '',
    //   });
      toast.info("Sucessfully logout", {
        position: toast.POSITION.TOP_LEFT
        });
          
    history.push('/')
} 
const getLandlordList = () => {
  props.crudActionCall(LIST_AGENT_URL +`/${userId}`, null, "GET_ALL")
}

useEffect(() => {
  getLandlordList();
  return () => {
      // cleanup
  }
}, []);
const navToEditPage = (Id) => {
  console.log("52",Id)
  props.history.push(`/AddProperty/${Id}`);
}
    return (
      <React.Fragment>
        <div className="dashboard">
        <Header />
        <div className="maindata py-4">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} sm={12} md={4} lg={4}>
                <h2>My Properties</h2>
                <p>Show 60 Results</p>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div className="filterDashboard text-center">
                  <Button color="white" className="active">Active</Button>
                  <Button color="white">Offmarket</Button>
                  <Button color="white">Drafts</Button>
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div className="text-lg-right">
                  <Button color="blue" href={`/AddProperty/${userId}`}>Add New Properties</Button>
                </div>
              </Col>
            </Row>

            <div className="table-responsive">
            <Table className="table-bordered bg-white">
              <thead>
                <tr>
                  <th width="200">Properties</th>
                  <th width="100">Leads</th>
                  <th width="100">Stats</th>
                  <th width="150">Post on</th>
                  <th width="100">Status</th>
                  <th width="100">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      <span className="active">Active</span>
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
                {props.agent && props.agent.agentList.length > 0 ?
                props.agent.agentList.map((val) => {
                 return (
                  <tr>
                    <td>
                    <div className="propertyDet">
                      {/* <div className="mr-2"><img src={getImageUrl(val.roomImage?val.roomImage[0].image:imagePath.roomImage1)} className="propertyImg" alt="" /></div> */}
                      <div>
                        <h6>3BHK {val.roomName}</h6>
                        <p>{val.zipCode} {val.city}.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      {
                        val.isActive==true?<span className="active">Active</span>:
                        <span className="inactive">Inactive</span>
                      }
                      
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button onClick={() => navToEditPage(val._id)}><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                  </tr>
                  );
                })
                : null}
                {/* <tr>
                  <td>
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      <span className="active">Active</span>
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      <span className="active">Active</span>
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      <span className="inactive">Inactive</span>
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      <span className="active">Active</span>
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      <span className="inactive">Inactive</span>
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      <span className="active">Active</span>
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      <span className="inactive">Inactive</span>
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="propertyDet">
                      <div className="mr-2"><img src={imagePath.roomImage1} className="propertyImg" alt="" /></div>
                      <div>
                        <h6>3BHK Luxury Villa</h6>
                        <p>711-2880 Nulla St.</p>
                        <p>$1200</p>
                      </div>
                    </div>
                  </td>
                  <td>28 till now - 5 hot</td>
                  <td>
                    <div className="stats text-center">
                      <p className="font-weight-bold"><FontAwesomeIcon icon={faBolt} style={{fontSize:'12px'}} className="text-blue" /> 281 + <span>5</span></p>
                      <p>Total Views</p>
                    </div>
                  </td>
                  <td><div className="postdate">15 May - 13.55 P.M <span>18 days ago</span></div></td>
                  <td>
                    <div className="status">
                      <span className="active">Active</span>
                      <p>Till 3 Jun</p>
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <button><FontAwesomeIcon icon={faEdit} /></button>
                      <label class="switch">
                        <input type="checkbox" class="input" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr> */}
              </tbody>
            </Table>
            </div>

          </Container>
        </div>

        </div>
      </React.Fragment>
    )
  
}
// export default Dashboard;
// export default withRouter(Dashboard);
const mapStateToProps = state => {
  const { agent } = state;
  return {
      agent
  }
}

const mapDispatchToProps = dispatch => {
  return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, 'AGENT'))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));