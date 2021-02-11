import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './Gallery.css';

const UploadForm = ({loadMessageList, requestID, sender, baseURL}) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg)');
        }
    }

    return(
        <form>
            <label className='upload-label'>
                <input type='file' onChange={changeHandler} />
                <span>+</span>
            </label>
            <div className='output'>
                { error && <div className='error'>{error}</div>}
                {file && 
                <ProgressBar 
                    file={file} 
                    setFile={setFile} 
                    requestID={requestID} 
                    sender={sender} 
                    baseURL={baseURL} 
                    loadMessageList={loadMessageList}
                />}
            </div>
        </form>
    )
}

export default UploadForm;