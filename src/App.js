import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';

import Home from './components/Home'
import SitterList from './components/SitterList'
import Signup from './components/Signup'
import Login from './components/Login'
import Navigation from './components/Navigation'
import ForgotPassword from './components/ForgotPassword'
import User from './components/User'
import UpdateProfile from './components/UpdateProfile'

import './App.css';

const BASE_URL = 'http://localhost:5000'

function App() {

    return (
        <div className="App">
            <Router>
                <AuthProvider>  
                    <Navigation baseURL={BASE_URL} />
                    <Switch>
                        <Route path='/users/:id'>
                            <User baseURL={BASE_URL} />
                        </Route>
                        <Route path='/sitters'>
                            <SitterList baseURL={BASE_URL} />
                        </Route>
                        <Route path='/signup' component={Signup} />
                        <Route path='/login' component={Login} />
                        <Route path ='/forgot-password' component={ForgotPassword} />
                        <Route path='/update-profile' component={UpdateProfile} />
                        {/* removed 'exact' from home path so all invalid endpoints will redirect to Home*/}
                        <Route path='/'>
                            <Home baseURL={BASE_URL} />
                        </Route>
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
