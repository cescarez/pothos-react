import React, {useState, useEffect} from 'react'
import {useRouteMatch, Link} from 'react-router-dom';
import {Card, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import Moment from 'moment';
import axios from 'axios';
import pothosPic from '../images/pothos.png'

const User = ({baseURL}) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const match = useRouteMatch('/users/:id');
    const userId = match.params.id
    
    useEffect(() => {
        axios.get(`${baseURL}/users/${userId}`)
            .then((response) => {
                const apiUser = response.data
                setUser(apiUser);
            })
            .catch((error) => {
                const message=`There was an error with your request. ${error.message}.`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }, [baseURL, userId])

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
                                <Col xs='auto'>
                                    <Button variant='outline-secondary btn-sm'>Send Request</Button>
                                </Col>
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
            { error.message ? <Alert variant={error.variant}>{error.message}</Alert> : showUserData()}
        </div>
    )
}

export default User;