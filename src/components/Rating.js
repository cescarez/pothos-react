import React, {useState} from 'react';
import emoji from 'emoji-dictionary';
import {Container, Image} from 'react-bootstrap';
import axios from 'axios';
import selectedIcon from '../images/rating_icons/green_leaf.png';
import unselectedIcon from '../images/rating_icons/grey_leaf.png';


export default function Rating({baseURL, requestID, user}) {
    const [rating, setRating] = useState(null);

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
        for(let i = 0; i < rating; i++) {
            return (
                {selectedIcon}
                // <Image src={selectedIcon}
            )
        }
    }

    return (
        <Container>

            
        </Container>
    )
}
