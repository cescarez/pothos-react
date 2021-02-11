import React, {useState} from 'react';
import emoji from 'emoji-dictionary';
import {Container, Image, Row, Col} from 'react-bootstrap';
import axios from 'axios';
// import selectedIcon from '../images/rating_icons/green_leaf.png';
// import unselectedIcon from '../images/rating_icons/grey_leaf.png';

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function RatingForm({baseURL, request, currentUserData}) {
    const selectedIcon = AiFillStar
    const unselectedIcon = AiOutlineStar
    const [rating, setRating] = useState(4);

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
        return (
            <Row>
                {ratingIcons.map((icon) => icon)}
            </Row>
        )

    }

    return (
        <Container fluid className='pyj-auto'>
            {displayRating()}
        </Container>
    )
}
