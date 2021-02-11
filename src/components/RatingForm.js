import React, {useState} from 'react';
import {Row} from 'react-bootstrap';

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const RatingForm = ({baseURL, request, currentUserData, max_rating, onRatingSubmit}) => {
    const [currentRating, setCurrentRating] = useState(0);

    const displayRating = () => {
        const ratingIcons = []
        for(let i = 0; i < currentRating; i++){
            ratingIcons.push(
                <AiFillStar onMouseOver={()=>setCurrentRating(i+1)} onMouseLeave={(()=>setCurrentRating(0))} onClick={()=>onRatingSubmit(currentRating)} color='gold' /> 
            )
        }
        if (currentRating < max_rating) {
            for(let i = currentRating; i < max_rating; i++){
                ratingIcons.push(
                    <AiOutlineStar onMouseOver={()=>setCurrentRating(i+1)} onMouseLeave={(()=>setCurrentRating(0))} onClick={()=>onRatingSubmit(currentRating)} /> 
                )
            }
        }
        return (ratingIcons.map((icon) => icon))
    }

    return (
        <Row className='justify-content-center'>
            {displayRating()}
        </Row>
    )
}

export default RatingForm;