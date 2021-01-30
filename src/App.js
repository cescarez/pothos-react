import React, {useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

function App() {
  const [response, setResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  axios.get('http://localhost:5000/hello')
  .then(res => {
    console.log(res)
    setResponse(res.data.message)
  })
  .catch((error) => {
    const message=`There was an error with your request. ${error.message}.`;
    setErrorMessage(message);
    console.log(message);
  })
  return (
    <div className="App">
      {response}
    </div>
  );
}

export default App;
