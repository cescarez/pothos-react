import React, {useState, useEffect} from 'react';
import {Container, Image, Row, Col} from 'react-bootstrap';
import axios from 'axios';
// import selectedIcon from '../images/rating_icons/green_leaf.png';
// import unselectedIcon from '../images/rating_icons/grey_leaf.png';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import RatingForm from './RatingForm';

const MAX_RATING = 4;

const Rating = ({baseURL, request, currentUserData}) => {
    const selectedIcon = AiFillStar
    const unselectedIcon = AiOutlineStar
    const [rating, setRating] = useState(0);

    useEffect(()=>{
        if(currentUserData.userID === request.owner) {
            setRating(request.sitter_rating);
        } else {
            setRating(request.owner_rating);
        }
    })

    const onHover = () => {

    }

    const onRatingSubmit = () => {
        axios.post(baseURL + '/request', rating)
        .then ((response) => {

        })
        .catch((error) => {

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
            {rating ? displayRating() : <RatingForm baseURL={baseURL} request={request} currentUserData={currentUserData} />}
        </Row>
    )
}

export default Rating;