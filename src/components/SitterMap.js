import React, { useEffect, useState } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import pothos from '../images/map_icons/pothos.png'
import aglaonema from '../images/map_icons/aglaonema.png'
import dieffenbachia from '../images/map_icons/dieffenbachia.png'
import ficus from '../images/map_icons/ficus.png'
import sansevieria from '../images/map_icons/sansevieria.png'

const BASE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const PLANT_ICONS = [pothos, aglaonema, dieffenbachia, ficus, sansevieria]

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
                    setZoom(15);
                    setMapCenter(response.data.results[0].geometry.location);
                })
                .catch((error) => {
                    const message = `Did not load current user data. ${error.message}`
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
                        }
                        apiSitter.address_coords = response.data.results[0].geometry.location
                        apiSitterCoords.push(apiSitter);

                        console.log(`successfully set user address coords for user ${sitter.full_name}`)
                    })
                    .catch((error) => {
                        const message = `Did not load sitter ${sitter.full_name} user data. ${error.message}`
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
                {sitterCoords.map((sitter, i) => {
                    console.log(`dropped marker for ${sitter.title}`)
                    return (
                        <div>
                            <Marker
                                position={sitter.address_coords}
                                title={sitter.title + '\n' + `${sitterList[i].address.street}, ${sitterList[i].address.city}, ${sitterList[i].address.state} ${sitterList[i].address.postal_code}`}
                                icon={PLANT_ICONS[Math.floor(Math.random() * PLANT_ICONS.length)]}
                            />
                        </div>
                    )
                })}
                {/* {setIsLoaded(true)} */}
            </div>
        )

    }

    const showSitterMap = () => {
        return (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}>
                <GoogleMap
                    zoom={zoom}
                    center={mapCenter}
                    // onLoad={onLoad}
                    mapContainerStyle={{
                        height: '400px',
                        width: 'auto'
                    }}
                >
                    {currentUserData && <Marker position={mapCenter} label='You' />}
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
                    <Spinner animation="border" variant="secondary">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Container>
            }
        </div>
    )
}

export default SitterMap;