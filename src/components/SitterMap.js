import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import { compose, withProps } from "recompose"

const SitterMap = ({sitterList, currentUserData}) => {
    const [error, setError] = useState({});

    const currentUserMarker = () => {
        return (
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
        )
    }

    const sitterMarkers = () => {

    }

    const sitterMap = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap
    )((props) => 
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{lat: 39.8097343, lng: -98.5556199}} 
        >
            {currentUserData && currentUserMarker()}
            {sitterList && sitterMarkers()}

        </GoogleMap>
    )

    return (
        <sitterMap />
    )
}

export default SitterMap;