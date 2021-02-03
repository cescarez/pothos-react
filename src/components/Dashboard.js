import React, { useState, useEffect } from 'react';
import { Alert, Jumbotron, Tabs, Tab, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {Link}  from 'react-router-dom';

import OwnerDashboard from './OwnerDashboard';
import SitterDashboard from './SitterDashboard';
import UserForm from './UserForm';

const Dashboard = ({baseURL}) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const { currentUser } = useAuth();

    const loadUserData = () => {
        currentUser && 
            axios.get(`${baseURL}/users/current/${currentUser.uid}`)
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

    useEffect(() => {
        loadUserData();
    }, [user])

    const setUserCallback = (user) => {
        const newUser = {...user}
        setUser(newUser);
    }

    //create useEffect to retrieve a user's list of chat threads -- pass that data for rendering to OwnerDashboard/SitterDashboard

    //create useEffect to retrieve a user's list of requests -- pass that data for rendering to OwnerDashboard/SitterDashboard

    return (
        <div className='dashboard'>
            <Container>
                <Jumbotron >
                    <h1>Welcome Back 
                        {Object.keys(user).length ? <><br/><Link to={`/users/${user.userID}`}>{user.full_name}</Link></> : null}
                    !</h1>
                    <p>This is your dashboard.</p>
                </Jumbotron>
            </Container>
            { (Object.keys(user).length ? 
                error.message ? 
                    <Alert variant={error.variant}>{error.message}</Alert> 
                :
                    <Tabs border='primary'>
                        {console.log(user)}
                        {user.owner  &&
                            <Tab eventKey='ownerDashboard' title='Owner Dashboard'>
                                <OwnerDashboard baseURL={baseURL}  />
                            </Tab>
                        }
                        {user.sitter &&
                            <Tab eventKey='sitterDashboard' title='Sitter Dashboard'>
                                <SitterDashboard baseURL={baseURL}  />
                            </Tab>
                        }
                    </Tabs>
            : 
                <UserForm baseURL={baseURL} setDashboardUser={setUserCallback} />
            )}
        </div>
    )
}

export default Dashboard;