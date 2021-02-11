import React, {useState, useEffect} from 'react';
import {Row, Alert} from 'react-bootstrap';
import axios from 'axios';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import RatingForm from './RatingForm';

const MAX_RATING = 4;

const Rating = ({baseURL, request, currentUserData}) => {
    const [error, setError] = useState({});
    const [rating, setRating] = useState(0);
    const [ratingType, setRatingType] = useState(null);

    useEffect(()=>{
        if(currentUserData.userID === request.owner) {
            setRating(request.sitter_rating);
            setRatingType('sitter');
        } else {
            setRating(request.owner_rating);
            setRatingType('owner');
        }
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

    const displayRating = () => {
        const ratingIcons = []
        for(let i = 0; i < rating; i++){
            ratingIcons.push(
                <AiFillStar/> 
            )
        }
        if (rating < MAX_RATING) {
            for(let i = rating; i < MAX_RATING; i++){
                ratingIcons.push(
                    <AiOutlineStar/> 
                )
            }
        }
        return (ratingIcons.map((icon) => icon))

    }

    return (
        <Row className='justify-content-center'>
            {error.message &&
                <Alert variant={error.variant}>{error.message}</Alert> 
            }
            {rating ? displayRating() : <RatingForm baseURL={baseURL} request={request} currentUserData={currentUserData} max_rating={MAX_RATING} onRatingSubmit={onRatingSubmitCallback} />}
        </Row>
    )
}

export default Rating;