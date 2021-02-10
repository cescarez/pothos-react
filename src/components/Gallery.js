import React from 'react';
import UploadForm from './UploadForm';
import './Gallery.css';
import ImageGrid from './ImageGrid';

export default function Gallery() {
    return(
        <div>
            <h2>Gallery</h2>
            <UploadForm />
            <ImageGrid />
        </div>
    )
}