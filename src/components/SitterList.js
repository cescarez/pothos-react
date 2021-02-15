import React from 'react';
import {Table, Card, Container, Row, Col, Image } from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import pothosPic from '../images/pothos_large.png';

import './SitterList.css'

import LoadingSpinner from './LoadingSpinner';
import RatingStars from './RatingStars';

const SitterList = ({ sitterList, currentUserData, maxRating }) => {

    const showSitterList = () => {
        return(
            // <Table className='sitter-list__table'>
            //     <thead>
            //         <tr>
            //             <th>Name</th>
            //             <th>Address</th>
            //             <th>Phone Number</th>
            //             <th>Sitter's Avg Rating</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {(sitterList).map((sitter) => {
            //             if (sitter.userID !== currentUserData.userID) {
            //                 return(
            //                     <tr key={sitter.userID}>
            //                         <td>
            //                             <Link to={`/users/${sitter.userID}`}>
            //                                 {sitter.full_name}
            //                             </Link>
            //                         </td>
            //                         <td>
            //                             <Link to={`/users/${sitter.userID}`}>
            //                                 {`${sitter.address.street} ${sitter.address.city}, ${sitter.address.state} ${sitter.address.postal_code}`}
            //                             </Link>
            //                         </td>
            //                         <td>
            //                             <Link to={`/users/${sitter.userID}`}>
            //                                 {sitter.phone_number}
            //                             </Link>
            //                         </td>
            //                         <td>
            //                             <Link to={`/users/${sitter.userID}`}>
            //                                 { sitter.sitter_rating ? <RatingStars currentRating={sitter.sitter_rating} maxRating={maxRating} /> : 'N/A'}
            //                             </Link>
            //                         </td>
            //                     </tr>
            //                 )
            //             } else {
            //                 return null
            //             }
            //         })}
            //     </tbody>
            // </Table>
            <Container className='dashboard-container'>
                {(sitterList).map((sitter) => {
                    if (sitter.userID !== currentUserData.userID) {
                        return(
                            <Link className='dashboard-link' to={`/users/${sitter.userID}`}>
                                <Row className='dashboard-row' id={`sitter-card-${sitter.userID}`}>
                                    <Col>
                                        <Image className='profile-pic' src={sitter.avatar_url? sitter.avatar_url : pothosPic} alt='profile pic' roundedCircle/>
                                    </Col>
                                    <Col xs={6}>
                                        <h4>{sitter.full_name}</h4>
                                        <p>{sitter.bio}</p>
                                    </Col>
                                    <Col>
                                        <h6>Avg Rating</h6>
                                        { sitter.sitter_rating ? <RatingStars currentRating={sitter.sitter_rating} maxRating={maxRating} /> : 'N/A'}
                                    </Col>
                                    <Col>
                                        <h6>Watering Rate:</h6>
                                        <p>${sitter.price_rate.water_by_plant}/plant</p>
                                    </Col>
                                </Row>
                            </Link>
                        );
                    }
                })}
            </Container>
        )
    }

    if (!sitterList) {
        return <div><LoadingSpinner/></div>;
    }

    return (
        <div className='sitter-list'>
            {showSitterList()}
        </div>
    )
}

export default SitterList;