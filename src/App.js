import React from 'react';
import './App.css';
import Login from './components/Login';
import TodoHome from './components/TodoHome';
import AuthContext from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const token = localStorage.getItem('token');

function App() {
  return (
    <AuthContext.Provider value={token}>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login}></Route>
          <PrivateRoute exact path='/' authed={token} component={TodoHome} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
