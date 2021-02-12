import React from 'react';
import {Table, Card, Container, Row, Col } from 'react-bootstrap';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import pothosPic from '../images/pothos_large.png';

import './SitterList.css'

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
                    return(
                        <Link to={`/users/${sitter.userID}`}>
                        <Row className='dashboard-row'>
                            <Col>
                                {/* <Link to={`/users/${sitter.userID}`}> */}
                                    <img className='profile-pic' src={pothosPic} alt='profile pic'/>
                                {/* </Link> */}
                            </Col>
                            <Col xs={6}>
                                {/* <Link to={`/users/${sitter.userID}`}> */}
                                    <h4>{sitter.full_name}</h4>
                                    <p>{sitter.bio}</p>
                                {/* </Link> */}
                            </Col>
                            <Col>
                                {/* <Link to={`/users/${sitter.userID}`}> */}
                                    <h6>Avg Rating</h6>
                                    { sitter.sitter_rating ? <RatingStars currentRating={sitter.sitter_rating} maxRating={maxRating} /> : 'N/A'}
                                {/* </Link> */}
                            </Col>
                            <Col>
                                {/* <Link to={`/users/${sitter.userID}`}> */}
                                    <h6>Watering Rate:</h6>
                                    <p>${sitter.price_rate.water_by_plant}/plant</p>
                                {/* </Link> */}
                            </Col>
                        </Row>
                        </Link>
                    );
                })}
            </Container>
        )
    }

    if (!sitterList) {
        return <div></div>;
    }

    return (
        <div className='sitter-list'>
            {showSitterList()}
        </div>
    )
}

export default SitterList;