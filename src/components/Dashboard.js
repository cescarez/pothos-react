import React, { useState, useEffect } from 'react';
import { Alert, Jumbotron, Tabs, Tab, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {Link}  from 'react-router-dom';

import OwnerDashboard from './OwnerDashboard';
import SitterDashboard from './SitterDashboard';
import UserForm from './UserForm';

const Dashboard = ({baseURL}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState({});
    const { currentUser } = useAuth();

    const loadUserData = (auth_id) => {
        // console.log(`loading backend user profile with frontend auth_id: ${auth_id}`)
        if (!user) {
            axios.get(`${baseURL}/users/current/${auth_id}`)
                .then((response) => {
                    const apiUser = Object.values(response.data)[0]
                    if (Object.keys(response.data)[0] !== 'message') {
                        apiUser.userID = Object.keys(response.data)[0]
                        setUser(apiUser);
                    } else {
                        setError({variant: 'warning', message: apiUser})
                    }
                })
                .catch((error) => {
                    const message=`There was an error with your request. ${error.message}.`;
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
        }
    }

    useEffect(() => {
        loadUserData(currentUser.uid);
    }, [])

    const loadUserCallback = (response) => {
        if (response.status === 201) {
            loadUserData(response.data.auth_id);
            setError({variant: 'success', message: 'User profile successfully saved.'});
        } else {
            setError({variant: 'warning', message: `Error occurred. User profile was not saved. ${response.message}`})
        }
    }

    //create useEffect to retrieve a user's list of chat threads -- pass that data for rendering to OwnerDashboard/SitterDashboard

    //create useEffect to retrieve a user's list of requests -- pass that data for rendering to OwnerDashboard/SitterDashboard
    if (user || error.message) {
        return (
            <div className='dashboard'>
                <Container>
                    <Jumbotron >
                        <h1>Welcome 
                            { user && <> Back,<br/><Link to={`/users/${user.userID}`}>{user.full_name}</Link></>}
                        !</h1>
                        <p>This is your dashboard.
                            { !user && ' Please complete your profile to view available plant sitters.'}
                        </p>
                    </Jumbotron>
                </Container>
                { user ? 
                    <div>
                        {error.message ?
                            <Alert variant={error.variant}>{error.message}</Alert> 
                        : null}
                        <Tabs border='primary'>
                            {user.owner  &&
                                <Tab eventKey='ownerDashboard' title='Owner Dashboard'>
                                    <OwnerDashboard baseURL={baseURL} currentUserData={user} />
                                </Tab>
                            }
                            {user.sitter &&
                                <Tab eventKey='sitterDashboard' title='Sitter Dashboard'>
                                    <SitterDashboard baseURL={baseURL} />
                                </Tab>
                            }
                        </Tabs>
                    </div>
                : 
                    <UserForm baseURL={baseURL} setDashboardUser={loadUserCallback} />
                }
            </div>
        )
    } else {
        return null;
    }
}

export default Dashboard;