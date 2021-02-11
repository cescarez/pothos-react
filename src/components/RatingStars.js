import React, {useState, useEffect} from 'react';
import {Row, Alert} from 'react-bootstrap';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";


const RatingStars = ({currentRating, maxRating}) => {

    const displayRating = () => {
        const ratingIcons = []
        // console.log('entered displayRating')
        // console.log(currentRating)
        // console.log(maxRating)

        for(let i = 0; i < currentRating; i++){
            // console.log('adding a filled star')
            ratingIcons.push(
                <AiFillStar/> 
            )
        }
        if (currentRating < maxRating) {
            for(let i = currentRating; i < maxRating; i++){
                // console.log('adding an empty star')
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