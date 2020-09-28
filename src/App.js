import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';


import Routing from './Routing/routing'


export default class App extends React.Component {
  render(){
    return(
      <React.Fragment>
        <ToastContainer autoClose={2000} />
       <Routing/>
     </React.Fragment>
      
      
    )
  }
}
