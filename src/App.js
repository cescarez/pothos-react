import React, {useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap';
import Owner from './components/Owner'
import SitterList from './components/SitterList'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [sitterList, setSitterList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  axios.get('http://localhost:5000/sitters')
  .then(response => {
    const newSitterList = []
    const sitterJSON = response.data
    for(let user_id in sitterJSON) {
      newSitterList.push({...sitterJSON, user_id: user_id})
    }
    setSitterList(newSitterList)
  })
  .catch((error) => {
    const message=`There was an error with your request. ${error.message}.`;
    setErrorMessage(message);
    console.log(message);
  })

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
