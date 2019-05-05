import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";

import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import Results from './pages/Results'
import Details from './pages/Details'

import './styles/app.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter forceRefresh>
        <div className='home_container'>
          <Header />
          <div className='main'>
            <Route exact path='/' component={LandingPage} />
            <Route path='/search/:type/:breed?/:page?' component={Results} />
            <Route path='/details/:searchType/:id' component={Details} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));