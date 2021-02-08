import React from 'react'
import RequestList from './RequestList'
import {Table} from 'react-bootstrap'

export default function OwnerDashboard({ baseURL, userID }) {
    return (
        <div>
            <h3>Sitting Requests</h3>
            <div>
                <RequestList baseURL={baseURL} userID={userID}/>
            </div>
        </div>
    )
}