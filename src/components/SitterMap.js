import React, { useEffect, useState } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { LoadScript, GoogleMap, Marker} from '@react-google-maps/api';
import axios from 'axios';
import userPin from '../images/map_icons/pin_danger.png';
import sitterPin from '../images/map_icons/pin_success.png';

const BASE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='

const SitterMap = ({ sitterList, currentUserData }) => {
    const [error, setError] = useState({});
    //default center is center of the U.S.
    const [mapCenter, setMapCenter] = useState({ lat: 39.8097343, lng: -98.5556199 });
    const [zoom, setZoom] = useState(8);
    const [sitterCoords, setSitterCoords] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        currentUserData &&
            axios.get(createGeocodeURL(currentUserData))
                .then((response) => {
                    currentUserData.addressString = `${currentUserData.address.street}, ${currentUserData.address.city}, ${currentUserData.address.state} ${currentUserData.address.postal_code}`

                    setZoom(15);
                    setMapCenter(response.data.results[0].geometry.location);
                })
                .catch((error) => {
                    const message = `Did not load current user data. ${ error.response ? error.response.data.message : null}`
                    setError({ variant: 'warning', message: message })
                })
    }, [])

    const loadSitterListMarkers = () => {
        const apiSitterCoords = []
        sitterList.forEach((sitter) => {
            if (sitter.userID !== currentUserData.userID) {
                axios.get(createGeocodeURL(sitter))
                    .then((response) => {
                        const apiSitter = {
                            title: sitter.full_name,
                            addressString: `${sitter.address.street}, ${sitter.address.city}, ${sitter.address.state} ${sitter.address.postal_code}`
                        }
                        apiSitter.addressCoords = response.data.results[0].geometry.location
                        apiSitterCoords.push(apiSitter);

                        console.log(`successfully set user address coords for user ${sitter.full_name}`)
                    })
                    .catch((error) => {
                        const message = `Did not load sitter ${sitter.full_name} user data. ${error.response ? error.response.data.message : error.message}`
                        setError({ variant: 'warning', message: message })
                        console.log(message);
                    })
            }
        })
        setSitterCoords(apiSitterCoords)
    }

    useEffect(() => {
        sitterList &&
            loadSitterListMarkers();
    }, [])

    const createGeocodeURL = (user) => {
        return (
            BASE_GEOCODE_URL +
            (`${user.address.street}+${user.address.city}+${user.address.state}+${user.address.postal_code}`).replace(' ', '+')
            + '&key='
            + process.env.REACT_APP_GOOGLE_CLOUD_API_KEY
        )
    }

    const showSitterMarkers = () => {
        return (
            <div>
                {sitterCoords.map((sitter, i)=>{
                    // console.log(`dropped marker for ${sitter.title}`)
                    return(
                        <Marker
                            position={sitter.addressCoords}
                            title={sitter.title + '\n' + sitter.addressString}
                            icon={sitterPin}
                        />
                    )
                })}
            </div>
        )

    }

    const showSitterMap = () => {
        return (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}>
                <GoogleMap
                    zoom={zoom}
                    center={mapCenter}
                    mapContainerStyle={{
                        height: '400px',
                        width: 'auto'
                    }}
                >
                    {currentUserData && <Marker position={mapCenter} title={currentUserData.full_name + '\n' + currentUserData.addressString} icon={userPin}/>}
                    {sitterCoords && showSitterMarkers()}
                </GoogleMap>
            </LoadScript>
        )
    }

    return (
        <div className='h-100'>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            { isLoaded ? 
                showSitterMap() 
            : 
                <Container>
                    <div className='invisible'>{setTimeout(() => {
                        setIsLoaded(true)
                    }, 500)}</div>
                    <Spinner animation="border" variant="secondary" style={{height: '200px', width: '200px'}}/>
                </Container>
            }
        </div>
    )
}

export default SitterMap;