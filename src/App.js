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
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Inbox from './components/Inbox'

import './App.css';
import OwnerDashboard from './components/OwnerDashboard';

const BASE_URL = 'http://localhost:5000'

function App() {

    return (
        <div className="App page-container">
            <Router>
                <AuthProvider>  
                <div className="content-wrap">
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
                        <Route exact path='/about' component={AboutUs} />
                        <Route exact path='/contact' component={ContactUs} />
                        <Route exact path='/inbox' component={Inbox} />
                        <PrivateRoute exact path='/update-email'>
                            <UpdateEmailPassword />
                        </PrivateRoute>
                        <PrivateRoute exact path='/update-profile'>
                            <UpdateProfile baseURL={BASE_URL} />
                        </PrivateRoute>

                        <PrivateRoute exact path='/owner-dashboard'>
                            <OwnerDashboard baseURL={BASE_URL} />
                        </PrivateRoute>



                        {/* removed 'exact' from home path so all invalid endpoints will redirect to Home*/}
                        <Route path='/'>
                            <Home baseURL={BASE_URL} />
                        </Route>
                    </Switch>
                    </div>
                    <Footer />
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
