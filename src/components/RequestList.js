import React, {useState, useEffect} from 'react';
import {Alert, Table, Button} from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import axios from 'axios';

import './RequestList.css'

import RatingStars from './RatingStars';

const RequestList = ({ baseURL, currentUserData, maxRating }) => {  
    const [requestList, setRequestList] = useState(null);
    const [error, setError] = useState({variant: '', message: ''});

    const loadRequestList = () => {
        axios.get(baseURL + '/requests-by-sitter/' + currentUserData.userID)
            .then((response) => {
                const apiRequestList = Object.values(response.data)
                if (Object.keys(response.data)[0] !== 'message') {
                    const requestIDs = Object.keys(response.data)
                    for(let i in requestIDs) {
                        apiRequestList[i].request_id = requestIDs[i];
                    }
                    setRequestList(apiRequestList);
                } else {
                    setError({variant: 'warning', message: Object.values(response.data)[0]})
                }
            })
            .catch((error) => {
                const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }

    useEffect(()=>{
        loadRequestList();
    }, [])

    const changeRequest = (requestid, status) => {
        axios.put(baseURL + '/requests/' + requestid, {"status": status})
            .then((response) => {
                loadRequestList();
                setError({variant:'success', message: 'Request successfully changed.'})
            }).catch((error) => {
                const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                setError({variant: 'danger', message: message});
            })
    }

    const getOtherUserName = (request) => {
        if (currentUserData.userID !== request.owner) {
            return request.owner_name
        } else {
            return request.sitter_name
        }
    }
    const getUserRole = (request) => {
        if (currentUserData.userID === request.owner) {
            return 'owner'
        } else {
            return 'sitter' 
        }
    }

    const requestRouterParams = (requestID, otherUserName, userRole) => {
        return ({
            pathname: `/requests/${requestID}`,
            state: {
                baseURL: baseURL,
                currentUserID: currentUserData.userID,
                otherUserName: otherUserName,
                userRole: userRole
            }
        })
    } 

    const showRequestList = () => {
        return(
            <Table className='request-list__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Request was Issued</th>
                        <th>Date of Service</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Owner's Avg Rating</th>
                        <th>Confirm</th>
                        <th>Decline</th>
                    </tr>
                </thead>
                <tbody>
                    {(requestList).map((request) => {
                        const otherUserName = getOtherUserName(request);
                        const userRole = getUserRole(request)
                        return(
                            <tr key={request.request_id}>
                                <td className='request-list__td--owner'>
                                    <Link to={`/users/${request.owner}`}>
                                        {request.owner_name}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={requestRouterParams(request.request_id, otherUserName, userRole)}>
                                        {Moment.parseZone(request.time_requested).local().format('l LT')}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={requestRouterParams(request.request_id, otherUserName, userRole)}>
                                        {Moment.parseZone(request.date_of_service).format('l')}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={requestRouterParams(request.request_id, otherUserName, userRole)}>
                                        {request.status}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={requestRouterParams(request.request_id, otherUserName, userRole)}>
                                        {request.paid ? 'complete' : 'pending'}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={requestRouterParams(request.request_id, otherUserName, userRole)}>
                                        { request.owner_rating ? <RatingStars currentRating={parseInt(request.owner_rating)} maxRating={maxRating} /> : 'N/A'}
                                    </Link>
                                </td>
                                <td>
                                    <Button variant='primary' onClick={() => {changeRequest(request.request_id,'confirmed')}}>Confirm</Button>
                                </td>
                                <td>
                                    <Button variant='primary' onClick={() => {changeRequest(request.request_id,'declined')}}>Decline</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    if (!requestList) {
        return <div></div>;
    }

    return (
        <div className='request-list'>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            {showRequestList()}
        </div>
    )
}

export default RequestList;