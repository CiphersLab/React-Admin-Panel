import React, { Component } from 'react';
import './App.css';
import Login from './app/components/screens/Login';
import Main from './app/components/screens/Main';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Login} />
          <Route path="/Main" component={Main} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
