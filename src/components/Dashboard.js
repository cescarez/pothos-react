import React, { useState, useEffect } from 'react';
import { Alert, Jumbotron, Tabs, Tab, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {Link}  from 'react-router-dom';
import bgimage from '../images/wallpaper.png'

import OwnerDashboard from './OwnerDashboard';
import SitterDashboard from './SitterDashboard';
import UserForm from './UserForm';

const Dashboard = ({baseURL, maxRating}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState({});
    const { currentUser } = useAuth();

    const loadUserData = (auth_id) => {
        // console.log(`loading backend user profile with frontend auth_id: ${auth_id}`)
        if (!user) {
            axios.get(`${baseURL}/users/current/${auth_id}`)
                .then((response) => {
                    const apiUser = Object.values(response.data)[0]
                    apiUser.userID = Object.keys(response.data)[0]
                    setUser(apiUser);
                })
                .catch((error) => {
                    const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
        }
    }

    useEffect(() => {
        loadUserData(currentUser.uid);
    }, [])

    const loadUserCallback = (response) => {
        console.log(response)
        console.log(response.data)
        if (response.status === 201) {
            loadUserData(response.data.auth_id);
            setError({variant: 'success', message: 'User profile successfully saved.'});
        } else {
            setError({variant: 'warning', message: `Error occurred. User profile was not saved. ${ response.response ? response.response.data.message : response.message}`})
        }
    }

    //create useEffect to retrieve a user's list of chat threads/requests -- pass that data for rendering to OwnerDashboard/SitterDashboard

    if (user || error.message) {
        return (
            <div className='dashboard'>
                <Container>
                    <Jumbotron style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}>
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
                        {error.message &&
                            <Alert variant={error.variant}>{error.message}</Alert> 
                        }
                        <Tabs border='primary'>
                            {user.owner  &&
                                <Tab eventKey='ownerDashboard' title='Owner Dashboard'>
                                    <OwnerDashboard baseURL={baseURL} currentUserData={user} maxRating={maxRating} />
                                </Tab>
                            }
                            {user.sitter &&
                                <Tab eventKey='sitterDashboard' title='Sitter Dashboard'>
                                    <SitterDashboard baseURL={baseURL} currentUserData={user} maxRating={maxRating} />
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