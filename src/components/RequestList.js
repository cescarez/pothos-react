import React, {useState, useEffect} from 'react';
import {Alert, Table, Button} from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import axios from 'axios';

import './RequestList.css'

const RequestList = ({ baseURL, userID }) => {  
    const [requestList, setRequestList] = useState(null);
    const [error, setError] = useState({variant: '', message: ''});

    useEffect(()=>{
        axios.get(baseURL + '/requests-by-sitter/' + userID)
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
                const message=`There was an error with your request. ${error.message}.`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }, [baseURL])

    const changeRequest = (requestid, status) => {
        axios.put(baseURL + '/requests/' + requestid, {"status": status})
            .then((response) => {
                setError({variant:'success', message: 'Request successfully changed.'})
            }).catch((error) => {
                const message=`There was an error with your request. ${error.message}.`;
                setError({variant: 'danger', message: message});
            })
    }

    const showRequestList = () => {
        return(
            <Table className='request-list__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Chat</th>
                        <th>Date Requested</th>
                        <th>Status</th>
                        <th>Confirm</th>
                        <th>Decline</th>
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