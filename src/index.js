import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './styles/app.scss';
import * as index from './index.module.scss'
import Header from './Components/Header'
import LandingPage from './pages/LandingPage'
import Results from './pages/Results'
import Details from './pages/Details'

class App extends Component {
  render() {
    return (
      <BrowserRouter forceRefresh basename={process.env.PUBLIC_URL}>
        <div className={index.home_container} >
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route component={Header} />
          </Switch>
          <Route path='/search' component={Results} />
          <Route path='/details' component={Details} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));