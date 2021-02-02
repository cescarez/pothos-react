import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';

import Home from './components/Home'
import SitterList from './components/SitterList'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import PrivateRoute from './components/PrivateRoute'
import UserForm from './components/UserForm'
import ForgotPassword from './components/ForgotPassword'
import User from './components/User'

import './App.css';

const BASE_URL = 'http://localhost:5000'

function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>  
          <Navigation baseURL={BASE_URL} />
          <Switch>
            <Route exact path='/'>
                <Home baseURL={BASE_URL} />
            </Route>
            <PrivateRoute path='/dashboard'>
              <Dashboard baseURL={BASE_URL} />
            </PrivateRoute>     
            <Route path='/users/:id'>
              <User baseURL={BASE_URL} />
            </Route>
            <Route path='/sitters'>
              <SitterList baseURL={BASE_URL} />
            </Route>
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path ='/forgot-password' component={ForgotPassword} />
            <Route path='/createprofile' component={UserForm} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
    
  );
}

export default App;
