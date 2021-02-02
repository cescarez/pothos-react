import React, { useState, useEffect } from 'react';
import { Alert, Jumbotron, Tabs, Tab, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {Link}  from 'react-router-dom';

import OwnerDashboard from './OwnerDashboard';
import SitterDashboard from './SitterDashboard';

const Dashboard = ({baseURL}) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const { currentUser } = useAuth();

    //CHANGE THIS. THIS IS JUST A TEST TO GET USER DATA FROM DB TO FRONT END
    useEffect(() => {
        axios.get(`${baseURL}/users/current/${currentUser.uid}`)
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

    //create useEffect to retrieve a user's list of chat threads -- pass that data for rendering to OwnerDashboard/SitterDashboard

    //create useEffect to retrieve a user's list of requests -- pass that data for rendering to OwnerDashboard/SitterDashboard

    return (
        <div className='dashboard'>
            <Container>
                <Jumbotron >
                    <h1>Welcome Back<br/><Link to={`/users/${user.user_id}`}>{user.full_name}</Link>!</h1>
                    <p>This is your dashboard.</p>
                </Jumbotron>
            </Container>
            { error.message ? 
                <Alert variant={error.variant}>{error.message}</Alert> 
            :
                <Tabs border='primary'>
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
            }
        </div>
    )
}

export default Dashboard;