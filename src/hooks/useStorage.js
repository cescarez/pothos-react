import { useState, useEffect } from 'react';
import { projectStorage } from '../firebase';
import axios from 'axios';

const useStorage = (file, requestID, sender, baseURL) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storageRef = projectStorage.ref(file.name);

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            axios.all([
                axios.post(baseURL + '/photos',{
                    "photo_url": url,
                    "request_id": requestID
                }),
                axios.post(baseURL + '/messages', {
                    "message": "",
                    "photo": true,
                    "photo_url": url,
                    "request_id": requestID,
                    "sender": sender
                })
            ])
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error)
            })
            setUrl(url);
        })
    },[file]);

    return { progress, url, error }
}

export default useStorage;