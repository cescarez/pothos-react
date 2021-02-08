import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const SitterMap = ({sitterList, currentUserData}) => {
    const [error, setError] = useState({});

    const currentUserMarker = () => {
        return (
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
        )
    }

    const sitterMarkers = () => {

    }

    const SitterMap = withScriptjs(withGoogleMap(((props) => 
        <GoogleMap
            defaultZoom={props.zoom ? props.zoom : 8}
            defaultCenter={props.center ? props.center : {lat: 39.8097343, lng: -98.5556199}} 
        >
            {currentUserData && currentUserMarker()}
            {sitterList && sitterMarkers()}

        </GoogleMap>
    )))

    return (
        <SitterMap 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default SitterMap;