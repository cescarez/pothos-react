import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
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

    useEffect(() => {
        currentUserData &&
            axios.get(createGeocodeURL(currentUserData))
                .then((response) => {
                    currentUserData.addressString = `${currentUserData.address.street}, ${currentUserData.address.city}, ${currentUserData.address.state} ${currentUserData.address.postal_code}`

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
                    .then((response) =>{
                        const apiSitter = {
                            title: sitter.full_name,
                            addressString: `${sitter.address.street}, ${sitter.address.city}, ${sitter.address.state} ${sitter.address.postal_code}`
                        }
                        apiSitter.addressCoords = response.data.results[0].geometry.location
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
    
    const SitterMap = withScriptjs(withGoogleMap(((props) =>
        <GoogleMap
            defaultZoom={zoom}
            defaultCenter={mapCenter}
        >
            {currentUserData && <Marker position={mapCenter} title={currentUserData.full_name + '\n' + currentUserData.addressString} icon={userPin} />}
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