import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from './Dashboard'
import Login from './Login'

const Home = ({baseURL, maxRating}) => {
  const { currentUser } = useAuth();
    return (
        <div>
            { currentUser ? 
                <Dashboard baseURL={baseURL} maxRating={maxRating} /> 
            :
                <Login />
            }
        </div>
    )
}

export default Home;