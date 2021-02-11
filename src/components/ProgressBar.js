import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage'
import './Gallery.css';

const ProgressBar = ({ file, setFile, requestID, sender, baseURL }) => {
    const { url, progress } = useStorage(file, requestID, sender, baseURL);
    
    useEffect(() => {
        if (url) {
            setFile(null);
        }
    },[url, setFile])
    
    return (
        <div className='progress-bar' style={{ width: progress + '%' }} />
    )
}

export default ProgressBar;