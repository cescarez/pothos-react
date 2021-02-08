import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import axios from 'axios';

const BASE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='

const SitterMap = ({ sitterList, currentUserData }) => {
    const [error, setError] = useState({});
    const [mapCenter, setMapCenter] = useState({ lat: 39.8097343, lng: -98.5556199 });
    const [zoom, setZoom] = useState(8);


    useEffect(() => {
        axios.get(createGeocodeURL(currentUserData))
            .then((response) => {
                setMapCenter(response.data.results[0].geometry.location);
                setZoom(11);
            })
            .catch((error) => {
                const message = `Did not load current user data. ${error.message}`
                setError({ variant: 'warning', message: message })
            })
    }, [currentUserData])

    useEffect(() => {
        sitterList.forEach((sitter) => {
            sitter.address_query = createGeocodeURL(sitter)
        })
    }, [sitterList])


    const createGeocodeURL = (user) => {
        return (
            BASE_GEOCODE_URL +
            (`${user.address.street}+${user.address.city}+${user.address.state}+${user.address.postal_code}`).replace(' ', '+')
            + '&key='
            + process.env.REACT_APP_GOOGLE_CLOUD_API_KEY
        )
    }

    // function geocodeSitterAddress(geocoder, resultsMap, address, sitterName) {
    //     geocoder.geocode({ address: address }, (results, status) => {
    //         if (status === "OK") {
    //             new google.maps.Marker({
    //                 map: resultsMap,
    //                 position: results[0].geometry.location,
    //                 label: sitterName,
    //                 icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
    //                 // url: ...
    //             });
    //             // console.log(`successful geocode response for address: ${address}`)
    //         } else {
    //             alert(`Geocode of ${address} was not successful for the following reason: ` + status);
    //         }
    //     });
    // }


    const currentUserMarker = () => {
        return (
            <Marker position={mapCenter} />
        )
    }

    const sitterMarkers = () => {

    }

    const SitterMap = withScriptjs(withGoogleMap(((props) =>
        <GoogleMap
            defaultZoom={zoom}
            defaultCenter={mapCenter}
        >
            {currentUserData && currentUserMarker()}
            {sitterList && sitterMarkers()}

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