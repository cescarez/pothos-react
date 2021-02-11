import React, { useState } from 'react';
import UploadForm from './UploadForm';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Gallery.css';
import ImageGrid from './ImageGrid';
import Modal from './Modal'

export default function Gallery() {
    const [selectedImg, setSelectedImg] = useState(null);

    return(
        <div>
            <h2>Gallery</h2>
            {/* <Button className='inbox-button' variant='outline-info' as={Link} to={'/inbox'}>Return to Inbox</Button> */}
            {/* <UploadForm /> */}
            <ImageGrid setSelectedImg={setSelectedImg}/>
            {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
        </div>
    )
}