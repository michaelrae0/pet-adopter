import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './Components/Header/index'
import Search from './Components/Search/index'
import AnimalResults from './Components/AnimalResults/index'
import Details from './Components/Details/index'

import './index.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='home_container'>
          <Header />
            <Route exact path='/' component={Search} />
            <Route path='/animals' component={AnimalResults} />
            <Route path='/details/:id' component={Details} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));