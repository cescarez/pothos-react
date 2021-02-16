import React, { useState, useEffect } from 'react';
import { Badge, OverlayTrigger, Tooltip, Col, Row, Container } from 'react-bootstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';

import Rating from './RequestRating';
import Timestamp from './Timestamp';
import LoadingSpinner from './LoadingSpinner';

import './Inbox.css';
import Stripe from './Stripe';

// TODO: implement unread format change

const RequestThread = ({ baseURL, maxRating, request, currentUserData, setError }) => {
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

    const checkForUnread = () => {
        if (request.last_message) {
            let role = 'sitter'
            if (currentUserData.userID === request.owner) {
                role = 'owner'
            }
            const wasLastSender = request.last_message.sender !== currentUserData.userID
            const anyUnreadMessages = Moment(request[`last_accessed_by_${role}`]).isBefore(request.last_message.timestamp)

            return (!wasLastSender && anyUnreadMessages)
        }
    }

    function showRequest() {
        return (
            <tr key={request.request_id} className={checkForUnread() ? `font-weight-bold` : null }>
                <td className='align-middle'>
                    <Link to={requestRouterParams(request.request_id, otherUserName, userRole)}>
                        {checkForUnread() && <Badge variant='danger' >New</Badge>}
                        <Container fluid>
                            <Row >
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={inboxTooltip({ message: 'Date of last received message' })}
                                >
                                    <Container as={Col} xs={3} className='inbox__container--message-date' onHover={() => 'Time of Last Message'}>
                                        {request.last_message &&
                                            <Timestamp time={request.last_message.timestamp} inbox />
                                        }
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
                                <Container className={`inbox__container--message-body text-left text-truncate ${request.last_message && request.last_message.message.startsWith('Photo') ? 'photo-message' : null}`}>
                                    {request.last_message && 
                                        request.last_message.message}
                                </Container>
                            </Container>
                        </Container>
                    </Link>
                </td>
                <td className='align-middle'>
                    <Rating baseURL={baseURL} request={request} currentUserData={currentUserData} maxRating={maxRating} />
                </td>
                <td className='align-middle'>
                    <Stripe baseURL={baseURL} request={request} currentUserData={currentUserData} setError={setError} />
                </td>
            </tr>
        )
    }

    return (
        showRequest()
    )
}

export default RequestThread;