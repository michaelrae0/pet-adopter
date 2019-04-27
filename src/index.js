import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";

import Header from './components/Header'
import Search from './pages/Search'
import Results from './pages/Results'
import Details from './pages/Details'

import './styles/app.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter forceRefresh>
        <div className='home_container'>
          <Header />
          <div className='pages'>
            <Route exact path='/' component={Search} />
            <Route path='/s/:category/:page' component={Results} />
            <Route path='/details/:searchType/:id' component={Details} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));