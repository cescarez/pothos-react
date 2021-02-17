import React from 'react'
import RequestList from './RequestList'
import {Container} from 'react-bootstrap'

export default function OwnerDashboard({ baseURL, currentUserData, maxRating }) {
    return (
        <Container className='px-0' fluid>
            <Container className='text-right'>
                {`Current Sitter Rating: ${currentUserData.sitter_rating ? currentUserData.sitter_rating.toFixed(2) : 'N/A'}`}
            </Container>
            <Container className='px-0' fluid>
                <RequestList baseURL={baseURL} currentUserData={currentUserData} maxRating={maxRating} />
            </Container>
        </Container>
    )
}