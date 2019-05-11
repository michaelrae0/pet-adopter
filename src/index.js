import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";

import './styles/app.scss';
import * as index from './index.module.scss'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import Results from './pages/Results'
import Details from './pages/Details'

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      onLandingPage: false,
    }
  }

  componentDidMount() {
    this.setState({
      onLandingPage: window.location.pathname === '/',
    })
  }

  render() {
    const { onLandingPage } = this.state;

    return (
      <BrowserRouter forceRefresh>
        <div className={index.home_container} >
          {!onLandingPage && <Header />}
          <div className={index.main}>
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