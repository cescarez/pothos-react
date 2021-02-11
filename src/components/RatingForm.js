import React, {useState, useEffect} from 'react';
import {Container, Image, Row, Col} from 'react-bootstrap';
import axios from 'axios';
// import selectedIcon from '../images/rating_icons/green_leaf.png';
// import unselectedIcon from '../images/rating_icons/grey_leaf.png';

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const MAX_RATING = 4;

const RatingForm = ({baseURL, request, currentUserData}) => {
    const selectedIcon = AiFillStar
    const unselectedIcon = AiOutlineStar
    // const [rating, setRating] = useState(0);
    // const [displayedRating, setDisplayedRating] = useState(0);
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [ratingForm, setRatingForm] = useState({displayedRating: 0, currentRating: 0})

    useEffect(() => {
        if(currentUserData.userID === request.owner) {
            setCurrentUserRole('owner');
        } else {
            setCurrentUserRole('sitter');
        }
        displayRating();
    }, [ratingForm])

    const onStarClick = (newRating) => {
        // const newRating = parseInt(event.target.name)
        console.log(newRating)
        setRatingForm({...ratingForm, currentRating: newRating})
        displayRating()
    }

    const onRatingSubmit = () => {
        axios.put(baseURL + '/request', request.request_id)
        .then ((response) => {

        })
        .catch((error) => {

        })
    }

    const displayRating = () => {
        const ratingIcons = []
        for(let i = 0; i < ratingForm.displayedRating; i++){
            ratingIcons.push(
                <AiFillStar/> 
            )
        }
        if (ratingForm.displayedRating < MAX_RATING) {
            for(let i = ratingForm.displayedRating; i < MAX_RATING; i++){
                ratingIcons.push(
                    <AiOutlineStar onClick={()=>onStarClick(i+1)} value={i} /> 
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