import React, {useState, useEffect} from 'react';
import {Alert, Table} from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import { render } from '@testing-library/react';

import './SitterList.css'

const SitterList = ({ baseURL }) => {
    const [sitterList, setSitterList] = useState([]);
    const [error, setError] = useState({variant: '', message: ''});

    useEffect(()=>{
        axios.get(baseURL + '/sitters')
            .then((response) => {
                const apiSitterList = Object.values(response.data)
                const userIDs = Object.keys(response.data)
                for(let i in userIDs) {
                    apiSitterList[i].user_id = userIDs[i];
                }
                setSitterList(apiSitterList)
            })
            .catch((error) => {
                const message=`There was an error with your request. ${error.message}.`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }, [baseURL])


    const showSitterList = () => {
        return(
            <Table className='sitter-list__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date Joined</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {(sitterList).map((sitter) => {
                        return(
                            <tr key={sitter.user_id}>
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
                                        {sitter.email}
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

    return (
        <div className='sitter-list'>
            { error.message ? <Alert variant={error.variant}>{error.message}</Alert> : showSitterList()}
        </div>
    )
}

export default SitterList;