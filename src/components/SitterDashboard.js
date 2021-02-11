import React from 'react'
import RequestList from './RequestList'
import {Container} from 'react-bootstrap'

export default function OwnerDashboard({ baseURL, currentUserData }) {
    return (
        <Container className='px-0' fluid>
            <Container className='text-right'>
                {`Current Sitter Rating: ${currentUserData.sitter_rating ? currentUserData.sitter_rating : 'N/A'}`}
            </Container>
            <Container className='px-0' fluid>
                <RequestList baseURL={baseURL} currentUserData={currentUserData}/>
            </Container>
        </Container>
    )
}