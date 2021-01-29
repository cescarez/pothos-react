import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

function App() {
  axios.get('http://localhost:5000/hello')
  .then(res => res)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
