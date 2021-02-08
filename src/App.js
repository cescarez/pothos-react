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
import PrivateRoute from './components/PrivateRoute'
import UpdateEmailPassword from './components/UpdateEmailPassword'
import UpdateProfile from './components/UpdateProfile'
import Footer from './components/Footer'
import ChatLog from './components/ChatLog'

import './App.css';

const BASE_URL = 'https://pothos-api.herokuapp.com'

function App() {

    return (
        <div className="App page-container">
            <div className="content-wrap">
            <Router>
                <AuthProvider>  
                    <Navigation baseURL={BASE_URL} />
                    <Switch>
                        <PrivateRoute exact path='/users/:id'>
                            <User baseURL={BASE_URL} />
                        </PrivateRoute>
                        <PrivateRoute exact path='/requests/:id'>
                            <ChatLog baseURL={BASE_URL} />
                        </PrivateRoute>
                        <PrivateRoute exact path='/sitters'>
                            <SitterList baseURL={BASE_URL} />
                        </PrivateRoute>
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path ='/forgot-password' component={ForgotPassword} />
                        <PrivateRoute exact path='/update-email'>
                            <UpdateEmailPassword />
                        </PrivateRoute>
                        <PrivateRoute exact path='/update-profile'>
                            <UpdateProfile baseURL={BASE_URL} />
                        </PrivateRoute>
                        {/* removed 'exact' from home path so all invalid endpoints will redirect to Home*/}
                        <Route path='/'>
                            <Home baseURL={BASE_URL} />
                        </Route>
                    </Switch>
                </AuthProvider>
            </Router>
            </div>
            <Footer />
        </div>
    );
}

export default App;
