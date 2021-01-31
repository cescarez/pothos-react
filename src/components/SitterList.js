import React from 'react';
import {Table} from 'react-bootstrap';

const SitterList = ({ sitterList }) => {
    const showSitters = () => {
        console.log(sitterList)
        return(
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(sitterList).forEach((sitter) => {
                        return(
                            <tr>
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
            {showSitters}
        </div>
    )
}

export default SitterList;