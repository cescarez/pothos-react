import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from './Dashboard'
import Login from './Login'

const Home = ({baseURL}) => {
  const { currentUser } = useAuth();
    return (
        <div>
            { currentUser ? 
                <Dashboard baseURL={baseURL} /> 
            :
                <Login />
            }
        </div>
    )
}

export default Home;