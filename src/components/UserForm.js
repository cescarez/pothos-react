import React, { useState } from 'react'
import { Form, Button, Container, Card, Col, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios'


export default function UserForm({baseURL, setDashboardUser}) {
    const { currentUser } = useAuth();

    const [error, setError] = useState('');

    const [user, setUser] = useState({
        auth_id: currentUser.uid,
        username: '', 
        full_name: currentUser.displayName,
        phone_number: '',
        avatar_url: currentUser.photoURL,
        sitter: false,
        owner: false,
        bio: '',
        address: {
            street: '',
            city: '',
            state: '',
            postal_code: '',
            country: ''
        },
        email: currentUser.email,
        price_rate: {
            water_by_plant: '',
            water_by_time: '',
            repot_by_plant: '',
            repot_by_time: ''
        }
    });

    const handleChange = (event) => {
        const newInput = event.target.name
        const newValue = event.target.value
        const addressParts = ['street', 'city', 'state', 'postal_code', 'country']
        const priceParts = ['water_by_plant', 'water_by_time', 'repot_by_plant', 'repot_by_time']
        console.log(user)
        if (addressParts.includes(newInput)) {
            setUser({
                ...user,
                address: {
                    ...user.address,
                    [newInput]: newValue,
                }
            })
        } else if (priceParts.includes(newInput)){
            if (typeof(parseFloat(newValue))) {
            setUser({
                ...user,
                price_rate: { 
                    ...user.price_rate, 
                    [newInput]: newValue,
                }
            })
            } else {
                setError({variant: 'warning', message: 'Please enter valid numbers for all price rates.'});
            }
        } else {
            setUser({
                ...user, 
                [newInput]: newValue,
            });
        }
    }

    const handleCheck = (event) => {
        setUser({
            ...user,
            [event.target.name]: !user[event.target.name]
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.sitter || user.owner) {
            // alert('A form was submitted.');
            axios.post(baseURL + '/users', user)
            .then((response) => {
                setDashboardUser && setDashboardUser(user);
                setUser({
                    auth_id: currentUser.uid,
                    username: '', 
                    full_name: '',
                    phone_number: '',
                    avatar_url: currentUser.photoURL,
                    sitter: false,
                    owner: false,
                    bio: '',
                    address: {
                        street: '',
                        city: '',
                        state: '',
                        postal_code: '',
                        country: ''
                    },
                    email: currentUser.email,
                    price_rate: {
                        water_by_plant: '',
                        water_by_time: '',
                        repot_by_plant: '',
                        repot_by_time: ''
                    }
                })
                setError({variant:'success', message: response.data.message});
            })
            .catch((error) => {
                const message=`There was an error with your request. User profile was not saved. ${error.message}.`;
                setError({variant: 'danger', message: message});
                console.log(message);
            });
        } else {
            setError({variant: 'warning', message: 'You must set your profile to "Sitter", "Owner", or both.'})
        }
    }

    return (
        <Container 
            className='d-flex justify-content-center'
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '800px'}}>
                {error.message && <Alert variant={error.variant}>{error.message}</Alert>}
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <h2 className='text-center mb-4'>Create Profile</h2>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Check type="checkbox" label="Sitter" name='sitter' value={user.sitter} onChange={handleCheck}/>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Check type="checkbox" label="Owner" name='owner' value={user.owner} onChange={handleCheck}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name='full_name' value={user.full_name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name='username' value={user.username} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type = "text" name='phone_number' value={user.phone_number} onChange={handleChange} />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAddress1" > 
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control  name='street' value={user.address.street} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId='formGridCity' >
                                    <Form.Label>City</Form.Label>
                                    <Form.Control  name='city' value={user.address.city} onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState" >
                                    <Form.Label>State</Form.Label>
                                    <Form.Control  name='state' value={user.address.state} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCountry" >
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control  name='country' value={user.address.country} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip" >
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control  name='postal_code' value={user.address.postal_code} onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>About Me</Form.Label>
                                <Form.Control  name='bio' value={user.bio} onChange={handleChange} as='textarea' />
                            </Form.Group>
                            { user.sitter &&
                                <Card>
                                    <Card.Body>
                                        <h3 className='text-center mb-4'>Rates</h3>
                                        <Form.Row>
                                            <Form.Group as={Col} >
                                                <Form.Label>Watering / Plant</Form.Label>
                                                <Form.Control  name='water_by_plant' value={user.price_rate.water_by_plant} onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Label>Watering / 30 min</Form.Label>
                                                <Form.Control  name='water_by_time' value={user.price_rate.water_by_time} onChange={handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} >
                                                <Form.Label>Repotting / Plant</Form.Label>
                                                <Form.Control  name='repot_by_plant' value={user.price_rate.repot_by_plant} onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Label>Repotting / 30 min</Form.Label>
                                                <Form.Control  name='repot_by_time' value={user.price_rate.repot_by_time} onChange={handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                    </Card.Body>
                                </Card>
                            }
                            <Button variant='primary' type="submit" value="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}