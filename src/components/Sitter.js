import React, {useState, useEffect} from 'react'
import {useRouteMatch, Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import Moment from 'moment';

const Sitter = ({loadUserData, sitter}) => {
    const match = useRouteMatch('/sitters/:id');
    const sitterId = match.params.id
    
    //maybe use async and await instead?
    useEffect(() => {
        loadUserData(sitterId)
    }, [loadUserData, sitterId])

    const showSitterData = () => {
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
                    <tr key={sitter.user_id}>
                        <td>{sitter.full_name}</td>
                        <td>{sitter.email}</td>
                        <td>{sitter.phone_number}</td>
                        <td>{Moment(sitter.date_joined).format('MM-DD-YYYY')}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            <h3>Sitter</h3>
            {showSitterData()}
            <Link to={'/sitters'}>Return to All Sitters</Link>
        </div>
    )
}

export default Sitter;