import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'



import Routing from './Routing/routing'


export default class App extends React.Component {
  render(){
    return(
      <Routing />

      
      
    )
  }
}
