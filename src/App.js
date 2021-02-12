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
import Gallery from './components/Gallery'
import Stripe from './components/Stripe';

import './App.css';

const BASE_URL = 'https://pothos-api.herokuapp.com'
const MAX_RATING = 4;

function App() {

    return (
        <div className="App page-container">
            <Router>
                <AuthProvider>  
                <div className="content-wrap">
                    <Navigation baseURL={BASE_URL} />
                    <Switch>
                        <PrivateRoute exact path='/users/:id'>
                            <User baseURL={BASE_URL} maxRating={MAX_RATING} />
                        </PrivateRoute>
                        <PrivateRoute exact path='/requests/:id' component={ChatLog} />
                        <PrivateRoute exact path='/sitters'>
                            <SitterList baseURL={BASE_URL} />
                        </PrivateRoute>
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path ='/forgot-password' component={ForgotPassword} />
                        <Route exact path='/about' component={AboutUs} />
                        <Route exact path='/contact' component={ContactUs} />
                        <Route exact path='/gallery/:id' component={Gallery} />
                        <Route exact path='/checkout' component={Stripe} />
                        <Route exact path='/inbox'>
                            <Inbox baseURL={BASE_URL} maxRating={MAX_RATING} />
                        </Route>
                        <PrivateRoute exact path='/update-email'>
                            <UpdateEmailPassword />
                        </PrivateRoute>
                        <PrivateRoute exact path='/update-profile'>
                            <UpdateProfile baseURL={BASE_URL} />
                        </PrivateRoute>
                        {/* removed 'exact' from home path so all invalid endpoints will redirect to Home*/}
                        <Route path='/'>
                            <Home baseURL={BASE_URL} maxRating={MAX_RATING} />
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
