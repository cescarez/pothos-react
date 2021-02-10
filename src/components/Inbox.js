import React, {useState, useEffect} from 'react';
import { Alert, Table } from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Inbox= ({ baseURL }) => {  
    const [requestList, setRequestList] = useState(null);
    const [error, setError] = useState({variant: '', message: ''});
    const { currentUser } = useAuth();

    const loadUserData = (auth_id) => {
        axios.get(`${baseURL}/users/current/${auth_id}`)
            .then((response) => {
                const userID = Object.keys(response.data)[0]
                return axios.get(baseURL + '/requests-by-owner/' + userID)
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
            })
            .catch((error) => {
                const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }

    useEffect(() => {
        loadUserData(currentUser.uid)
    }, [])

    function showRequestList() {
        return(
            <Table className='request-list__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Chat</th>
                        <th>Date Requested</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {(requestList).map((request) => {
                        return(
                            <tr key={request.request_id}>
                                <td className='request-list__td--owner'>
                                    <Link to={`/users/${request.owner}`}>
                                        {request.owner_name}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/requests/${request.request_id}`}>
                                        Messages
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/requests/${request.request_id}`}>
                                        {Moment(request.time_requested).format('MM-DD-YYYY')}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/requests/${request.request_id}`}>
                                        {request.status}
                                    </Link>
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

export default Inbox;