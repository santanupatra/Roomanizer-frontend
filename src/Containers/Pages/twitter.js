import React,{useState} from 'react';
import './HomePage/style.css';
import { Container, Row, Col } from 'reactstrap';
import imagePath from '../../Config/imageConstants'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Twitter extends React.Component {
    render() {
        return (

          <div className="mr-1">
            <img src={imagePath.tImage}/>
          </div>
        )
    }
}