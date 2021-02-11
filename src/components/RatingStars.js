import React from 'react';
import {Row} from 'react-bootstrap';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";


const RatingStars = ({currentRating, maxRating}) => {

    const displayRating = () => {
        const ratingIcons = []

        for(let i = 0; i < currentRating; i++){
            ratingIcons.push(
                <AiFillStar/> 
            )
        }
        if (currentRating < maxRating) {
            for(let i = currentRating; i < maxRating; i++){
                ratingIcons.push(
                    <AiOutlineStar/> 
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