import * as React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Header from './components/shared/Header'
import About from './components/About'
import Home from './components/Home'
import DeviceCommands from './components/shared/DeviceCommands'
import Jumbotron from './components/shared/Jumbotron'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Header />
            <Jumbotron />
            <Route exact path="/" component={Home} />
            <Route path="/device-commands" component={DeviceCommands} />
            <Route path="/about" component={About} />
            <br/>
            
        </div>
      </Router>
    );
  }
}
