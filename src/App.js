import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';

import Home from './components/Home'
import SitterList from './components/SitterList'
import Sitter from './components/Sitter'
import Owner from './components/Owner'
import Signup from './components/Signup'


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const BASE_URL = 'http://localhost:5000'

function App() {
  const [sitterList, setSitterList] = useState([]);
  const [sitter, setSitter] = useState({});
  const [owner, setOwner] = useState({})
  const [errorMessage, setErrorMessage] = useState('');

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
            <Button variant="outline-info" as={Link} to='signup'>Sign Up</Button>
          </Navbar>

          <Switch>
            <Route exact path='/'><Home /></Route>
            <Route path='/dashboard'>
              {
                //include some ternary to render OwnerDashboard or SitterDashboard based on logged in user
                //use Bootstrap tabs?
              }
            </Route>
            <Route path='/owners/:id'>
              <Owner owner={owner} loadUserData={loadUserDataCallback}/>
            </Route>      
            <Route path='/sitters/:id'>
              <Sitter sitter={sitter} loadUserData={loadUserDataCallback} />
            </Route>      
            <Route path='/sitters'>
              <SitterList sitterList={sitterList} />
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
