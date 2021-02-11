import React from 'react';
import UploadForm from './UploadForm';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Gallery.css';
import ImageGrid from './ImageGrid';

export default function Gallery() {
    return(
        <div>
            <h2>Gallery</h2>
            {/* <Button className='inbox-button' variant='outline-info' as={Link} to={'/inbox'}>Return to Inbox</Button> */}
            {/* <UploadForm /> */}
            <ImageGrid />
        </div>
    )
}