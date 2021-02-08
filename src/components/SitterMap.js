import React, {useEffect, useState} from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {Container} from 'react-bootstrap';

import './SitterMap.css'

const google = window.google;

const SitterMap = ({sitterList, currentUserData}) => {

    const [error, setError] = useState({});
    // const [geocoder, setGeocoder] = useState(null);
    // const [map, setMap] = useState(null);

    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY,
        version: "weekly",
    });

    loader
        .load()
        .then(() => {
            const map = new google.maps.Map(document.getElementById("map_canvas"), {
                center: {lat: 39.8097343, lng: -98.5556199},
                zoom: 8,
            });
            const geocoder = new google.maps.Geocoder();
            const currentUserAddress = `${currentUserData.address.street},+${currentUserData.address.city},+${currentUserData.address.state},+${currentUserData.address.postal_code}`;
            geocodeCurrentUserAddress(geocoder, map, currentUserAddress);

            // sitterList.forEach((sitter) => {
            //     const address = `${sitter.address.street},+${sitter.address.city},+${sitter.address.state},+${sitter.address.postal_code}`
            //     geocodeSitterAddress(geocoder, map, address, sitter.full_name)
            // })
        })
        .catch(error => {
            const message = `Google Maps initial loading failed. ${error.message}`
            setError({variant:'danger', message: message})
            console.log(message)
        });


    const geocodeCurrentUserAddress = (geocoder, resultsMap, address) => {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                resultsMap.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    label: 'You are Here',
                });
                console.log(`successful geocode response for address: ${address}`)
            } else {
                alert(`Geocode of current user's address: ${address} was not successful for the following reason: ` + status);
            }
        });
    }

    function geocodeSitterAddress(geocoder, resultsMap, address, sitterName) {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    label: sitterName,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
                    // url: ...
                });
                // console.log(`successful geocode response for address: ${address}`)
            } else {
                alert(`Geocode of ${address} was not successful for the following reason: ` + status);
            }
        });
    }

    return (
        <Container className='sitter-map__div-container'>
            <div id="map_canvas"></div>
        </Container>
    )
}

export default SitterMap;