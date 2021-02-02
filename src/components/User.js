import React, {useState, useEffect} from 'react'
import {useRouteMatch, Link} from 'react-router-dom';
import {Card, Button, Container, Table, Row, Col, Alert} from 'react-bootstrap';
import Moment from 'moment';
import axios from 'axios';
import pothosPic from '../images/pothos.png'

const User = ({baseURL}) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const match = useRouteMatch('/users/:id');
    const userId = match.params.id
    
    //maybe use async and await instead?
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

    const showUserData = () => {
        return (
            <Card className='mx-auto w-50' border='plant'>
                <Card.Img variant='bottom' src={pothosPic} rounded />
                <Card.Header className='bg-plant'>
                    <Card.Title className='font-weight-bolder mb-1'>{user.full_name}</Card.Title>
                    <Card.Subtitle className='text-muted font-weight-lighter'>{user.username}</Card.Subtitle>
                </Card.Header>
                <Card.Body className='py-2'>
                    <Card.Text className='mb-2'>
                        <Row>
                            <Col className='text-muted text-right'>Member Since:</Col>
                            <Col className='text-left'>{Moment(user.date_joined).format('MMMM Do, YYYY')}</Col>
                        </Row>
                        <Row>
                            <Col>{user.email}</Col>
                        </Row>
                        <Row>
                            <Col className='text-muted mt-2'>{user.bio}</Col>
                        </Row>
                    </Card.Text>
                    <Button variant='outline-success'>Request</Button>
                </Card.Body>
                {user.sitter ? 
                    <Card.Footer className='bg-plant'>
                            <Table className='my-0' borderless size='sm'>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Water by Plant</td>
                                    <td>${user.price_rate.water_by_plant.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Water per 30min:</td>
                                    <td>${user.price_rate.water_by_time.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Repot per Plant:</td>
                                    <td>${user.price_rate.repot_by_plant.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Repot per 30min:</td>
                                    <td>${user.price_rate.repot_by_time.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Footer>
                : null}
            </Card>
        )
    }

    return (
        <div>
            <h3>User</h3>
            { error.message ? <Alert variant={error.variant}>{error.message}</Alert> : showUserData()}
            <Link to={'/sitters'}>Return to All Sitters</Link>
        </div>
    )
}

export default User;