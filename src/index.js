import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './Components/Header/index'
import Search from './pages/Search/index'
import Results from './pages/Results/index'
import Details from './pages/Details/index'

import './styles/app.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='home_container'>
          <Header />
          <div className='pages'>
            <Route exact path='/' component={Search} />
            <Route path='/animals' component={Results} />
            <Route path='/shelters' component={Results} />
            <Route path='/details/:searchType/:id' component={Details} />
          </div>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));