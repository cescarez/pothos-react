import React, {useState, useEffect} from 'react';
import {Alert, Table} from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'

import './RequestList.css'

const RequestList = ({ baseURL }) => {
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});   
    const [requestList, setRequestList] = useState(null);
    const [error, setError] = useState({variant: '', message: ''});

    useEffect(()=>{
        axios.get(baseURL + '/requests-by-sitter/' + )
            .then((response) => {
                const apiSitterList = Object.values(response.data)
                if (Object.keys(response.data)[0] !== 'message') {
                    const userIDs = Object.keys(response.data)
                    for(let i in userIDs) {
                        apiSitterList[i].user_id = userIDs[i];
                    }
                    setSitterList(apiSitterList)
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


    const showRequestList = () => {
        return(
            <Table className='request-list__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time Requested</th>
                        <th>Status</th>
                        <th>Confirm/Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {(requestList).map((request) => {
                        return(
                            <tr key={request.owner}>
                                <td>
                                    <Link to={`/users/${sitter.user_id}`}>
                                        {sitter.full_name}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/users/${sitter.user_id}`}>
                                        {sitter.username}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/users/${sitter.user_id}`}>
                                        {sitter.phone_number}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/users/${sitter.user_id}`}>
                                        {Moment(sitter.date_joined).format('MM-DD-YYYY')}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/users/${sitter.user_id}`}>
                                        { sitter.rating ? sitter.rating : 'N/A'}
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
            { error.message ? <Alert variant={error.variant}>{error.message}</Alert> : showRequestList()}
        </div>
    )
}

export default RequestList;