import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from './Dashboard'
import Login from './Login'

const Home = ({baseURL, maxRating, baseGeocodeURL}) => {
  const { currentUser } = useAuth();
    return (
        <div>
            { currentUser ? 
                <Dashboard baseURL={baseURL} maxRating={maxRating} baseGeocodeURL={baseGeocodeURL} /> 
            :
                <Login />
            }
        </div>
    )
}

export default Home;