import React from 'react';
import {Row} from 'react-bootstrap';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";


const RatingStars = ({currentRating, maxRating, disabled}) => {

    const displayRating = () => {
        const ratingIcons = []

        for(let i = 0; i < currentRating; i++){
            ratingIcons.push(
                <AiFillStar opacity={disabled ? '0.2' : '1'} /> 
            )
        }
        if (currentRating < maxRating) {
            for(let i = currentRating; i < maxRating; i++){
                ratingIcons.push(
                    <AiOutlineStar opacity={disabled ? '0.3' : '1'} /> 
                    // <AiOutlineStar /> 
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

export default RatingStars;