import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage'
import './Gallery.css';

const ProgressBar = ({ file, setFile }) => {
    const { url, progress } = useStorage(file);
    
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