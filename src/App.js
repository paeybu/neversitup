import React from 'react';
import './App.css';
import Login from 'Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
