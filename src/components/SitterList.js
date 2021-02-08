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
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {(sitterList).map((sitter) => {
                        if (sitter.userID!== currentUserData.userID) {
                            return(
                                <tr key={sitter.userID}>
                                    <td>
                                        <Link to={`/users/${sitter.userID}`}>
                                            {sitter.full_name}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/users/${sitter.userID}`}>
                                            {`${sitter.address.street} ${sitter.address.city}, ${sitter.address.state} ${sitter.address.postal_code}`}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/users/${sitter.userID}`}>
                                            {sitter.phone_number}
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