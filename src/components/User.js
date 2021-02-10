import React, {useState, useEffect, useRef} from 'react'
import {useRouteMatch, Link} from 'react-router-dom';
import {Card, Button, Container, Row, Col, Alert, Overlay} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Moment from 'moment';
import axios from 'axios';
import pothosPic from '../images/pothos_large.png';
import RequestForm from './RequestForm';

const User = ({baseURL}) => {
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [currentOwner, setCurrentOwner] = useState('');
    const [showRequestPopever, setShowRequestPopover] = useState(false);
    const target = useRef(null);

    const match = useRouteMatch('/users/:id');
    const userId = match.params.id

    const loadUserData = () => {
        currentUser && 
            axios.get(`${baseURL}/users/current/${currentUser.uid}`)
                .then((response) => {
                    const apiUser = Object.values(response.data)[0]
                    if (Object.keys(response.data)[0] !== 'message') {
                        apiUser.userID = Object.keys(response.data)[0]
                        setCurrentOwner(apiUser);
                    } else {
                        setError({variant: 'warning', message: apiUser})
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                    console.log(error.message)
                    const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
    }

    useEffect(() => {
        loadUserData();
    }, [])
    
    useEffect(() => {
        axios.get(`${baseURL}/users/${userId}`)
            .then((response) => {
                const apiUser = response.data
                setUser(apiUser);
            })
            .catch((error) => {
                const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }, [baseURL, userId])

    const onSubmitRequestCallback = (requestForm) => {
        let newRequestID = null;
        let successfulRequest = false;
        let successfulMessage = false;
        let errorMessage = {variant: 'danger', message: 'There was an error with your request.'}
        console.log(requestForm)

        const newRequest = {
            owner: currentOwner.userID,
            sitter: userId,
            date_of_service: Moment.utc(requestForm.date_of_service),
            services: requestForm.services
        }
        axios.post(baseURL + '/requests', newRequest)
        .then((response) => {
            newRequestID = response.data.request_id;
            successfulRequest = true;
        }).catch((error) => {
            const message = `Request was not sent. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
            errorMessage.message += message;
        })

        //not sure if this timeout is needed at all
        setTimeout(() => {
            axios.post(
                baseURL + '/messages', 
                {
                    sender: currentOwner.userID,
                    // message: `Hey bud (pun intended), are you available for ${requestForm.services.water_by_plant || requestForm.services.water_by_time ? 'watering' : ''}${(requestForm.services.water_by_time || requestForm.services.water_by_plant) && (requestForm.services.repot_by_plant || requestForm.services.repot_by_time) ? ' and ' : ''}${requestForm.services.repot_by_plant || requestForm.services.repot_by_time ? 'repotting' : ''} on ${Moment(requestForm.date_of_service)}?`,
                    message: `Hey bud (pun intended), are you available for watering/plant sitting services on ${Moment(requestForm.date_of_service)}?`,
                    request_id: newRequestID
                }
            ).then((response) => {
                successfulMessage = true;
            }).catch((error) => {
                const message = `Message was not sent. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                errorMessage.message += message;
            })

            if (successfulRequest && successfulMessage) {
                setError({variant:'success', message: 'Request was successfully sent.'});
            } else {
                setError(errorMessage);
            }
        }, 250)

    }

    //write method to display the number of emoji stars as a rounding up? of the user rating



    const showUserData = () => {
        return (
            <Container className='container-lg'>
                <Card className='mx-auto w-50' border='plant'>
                    <Card.Img variant='bottom' src={pothosPic} rounded />
                    <Card.Header className='bg-plant'>
                        <Row>
                            <Col>
                                <Card.Title className='font-weight-bolder mb-1'>{user.full_name}</Card.Title>
                                <Card.Subtitle className='text-muted font-weight-lighter'>{user.username}</Card.Subtitle>
                            </Col>
                            { user.sitter &&
                                <>
                                <Col xs='auto'>
                                    <Button variant='outline-secondary btn-sm' ref={target} onClick={() => setShowRequestPopover(!showRequestPopever)}>
                                        Send Request
                                    </Button>
                                </Col>
                                <Overlay target={target.current} show={showRequestPopever} placement="left">
                                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            // backgroundColor: 'rgba(108, 195, 213, 0.95)', //info
                                            backgroundColor: 'rgba(243, 150, 154, 0.90)', //secondary
                                            padding: '2px 0px 2px',
                                            color: 'white',
                                            borderRadius: 6,
                                            ...props.style,
                                        }}
                                    >
                                       <RequestForm onSubmitRequest={onSubmitRequestCallback} sitterPrices={user.price_rate} />
                                    </div>
                                    )}
                                </Overlay>
                                </>
                            }
                        </Row>
                    </Card.Header>
                    <Card.Body className='py-2'>
                        <Card.Text className='mb-2'>
                            <Row>
                                <Col className='text-muted text-right'>Member Since:</Col>
                                <Col className='text-left'>{Moment(user.date_joined).format('MMMM Do, YYYY')}</Col>
                            </Row>
                            <Row>
                                <Col className='text-right'>Rating:</Col>
                                <Col className='text-left'>{user.rating ? user.rating : 'N/A'}</Col>
                            </Row>
                            <Row>
                                <Col className='text-muted mt-2'><small>{user.bio}</small></Col>
                            </Row>
                        </Card.Text>

                    </Card.Body>
                    {user.sitter &&
                        <Card.Footer className='bg-plant'>
                            <Container>
                                <Row>
                                    <Col>Water per Plant:</Col>
                                    <Col>${user.price_rate.water_by_plant.toFixed(2)}</Col>
                                </Row> 
                                <Row>
                                    <Col>Water per 30min:</Col>
                                    <Col>${user.price_rate.water_by_time.toFixed(2)}</Col>
                                </Row> 
                                <Row>
                                    <Col>Repot per Plant:</Col>
                                    <Col>${user.price_rate.repot_by_plant.toFixed(2)}</Col>
                                </Row> 
                                <Row>
                                    <Col>Repot per 30min:</Col>
                                    <Col>${user.price_rate.repot_by_time.toFixed(2)}</Col>
                                </Row> 
                            </Container>
                        </Card.Footer>
                    }
                    <Button variant='secondary w-100' as={Link} to={'/'}>Return to Dashboard</Button><br/>
                </Card>
            </Container>
        )
    }

    return (
        <div>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            {showUserData()}
        </div>
    )
}

export default User;