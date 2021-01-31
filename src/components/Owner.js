import React, {useState, useEffect} from 'react'
import {useRouteMatch, Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import Moment from 'moment';

const Owner = ({loadUserData, owner}) => {
    const match = useRouteMatch('/owners/:id');
    const ownerId = match.params.id
    
    //maybe use async and await instead?
    useEffect(() => {
        loadUserData('owners', ownerId)
    }, [loadUserData, ownerId])

    const showOwnerData = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date Joined</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={owner.user_id}>
                        <td>{owner.name}</td>
                        <td>{owner.email}</td>
                        <td>{owner.phone}</td>
                        <td>{Moment(owner.date_joined).format('MM-DD-YYYY')}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            <h3>Owner</h3>
            {showOwnerData()}
            <Link to={'/dashboard'}>Return to Dashboard</Link>
        </div>
    )
}

export default Owner;