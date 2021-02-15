import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import userPin from '../images/map_icons/pin_danger.png';
import sitterPin from '../images/map_icons/pin_success.png';


const SitterMap = ({ sitterList, currentUserData, baseGeocodeURL }) => {
    const [error, setError] = useState({});
    //default center is center of the U.S.
    const [mapCenter, setMapCenter] = useState({ lat: 39.8097343, lng: -98.5556199 });
    const [zoom, setZoom] = useState(8);
    const history = useHistory();

    const formattedAddress = (user) => {
        return (
            (`${user.address.street} ${user.address.city} ${user.address.state} ${user.address.postal_code}`)
        )
    }

    useEffect(() => {
        currentUserData &&
            axios.get(baseGeocodeURL + formattedAddress(currentUserData) + '&key=' + process.env.REACT_APP_GOOGLE_CLOUD_API_KEY)
                .then((response) => {
                    currentUserData.addressString = `${currentUserData.address.street}, ${currentUserData.address.city}, ${currentUserData.address.state} ${currentUserData.address.postal_code}`

                    setZoom(15);
                    setMapCenter(response.data.results[0].geometry.location);
                })
                .catch((error) => {
                    const message = `Did not load current user data. ${error.response ? error.response.data.message : null}`
                    setError({ variant: 'warning', message: message })
                })
    }, [])

    const onMarkerClick = (userID) => {
        window.location.href = `#sitter-card-${userID}`
    }

    const showSitterMarkers = () => {
        return (
            <div>
                {sitterList.map((sitter, i) => {
                    const initials = sitter.full_name.split(' ').map((word) => word[0]).join('')
                    if (sitter.userID !== currentUserData.userID) {
                        return (
                            <Marker
                                position={sitter.address_coords}
                                title={sitter.full_name + '\n' + formattedAddress(sitter)}
                                icon={sitterPin}
                                label={initials}
                                clickable={true}
                                onClick={() => onMarkerClick(sitter.userID)}
                            />
                        )
                    }
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
                    {currentUserData && <Marker position={mapCenter} title={currentUserData.full_name + '\n' + currentUserData.addressString} icon={userPin} />}
                    {sitterList && showSitterMarkers()}
                </GoogleMap>
            </LoadScript>
        )
    }

    return (
        <div className='h-100'>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            { showSitterMap()}
        </div>
    )
}

export default SitterMap;