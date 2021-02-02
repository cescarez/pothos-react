import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar, Nav, Button, Container, Jumbotron, Tabs, Tab } from 'react-bootstrap';

import Home from './components/Home'
import SitterList from './components/SitterList'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import UserForm from './components/UserForm'
import ForgotPassword from './components/ForgotPassword'
import User from './components/User'

import './App.css';
import OwnerDashboard from './components/OwnerDashboard';
import SitterDashboard from './components/SitterDashboard';

const BASE_URL = 'http://localhost:5000'

function App() {
  const [sitterList, setSitterList] = useState([]);
  const [sitter, setSitter] = useState({});
  const [owner, setOwner] = useState({})
  const [errorMessage, setErrorMessage] = useState('');
  // const { currentUser, logout } = useAuth()


  useEffect(()=>{
    axios.get(BASE_URL + '/sitters')
    .then((response) => {
      const apiSitterList = Object.values(response.data)
      const userIDs = Object.keys(response.data)
      for(let i in userIDs) {
        apiSitterList[i].user_id = userIDs[i];
      }
      setSitterList(apiSitterList)
    })
    .catch((error) => {
      const message=`There was an error with your request. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }, [])
  
  const loadUserDataCallback = (userType, userId) => {
    axios.get(`${BASE_URL}/${userType}/${userId}`)
    .then((response) => {
      const apiUser = response.data
      if(userType === 'sitters') {
        setSitter(apiUser);
      } else if (userType === 'owners') {
        setOwner(apiUser);
      }
    })
    .catch((error) => {
      const message=`There was an error with your request. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }

  return (
    <div className="App">
      <Router>
        <AuthProvider>  
          <Navbar fixed='top' bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/sitters'>Plant Sitters</Nav.Link>
            </Nav>
            {/* {currentUser ? <Button variant="outline-info" as={Link} >Log Out</Button> : 
            <Button variant="outline-info" as={Link} to='/signup'>Sign Up</Button>} */}
            <Button variant="outline-info" as={Link} to='/signup'>Sign Up</Button>
          </Navbar>

          <Switch>
            <Route exact path='/'><Home /></Route>
            <PrivateRoute path='/dashboard'>
              {
                //include some ternary to render OwnerDashboard or SitterDashboard based on logged in user
                //use Bootstrap tabs?
              }
              <Jumbotron>
                  <h1>Welcome back!</h1>
                  <p>This is your Plant Owner Dashboard. See below for a list of all available Sitters.</p>
              </Jumbotron>
              <Tabs>
                <Tab eventKey='ownerDashboard' title='Owner Dashboard'>
                  <OwnerDashboard baseURL={BASE_URL}  />
                </Tab>
                <Tab eventKey='sitterDashboard' title='SitterDashboard'>
                  <SitterDashboard baseURL={BASE_URL}  />
                </Tab>
              </Tabs>
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
