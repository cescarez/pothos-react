import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import axios from 'axios';

const BASE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='

const SitterMap = ({ sitterList, currentUserData }) => {
    const [error, setError] = useState({});
    const [mapCenter, setMapCenter] = useState({ lat: 39.8097343, lng: -98.5556199 });
    const [zoom, setZoom] = useState(8);
    const [sitterCoords, setSitterCoords] = useState(null);

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
            if (sitter.user_id !== currentUserData.userID) {
                axios.get(createGeocodeURL(sitter))
                    .then((response) =>{
                        const apiSitter = {
                            label: sitter.full_name,
                        }
                        apiSitter.address_coords = response.data.results[0].geometry.location
                        apiSitterCoords.push(apiSitter);
                        // console.log(`successfully set user address coords for user ${sitter.full_name}`)
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
        return(
            <div>
                {sitterCoords.map((sitter)=>{
                    // console.log(`dropped marker for ${sitter.label}`)
                    return(
                        <Marker
                            position={sitter.address_coords}
                            label={sitter.label}
                            icon='http://maps.google.com/mapfiles/ms/icons/blue.png'
                        />
                    )
                })}
            </div>
        )
    }
    
    const SitterMap = withScriptjs(withGoogleMap(((props) =>
        <GoogleMap
            defaultZoom={zoom}
            defaultCenter={mapCenter}
        >
            {currentUserData && <Marker position={mapCenter} label='You' />}
            {sitterList && showSitterMarkers()}
        </GoogleMap>
    )))

    return (
        <div>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            <SitterMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

export default SitterMap;