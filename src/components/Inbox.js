import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Alert, Table, Button } from 'react-bootstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaStripeS } from 'react-icons/fa';

import Rating from './RequestRating';
import Request from './Request';

import './Inbox.css';

const Inbox = ({ baseURL, maxRating }) => {
    const [requestList, setRequestList] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState({ variant: '', message: '' });
    const { currentUser } = useAuth();

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
                            setRequestList(apiRequestList);
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

    const getOtherUserName = (request) => {
        if (user.userID !== request.owner) {
            return request.owner_name
        } else {
            return request.sitter_name
        }
    }

    const requestRouterParams = (requestID, otherUserName) => {
        return ({
            pathname: `/requests/${requestID}`,
            state: {
                baseURL: baseURL,
                currentUserID: user.userID,
                otherUserName: otherUserName
            }
        })
    }

    function showRequestList() {
        return (
            <Container fluid>
                <Table className='request-list__table'>
                    <thead>
                        <tr>
                            <th>Conversations</th>
                            <th>Rate Experience</th>
                            <th>Pay Sitter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(requestList).map((request) => {
                            const otherUserName = getOtherUserName(request);
                            console.log(request)
                            return (
                                <tr key={request.request_id}>
                                    <td className='align-middle'>
                                        <Link to={requestRouterParams(request.request_id, otherUserName)}>
                                            <Container fluid>
                                                <Row>
                                                    <Container as={Col} xs={3}  className='inbox__container--message-date'>
                                                        {Moment.utc(request.last_message.timestamp).fromNow()}
                                                    </Container>
                                                    <Container as={Col} className='inbox__container--message-title text-left'>
                                                        Request For {Moment.parseZone(request.date_of_service).local().format('l')} {user.userID === request.owner ? 'To' : 'From'} {otherUserName}
                                                    </Container>
                                                </Row>
                                                <Container>
                                                    <Container className={`inbox__container--message-body text-left text-truncate ${request.last_message.message.startsWith('Photo') ? 'photo-message' : null}`}>
                                                        {request.last_message.message}
                                                    </Container>
                                                </Container>
                                            </Container>
                                        </Link>
                                    </td>
                                    <td className='align-middle'>
                                        <Rating baseURL={baseURL} request={request} currentUserData={user} maxRating={maxRating} />
                                    </td>
                                    <td>
                                        {user.userID === request.owner &&
                                            <Button><FaStripeS /></Button>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }
    if (!requestList || !user) {
        return <div></div>;
    }

    return (
        <div className='request-list'>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            {showRequestList()}
            <Button variant='secondary w-90' as={Link} to={'/'}>Return to Dashboard</Button>
        </div>
    )
}

export default Inbox;