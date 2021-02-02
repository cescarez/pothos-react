import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Navbar, Nav, Button, Container, Jumbotron, Tabs, Tab } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';

import Home from './components/Home'
import SitterList from './components/SitterList'
import Signup from './components/Signup'
import User from './components/User'

import './App.css';
import OwnerDashboard from './components/OwnerDashboard';
import SitterDashboard from './components/SitterDashboard';

const BASE_URL = 'http://localhost:5000'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>  
          <Navbar fixed='top' bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/sitters'>Plant Sitters</Nav.Link>
            </Nav>
            <Button variant="outline-info" as={Link} to='signup'>Sign Up</Button>
          </Navbar>

          <Switch>
            <Route path='/dashboard'>
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
            </Route>
            <Route path='/users/:id'>
              <User baseURL={BASE_URL} />
            </Route>
            <Route path='/sitters'>
              <SitterList baseURL={BASE_URL} />
            </Route>
            <Route path='/signup'>
              <Container 
                className='d-flex align-items-center justify-content-center'
                style={{ minHeight: '100vh' }}
              >
                <div className='w-100' style={{ maxWidth: '400px'}}>
                  <Signup />
                </div>
              </Container>
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
    
  );
}

export default App;
