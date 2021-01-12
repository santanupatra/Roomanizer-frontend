import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import Header from '../../Common/header'
// import LoginFrom from './loginFrom';


const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle1 = () => setDropdownOpen(prevState => !prevState);

    return (
      <React.Fragment>
        <div className="dashboard">
        <header>
        <Container>
          <Row className="align-items-center">
            <Col xs={12} sm={12} md={4} lg={4}><Link to="/"><img src={imagePath.LogoImage} alt="logo" /></Link></Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className="searchbox">
                <input type="text" placeholder="Search ..." />
                <button><FontAwesomeIcon icon={faSearch} /></button>
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className="text-right">
                <Dropdown isOpen={dropdownOpen} toggle={toggle1}>
                  <DropdownToggle className="login-hd">
                    <img src={imagePath.userImage} href="/" alt="image"/> User Name 
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link to='#'>My Account</Link>
                    <Link to='#'>Settings</Link>
                    <Link to="#">Logout</Link>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Container>
        </header>

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
                <Button color="white">Add New Properties</Button>
              </Col>
            </Row>
          </Container>
        </div>

        </div>
      </React.Fragment>
    )
  
}
export default Dashboard;
