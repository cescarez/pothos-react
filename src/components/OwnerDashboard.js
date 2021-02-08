import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Alert, Container } from 'react-bootstrap';

import SitterMap from './SitterMap';
import SitterList from './SitterList';

const OwnerDashboard = ({ baseURL, currentUserData }) => {
    const [error, setError] = useState({variant: '', message: ''});
    const [sitterList, setSitterList] = useState(null);
    const [showMap, setShowMap] = useState(false);

    useEffect(()=>{
        axios.get(baseURL + '/sitters')
            .then((response) => {
                const apiSitterList = Object.values(response.data)
                if (Object.keys(response.data)[0] !== 'message') {
                    const userIDs = Object.keys(response.data)
                    for(let i in userIDs) {
                        apiSitterList[i].userID = userIDs[i];
                    }
                    setSitterList(apiSitterList)
                } else {
                    setError({variant: 'warning', message: Object.values(response.data)[0]})
                }
            })
            .catch((error) => {
                const message=`There was an error with your request. ${error.message}.`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }, [baseURL])

    const onViewMapClick = () => {
        setShowMap(!showMap);
    }

    return (
        <Container className='px-0' fluid>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>} 
            { showMap ? 
                <div>
                    <Button variant='outline-secondary' onClick={onViewMapClick}>Hide Map</Button>
                    <SitterMap sitterList={sitterList} currentUserData={currentUserData} />
                </div> 
            : <Button variant='outline-secondary' onClick={onViewMapClick}>View Map</Button>
            }            
            <SitterList sitterList={sitterList} currentUserData={currentUserData}/>
        </Container>
    )
}

export default OwnerDashboard;