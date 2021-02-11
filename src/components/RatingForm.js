import React, {useState, useEffect} from 'react';
import {Container, Image, Row, Col} from 'react-bootstrap';
import axios from 'axios';
// import selectedIcon from '../images/rating_icons/green_leaf.png';
// import unselectedIcon from '../images/rating_icons/grey_leaf.png';

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const RatingForm = ({baseURL, request, currentUserData, max_rating}) => {
    const selectedIcon = AiFillStar
    const unselectedIcon = AiOutlineStar
    // const [rating, setRating] = useState(0);
    // const [displayedRating, setDisplayedRating] = useState(0);
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [ratingForm, setRatingForm] = useState({displayedRating: 1, currentRating: 1})

    useEffect(() => {
        if(currentUserData.userID === request.owner) {
            setCurrentUserRole('owner');
        } else {
            setCurrentUserRole('sitter');
        }
    }, [ratingForm])

    const onStarClick = (newRating) => {
        // const newRating = parseInt(event.target.name)
        console.log(newRating)
        setRatingForm({...ratingForm, currentRating: newRating})
    }


    const onStarHover = (newRating) => {
        // const newRating = parseInt(event.target.name)
        console.log(newRating)
        setRatingForm({...ratingForm, displayedRating: newRating})
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
                <AiFillStar onMouseOver={()=>onStarHover(i+1)} onMouseLeave={(()=>displayRating())} onClick={()=>onStarClick(i+1)} /> 
            )
        }
        if (ratingForm.displayedRating < max_rating) {
            for(let i = ratingForm.displayedRating; i < max_rating; i++){
                ratingIcons.push(
                    <AiOutlineStar onMouseOver={()=>onStarHover(i+1)} onMouseLeave={(()=>displayRating())} onClick={()=>onStarClick(i+1)} /> 
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