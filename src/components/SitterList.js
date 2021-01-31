import React from 'react';
import {Table} from 'react-bootstrap';

const SitterList = ({ sitterList }) => {
    const showSitters = () => {
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
                                <td>{sitter.name}</td>
                                <td>{sitter.email}</td>
                                <td>{sitter.phone}</td>
                                <td>{sitter.date_joined}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    return (
        <div className='sitter-list'>
            {showSitters()}
        </div>
    )
}

export default SitterList;