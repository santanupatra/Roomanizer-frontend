import React,{useState} from 'react';
import './style.css';
import imagePath from '../../../Config/imageConstants';
import { Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast  } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router";
// import Header from '../../Common/header'
// import LoginFrom from './loginFrom';


const Dashboard = (props) => {
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
                    <Link to={`/editProfile/${userId}`}>My Account</Link>
                    <Link to={`/agentchangePassword/${userId}`}>Settings</Link>
                    <Link to="#" onClick={logout}>Logout</Link>
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
// export default Dashboard;
export default withRouter(Dashboard);
