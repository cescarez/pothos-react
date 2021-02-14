import React, { useState } from 'react'
import { Form, Button, Container, Card, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import UploadProfilePic from './UploadProfilePic'


export default function UserForm({ baseURL, setDashboardUser }) {
    const { currentUser } = useAuth();

    const [error, setError] = useState('');

    const [user, setUser] = useState({
        auth_id: currentUser.uid,
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
        },
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
        const addressParts = ['street', 'city', 'state', 'postal_code']
        const priceParts = ['water_by_plant', 'water_by_time', 'repot_by_plant', 'repot_by_time']

        if (addressParts.includes(newInput)) {
            setUser({
                ...user,
                address: {
                    ...user.address,
                    [newInput]: newValue,
                }
            })
        } else if (priceParts.includes(newInput)) {
            setUser({
                ...user,
                price_rate: {
                    ...user.price_rate,
                    [newInput]: newValue,
                }
            })
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
    
    const uploadPhoto = () =>  {

    }

    //check for if all form fields are populated
    //note: sitter/owner attributes are excluded from this function since checkUserType() exists
    const checkFormPopulated = () => {
        const fields =
            Object.values(user)
                .filter((element) => {
                    return typeof (element) !== 'object' && typeof (element) !== 'boolean'
                })
                .concat(Object.values(user.address))

        if (user.sitter) {
            fields.concat(Object.values(user.price_rate));
        }
        if (fields.every((field) => field)) {
            return true
        } else {
            setError({
                variant: 'warning',
                message: 'All form fields must be populated.'
            })
            return false;
        }
    }

    //check if at least one user type is selected
    const checkUserType = () => {
        if (user.sitter || user.owner) {
            return true;
        } else {
            setError({
                variant: 'warning',
                message: 'You must set your profile to "Sitter", "Owner", or both.'
            });
            return false;
        }

    }

    //checks if price rates are number inputs
    const checkPriceRates = () => {
        if (user.sitter) {
            const rates = Object.values(user.price_rate)
            if (rates.every((rate) => !isNaN(rate))) {
                return true;
            } else {
                setError({
                    variant: 'warning',
                    message: 'All price rates must be numbers.'
                });
                return false;
            }
        } else {
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkFormPopulated() && checkUserType() && checkPriceRates()) {
            axios.post(baseURL + '/users', user)
                .then((response) => {
                    //callback to dashboard
                    setDashboardUser(response);

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
                        price_rate: {
                            water_by_plant: '',
                            water_by_time: '',
                            repot_by_plant: '',
                            repot_by_time: ''
                        }
                    })
                    setError({ variant: 'success', message: response.data.message });
                })
                .catch((error) => {
                    const message=`There was an error with your request. User profile was not saved. ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                    setError({ variant: 'danger', message: message });
                    console.log(message);
                });
        }
    }


    return (
        <Container
            className='d-flex justify-content-center'
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '800px' }}>
                {error.message && <Alert variant={error.variant}>{error.message}</Alert>}
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <h2 className='text-center mb-4'>Create Profile</h2>
                            {/* <Form.Row className='d-flex justify-content-center'>
                                <UploadProfilePic baseURL={baseURL}/>
                            </Form.Row> */}

                            <Form.Row>
                                <Col></Col>
                                <Form.Group as={Col} >
                                    <Form.Check type="checkbox" label="Sitter" name='sitter' value={user.sitter} onChange={handleCheck} checked={user.sitter ? true : false} />
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Check type="checkbox" label="Owner" name='owner' value={user.owner} onChange={handleCheck} checked={user.owner ? true : false} />
                                </Form.Group>
                                <Col></Col>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" name='full_name' value={user.full_name} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="tel" name='phone_number' value={user.phone_number} onChange={handleChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='###-###-####'/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Upload Photo</Form.Label>
                                    <Form.Control type="text" name='avatar_url' value={user.avatar_url} onChange={uploadPhoto} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAddress1" >
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control name='street' value={user.address.street} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId='formGridCity' >
                                    <Form.Label>City</Form.Label>
                                    <Form.Control name='city' value={user.address.city} onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState" >
                                    <Form.Label>State</Form.Label>
                                    <Form.Control name='state' value={user.address.state} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip" >
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control name='postal_code' value={user.address.postal_code} onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>About Me</Form.Label>
                                <Form.Control name='bio' value={user.bio} onChange={handleChange} as='textarea' />
                            </Form.Group>
                            {user.sitter &&
                                <Card>
                                    <Card.Body>
                                        <h3 className='text-center mb-4'>Rates</h3>
                                        <Form.Row>
                                            <Form.Group as={Col} >
                                                <Form.Label>Watering / Plant</Form.Label>
                                                <Form.Control name='water_by_plant' value={user.price_rate.water_by_plant} onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Label>Watering / 30 min</Form.Label>
                                                <Form.Control name='water_by_time' value={user.price_rate.water_by_time} onChange={handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} >
                                                <Form.Label>Repotting / Plant</Form.Label>
                                                <Form.Control name='repot_by_plant' value={user.price_rate.repot_by_plant} onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Label>Repotting / 30 min</Form.Label>
                                                <Form.Control name='repot_by_time' value={user.price_rate.repot_by_time} onChange={handleChange} />
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