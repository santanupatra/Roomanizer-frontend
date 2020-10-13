import React,{useState} from 'react';
import './HomePage/style.css';
import imagePath from '../../Config/imageConstants'
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Facebook extends React.Component {
    render() {
        return (

          <div className="mr-1">
            <img src={imagePath.fImage}/>
            
          </div>

        )
    }
}