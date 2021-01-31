import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap';
import Owner from './components/Owner'
import SitterList from './components/SitterList'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const BASE_URL = 'http://localhost:5000'

function App() {
  const [sitterList, setSitterList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    axios.get(BASE_URL + '/sitters')
    .then((response) => {
      const newSitterList = Object.values(response.data)
      const userIDs = Object.keys(response.data)
      for(let i in userIDs) {
        newSitterList[i].user_id = userIDs[i];
      }
      setSitterList(newSitterList)
    })
    .catch((error) => {
      const message=`There was an error with your request. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/sitters'>
            <SitterList sitterList={sitterList} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
