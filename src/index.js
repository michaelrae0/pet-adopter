import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TestAxios from './Components/TestAxios/index'
import Layout from './Components/Layout/index'

import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <p>
            <a href='https://www.petfinder.com/developers/'>Pet finder API</a>
          </p>
          <TestAxios />
        </Layout>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));