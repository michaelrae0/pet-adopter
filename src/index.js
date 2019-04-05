import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <a href='https://www.petfinder.com/developers/'>Pet finder API</a>
          </p>
        </header>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));