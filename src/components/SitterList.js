import React from 'react';
import {Table} from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';

const SitterList = ({ sitterList }) => {
    const showSitterList = () => {
        console.log(sitterList)
        return(
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
                    {(sitterList).map((sitter) => {
                        return(
                            <tr key={sitter.user_id}>
                                <td><Link to={`/users/${sitter.user_id}`}>{sitter.full_name}</Link></td>
                                <td>{sitter.email}</td>
                                <td>{sitter.phone_number}</td>
                                <td>{Moment(sitter.date_joined).format('MM-DD-YYYY')}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    return (
        <div className='sitter-list'>
            {showSitterList()}
        </div>
    )
}

export default SitterList;