import React from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <div style={{ paddingTop: '100px' }}>
          <Route exact path='/' component={Login}></Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
