import React, {useState, useEffect} from 'react';
import {Alert, Table} from 'react-bootstrap';
import Moment from 'moment';
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import './SitterList.css'
import './SitterMap.css'
import SitterMap from './SitterMap';

const SitterList = ({ baseURL, currentUserData }) => {
    const { currentUser } = useAuth();
    const [sitterList, setSitterList] = useState(null);
    const [error, setError] = useState({variant: '', message: ''});
    const [showMap, setShowMap] = useState(false);

    useEffect(()=>{
        axios.get(baseURL + '/sitters')
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

    const showSitterList = () => {
        return(
            <Table className='sitter-list__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Date Joined</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {(sitterList).map((sitter) => {
                        if (sitter.auth_id !== currentUser.uid) {
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
                        } else {
                            return null
                        }
                    })}
                </tbody>
            </Table>
        )
    }

    const onViewMapClick = () => {
        setShowMap(!showMap);
    }

    if (!sitterList) {
        return <div></div>;
    }

    return (
        <div className='sitter-list'>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>} 
            { showMap ? 
                <div class='map_canvas'>
                    <Button variant='outline-secondary' onClick={onViewMapClick}>Hide Map</Button>
                    <SitterMap sitterList={sitterList} currentUserData={currentUserData} />
                </div> 
            : <Button variant='outline-secondary' onClick={onViewMapClick}>View Map</Button>
            }            
            {showSitterList()}
        </div>
    )
}

export default SitterList;