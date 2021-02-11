import React, { useState } from 'react';
import UploadForm from './UploadForm';
import { Button } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import './Gallery.css';
import ImageGrid from './ImageGrid';
import Modal from './Modal'

export default function Gallery({location}) {
    const [selectedImg, setSelectedImg] = useState(null);

    const match = useRouteMatch('/gallery/:id');
    const requestID = match.params.id;

    console.log(location)
    const {baseURL, currentUserID, otherUserName } = location.state;

    const requestRouterParams = () => {
        return ({
            pathname: '/requests/' + requestID,
            state: {
                baseURL: baseURL,
                currentUserID: currentUserID,
                otherUserName: otherUserName
            }
        })
    } 

    return(
        <div>
            <h2>Gallery</h2>
            {/* <Button className='inbox-button' variant='outline-info' as={Link} to={'/inbox'}>Return to Inbox</Button> */}
            <Button className='inbox-button' variant='outline-info'>
                <Link to={requestRouterParams}>Return to Inbox</Link>
            </Button>
            {/* <UploadForm /> */}
            <ImageGrid setSelectedImg={setSelectedImg}/>
            {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
        </div>
    )
}