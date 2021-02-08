import React from 'react';
import {Table} from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';

import './SitterList.css'

const SitterList = ({ sitterList, currentUserData }) => {

    const showSitterList = () => {
        return(
            <Table className='sitter-list__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Username</th> */}
                        <th>Phone</th>
                        <th>Date Joined</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {(sitterList).map((sitter) => {
                        if (sitter.auth_id !== currentUserData.uid) {
                            return(
                                <tr key={sitter.userID}>
                                    <td>
                                        <Link to={`/users/${sitter.userID}`}>
                                            {sitter.full_name}
                                        </Link>
                                    </td>
                                    {/* <td>
                                        <Link to={`/users/${sitter.userID}`}>
                                            {sitter.username}
                                        </Link>
                                    </td> */}
                                    <td>
                                        <Link to={`/users/${sitter.userID}`}>
                                            {sitter.phone_number}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/users/${sitter.userID}`}>
                                            {Moment(sitter.date_joined).format('MM-DD-YYYY')}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/users/${sitter.userID}`}>
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

    if (!sitterList) {
        return <div></div>;
    }

    return (
        <div className='sitter-list'>
            {showSitterList()}
        </div>
    )
}

export default SitterList;