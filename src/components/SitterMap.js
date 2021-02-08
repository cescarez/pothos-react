import React, {useEffect, useState} from 'react';
import { Loader, Geocoder, Map, Marker } from "@googlemaps/js-api-loader"
import axios from 'axios';

import './SitterMap.css'

//mapping code taken from https://stackoverflow.com/a/29463348

const BASE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='

const SitterMap = ({sitterList, currentUserData}) => {
    const [error, setError] = useState({});
    const [geocoder, setGeocoder] = useState(null);
    const [map, setMap] = useState(null);

    // var locations = [
    // ['Location 1 Name', 'New York, NY', 'Location 1 URL'],
    // ['Location 2 Name', 'Newark, NJ', 'Location 2 URL'],
    // ['Location 3 Name', 'Philadelphia, PA', 'Location 3 URL']
    // ];

    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY,
        version: "weekly",
    });

    useEffect(()=>{
        setMap(new google.maps.Map(document.getElementById("map_canvas"), {
            center: {lat: 39.8097343, lng: -98.5556199},
            zoom: 8,
        }));
        setGeocoder(new google.maps.Geocoder());
        const currentUserAddress = `${currentUserData.address.street},+${currentUserData.address.city},+${currentUserData.address.state},+${currentUserData.address.postal_code}`;
        geocodeCurrentUserAddress(geocoder, map, currentUserAddress);
    }, [])
    const geocodeCurrentUserAddress = (geocoder, resultsMap, address) => {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                map.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    label: 'You are Here',
                });
            } else {
                alert(`Geocode of current user's address: ${address} was not successful for the following reason: ` + status);
            }
        });
    }

    useEffect(()=>{
        sitterList.forEach((sitter) => {
            const address = `${sitter.address.street},+${sitter.address.city},+${sitter.address.state},+${sitter.address.postal_code}`
            geocodeSitterAddress(geocoder, map, address, sitter.full_name)
        })
    }, [])
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
            } else {
                alert(`Geocode of ${address} was not successful for the following reason: ` + status);
            }
        });
    }

    return (
        <div id="map_canvas"></div>
    )
}

export default SitterMap;