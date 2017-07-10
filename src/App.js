import React, { Component } from 'react';
import './App.css';

// Components
import RedditUserInfo from './components/RedditUserInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RedditUserInfo />
      </div>
    );
  }
}

export default App;
