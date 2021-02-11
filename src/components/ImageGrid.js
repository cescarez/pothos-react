import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'
// import useFirestore from '../hooks/useFirestore';
import './Gallery.css';

const ImageGrid = () => {
    // const { docs } = useFirestore('images');
    const match = useRouteMatch('/gallery/:id');
    const requestID = match.params.id;
    const [error, setError] = useState('');
    const [photoList, setPhotoList] = useState(null);

    const loadPhotoList = () => {
        axios.get('http://localhost:5000/photos-by-request/' + requestID)
            .then((response) => {
                const apiPhotos = Object.values(response.data)
                setPhotoList(apiPhotos);
            }).catch((error) => {
                const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }

    useEffect(() => {
        loadPhotoList();
    },[])

    return(
        <div className='img-grid'>
            { photoList && photoList.map(photo => (
                <div className='img-wrap' key={photo.id}>
                    <img src={photo.photo_url} alt='plant pic' />
                </div>
            ))}
        </div>
    )
}

export default ImageGrid;