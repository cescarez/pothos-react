import React, { useState } from 'react';

const UploadForm = () => {
    const [file, setFile] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];

        if (selected) {
            setFile(selected);
        }
    }

    return(
        <form>
            <input type='file' onChange={changeHandler} />
        </form>
    )
}

export default UploadForm;