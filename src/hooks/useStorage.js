import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase';
import axios from 'axios';

const useStorage = (file, requestID, sender, baseURL) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //references
        const storageRef = projectStorage.ref(file.name);
        // const collectionRef = projectFirestore.collection('images');

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            // const createdAt = timestamp();
            // collectionRef.add({ url, createdAt });
            axios.post(baseURL + '/photos',{
                "photo_url": url,
                "sender": sender,
                "request_id": requestID
            }).then((response) => {
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