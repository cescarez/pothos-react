import React, { useState, useEffect } from 'react';
import { Alert, Jumbotron, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

import OwnerDashboard from './OwnerDashboard';
import SitterDashboard from './SitterDashboard';

const Dashboard = ({baseURL}) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const { currentUser } = useAuth();

    //CHANGE THIS. THIS IS JUST A TEST TO GET USER DATA FROM DB TO FRONT END
    useEffect(() => {
        axios.get(`${baseURL}/users/test/${currentUser.email}`)
            .then((response) => {
                const apiUser = Object.values(response.data)[0]
                setUser(apiUser);
            })
            .catch((error) => {
                const message=`There was an error with your request. ${error.message}.`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }, [baseURL, currentUser])

    return (
        <div className='dashboard'>
            <Jumbotron className='bg-plant-yellow'>
                <h1>Welcome back {user.full_name}!</h1>
                <p>This is your Plant Owner Dashboard. See below for a list of all available Sitters.</p>
            </Jumbotron>
            <Tabs>
            {user.owner ? 
                <Tab eventKey='ownerDashboard' title='Owner Dashboard'>
                    <OwnerDashboard baseURL={baseURL}  />
                </Tab>
            : null }
            {user.sitter ? 
                <Tab eventKey='sitterDashboard' title='Sitter Dashboard'>
                    <SitterDashboard baseURL={baseURL}  />
                </Tab>
            : null }
            </Tabs>
        </div>
    )
}

export default Dashboard;