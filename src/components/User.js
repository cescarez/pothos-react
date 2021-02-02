import React, {useState, useEffect} from 'react'
import {useRouteMatch, Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import Moment from 'moment';

const User = ({loadUserData, user}) => {
    const match = useRouteMatch('/users/:id');
    const userId = match.params.id
    
    //maybe use async and await instead?
    useEffect(() => {
        loadUserData(userId)
    }, [loadUserData, userId])

    const showUserData = () => {
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
                    <tr key={user.user_id}>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                        <td>{Moment(user.date_joined).format('MM-DD-YYYY')}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            <h3>User</h3>
            {showUserData()}
            <Link to={'/sitters'}>Return to All Sitters</Link>
        </div>
    )
}

export default User;