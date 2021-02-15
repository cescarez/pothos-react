import React, { useEffect } from 'react';
import useStorageProfile from '../hooks/useStorageProfile'
import './Gallery.css';

const ProgressBarProfile = ({ file, setFile, setUrl }) => {
    const { url, progress } = useStorageProfile(file);
    
    useEffect(() => {
        if (url) {
            setUrl(url);
            setFile(null);
        }
    },[url, setFile, setUrl])
    
    return (
        <div className='progress-bar' style={{ width: progress + '%' }} />
    )
}

export default ProgressBarProfile;