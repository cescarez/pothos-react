import React from 'react'
import RequestList from './RequestList'
import {Table} from 'react-bootstrap'

export default function OwnerDashboard({ baseURL, currentUserData }) {
    return (
        <div>
            <h3>Sitting Requests</h3>
            <div>
                <RequestList baseURL={baseURL} currentUserData={currentUserData}/>
            </div>
        </div>
    )
}