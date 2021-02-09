import React from 'react'
import RequestList from './RequestList'
import {Table} from 'react-bootstrap'

export default function SitterDashboard({ baseURL, currentUserID }) {
    return (
        <div>
            <h3>Sitting Requests</h3>
            <div>
                <RequestList baseURL={baseURL} currentUserID={currentUserID}/>
            </div>
        </div>
    )
}