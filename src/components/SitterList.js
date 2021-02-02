import React, {useState, useEffect} from 'react';
import {Alert, Table} from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import axios from 'axios';

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
            <Table striped bordered hover>
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
                                <td><Link to={`/users/${sitter.user_id}`}>{sitter.full_name}</Link></td>
                                <td>{sitter.username}</td>
                                <td>{sitter.email}</td>
                                <td>{sitter.phone_number}</td>
                                <td>{Moment(sitter.date_joined).format('MM-DD-YYYY')}</td>
                                <td>{ sitter.rating ? sitter.rating : 'N/A'}</td>
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