import React, {useState, useEffect} from 'react';
import {Row, Alert} from 'react-bootstrap';
import axios from 'axios';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import RatingForm from './RequestRatingForm';
import RatingStars from './RatingStars';


const Rating = ({baseURL, request, currentUserData, maxRating}) => {
    const [error, setError] = useState({});
    const [rating, setRating] = useState(null);
    const [ratingType, setRatingType] = useState(null);

    const loadRatings = () => {
        if(currentUserData.userID === request.owner) {
            setRating(request.sitter_rating);
            setRatingType('sitter');
        } else {
            setRating(request.owner_rating);
            setRatingType('owner');
        }
    }

    useEffect(()=>{
        loadRatings();
    }, [])

    const onRatingSubmitCallback = (newRating) => {
        axios.post(baseURL + '/ratings/' + request.request_id, {[`${ratingType}_rating`]: newRating})
        .then ((response) => {
            setRating(newRating);
            setError({});
        })
        .catch((error) => {
            const message=`There was an error with your rating. ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
            setError({variant: 'danger', message: message});
            console.log(message);

        })
    }

    return (
        <Row className='justify-content-center'>
            {error.message &&
                <Alert variant={error.variant}>{error.message}</Alert> 
            }
            { rating ? <RatingStars currentRating={rating} maxRating={maxRating} /> : <RatingForm baseURL={baseURL} request={request} currentUserData={currentUserData} maxRating={maxRating} onRatingSubmit={onRatingSubmitCallback} />}
        </Row>
    )
}

export default Rating;