import React, { useState, useEffect } from 'react';
import { Container, Alert, Table, Button } from 'react-bootstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import RequestThread from './RequestThread';
import LoadingSpinner from './LoadingSpinner';

import './Inbox.css';

// TODO: implement unread format change

const Inbox = ({ baseURL, maxRating }) => {
    const [requestList, setRequestList] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState({ variant: '', message: '' });
    const { currentUser } = useAuth();

    // const [userRole, setUserRole] = useState(null);

    const loadUserData = (auth_id) => {
        axios.get(`${baseURL}/users/current/${auth_id}`)
            .then((response) => {
                const apiUser = Object.values(response.data)[0]
                apiUser.userID = Object.keys(response.data)[0]
                setUser(apiUser);
                return axios.get(baseURL + '/requests-by-user/' + apiUser.userID)
                    .then((response) => {
                        const apiRequestList = Object.values(response.data)
                        if (Object.keys(response.data)[0] !== 'message') {
                            const requestIDs = Object.keys(response.data)
                            for (let i in requestIDs) {
                                apiRequestList[i].request_id = requestIDs[i];
                            }
                            setRequestList(sortByServiceDate(apiRequestList));
                        } else {
                            setError({ variant: 'warning', message: Object.values(response.data)[0] })
                        }
                    })
            })
            .catch((error) => {
                const message = `There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                setError({ variant: 'danger', message: message });
                console.log(message);
            })
    }

    useEffect(() => {
        loadUserData(currentUser.uid)
    }, [])

    const sortByServiceDate = (list) => {
        return (
            list.sort((a, b) => {
                return Moment.utc(a.date_of_service) - Moment.utc(b.date_of_service)
            })
        )
    }

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            setError({
                variant: 'success',
                message: 'Payment confirmed!'
            });
        }
        if (query.get('canceled')) {
            setError({
                variant: 'warning',
                message: 'Payment canceled.'
            });
        }
    }, []);

    function showRequestList() {
        return (
            <Container fluid>
                <Table className='request-list__table' responsive='xl'>
                    <thead>
                        <tr>
                            <th>Conversations</th>
                            <th>Rate Experience</th>
                            <th>Pay Sitter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestList.map((request) => {
                            return (
                                <RequestThread 
                                    baseURL={baseURL} 
                                    maxRating={maxRating} 
                                    request={request} 
                                    currentUserData={user} 
                                    setError={setError}
                                />
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }

    return (
        <div className='request-list'>
            {error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            {requestList && user ? showRequestList() : <LoadingSpinner />}
            <Button variant='secondary w-90' as={Link} to={'/'}>Return to Dashboard</Button>
        </div>
    )
}

export default Inbox;