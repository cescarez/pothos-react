import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip, Col, Row, Container, Alert, Table, Button } from 'react-bootstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaStripeS } from 'react-icons/fa';

import Rating from './RequestRating';
import Timestamp from './Timestamp';
import LoadingSpinner from './LoadingSpinner';

import './Inbox.css';

// TODO: implement unread format change

const RequestThread = ({ baseURL, maxRating, request, currentUserData }) => {
    const [otherUserName, setOtherUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(()=>{
        if (currentUserData.userID === request.owner) {
            setUserRole('owner')
            setOtherUserName(request.sitter_name)
        } else {
            setOtherUserName(request.owner_name)
            setUserRole('sitter')
        }
    }, [])

    const requestRouterParams = (requestID, otherUserName, userRole) => {
        return ({
            pathname: `/requests/${requestID}`,
            state: {
                baseURL: baseURL,
                currentUserID: currentUserData.userID,
                otherUserName: otherUserName,
                userRole: userRole
            }
        })
    }


    const inboxTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props.message}
        </Tooltip>
    )

    function showRequest() {
        return (
            <tr key={request.request_id}>
                <td className='align-middle'>
                    <Link to={requestRouterParams(request.request_id, otherUserName, userRole)}>
                        <Container fluid>
                            <Row>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={inboxTooltip({ message: 'Date of last received message' })}
                                >
                                    <Container as={Col} xs={3} className='inbox__container--message-date' onHover={() => 'Time of last message'}>
                                        <Timestamp time={request.last_message.timestamp} inbox />
                                    </Container>
                                </OverlayTrigger>
                                <Container as={Col} className='inbox__container--message-title text-left'>
                                    {currentUserData.userID === request.owner ? 'To' : 'From'} {otherUserName}
                                </Container>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={inboxTooltip({ message: 'Requested Date of Service' })}
                                >
                                    <Container as={Col} xs={3} className='inbox__container--message-date'>
                                        {Moment.parseZone(request.date_of_service).local().format('l')}
                                    </Container>
                                </OverlayTrigger>
                            </Row>
                            <Container>
                                <Container className={`inbox__container--message-body text-left text-truncate ${request.last_message.message.startsWith('Photo') ? 'photo-message' : null}`}>
                                    {request.last_message.message}
                                </Container>
                            </Container>
                        </Container>
                    </Link>
                </td>
                <td className='align-middle'>
                    <Rating baseURL={baseURL} request={request} currentUserData={currentUserData} maxRating={maxRating} />
                </td>
                <td className='align-middle'>
                    {currentUserData.userID === request.owner &&
                        <Button><FaStripeS /></Button>
                    }
                </td>
            </tr>
        )
    }

    return (
        showRequest()
    )
}

export default RequestThread;