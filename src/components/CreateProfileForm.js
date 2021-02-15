import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Card, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { projectStorage } from '../firebase'
import axios from 'axios';

export default function CreateProfileForm({ baseURL, setDashboardUser, baseGeocodeURL }) {
    const { currentUser } = useAuth();

    const [error, setError] = useState({});
    const [file, setFile] = useState(null);
    // const [url, setUrl] = useState(null);
    // const types = ['image/png', 'image/jpeg'];

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
        address_coords: {
            lat: '',
            lng: ''
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

    // const uploadPhoto = (e) => {
    //     let selected = e.target.files[0];

    //     if (selected && types.includes(selected.type)) {
    //         setFile(selected);
    //         setError('');
    //     } else {
    //         setFile(null);
    //         setError('Please select an image file (png or jpeg)');
    //     }
    // }

    // useEffect(() => {
    //     const storageRef = projectStorage.ref(file.name);
    //     storageRef.put(file).on('state_changed', (snap) => {

    //     })
    // },[file])

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


    const createGeocodeURL = () => {
        return (
            baseGeocodeURL +
            (`${user.address.street}+${user.address.city}+${user.address.state}+${user.address.postal_code}`).replace(' ', '+')
            + '&key='
            + process.env.REACT_APP_GOOGLE_CLOUD_API_KEY
        )
    }


    let uspsRequestXML =
        `<AddressValidateRequest USERID="111NASTU3329">
            <Address>
                <Address1/>
                <Address2>${user.address.street}</Address2>
                <City>${user.address.city}</City>
                <State>${user.address.state}</State>
                <Zip5>${user.address.postal_code}</Zip5>
                <Zip4/>
            </Address>
        </AddressValidateRequest>`

    const saveUserProfile = (newUser) => {
        axios.post(baseURL + '/users', newUser)
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
                    address_coords: {
                        lat: '',
                        lng: ''
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
    }

    const getAddressCoords = () => {
        axios.get(createGeocodeURL())
            .then((response) => {
                const newUser = { ...user }
                const address_coords = response.data.results[0].geometry.location;
                console.log(address_coords)
                console.log(address_coords.lat)
                console.log(address_coords.lng)
                newUser.address_coords = {
                    lat: response.data.results[0].geometry.location.lat,
                    lng: response.data.results[0].geometry.location.lng
                }
                setUser(newUser);
                return (saveUserProfile(newUser))
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkUserType() && checkPriceRates()) {
            axios.get(`https://secure.shippingapis.com/ShippingAPI.dll?API=verify&XML=${uspsRequestXML}`, { headers: { 'Content-Type': 'application/xml; charset=utf=8' } })
                .then((response) => {
                    const errorMessage = response.data.split(/<[/]?Description>/)[1]
                    if (errorMessage) {
                        setError({ variant: 'danger', message: `Address is not valid. ${errorMessage}`, invalidAddress: true });
                        console.log(errorMessage)
                        return false
                    } else {
                        setError({});
                        console.log(`Address verified.`)
                        return (getAddressCoords())
                    }
                })
                .catch((error) => {
                    const message = `There was an error with your request. User profile was not saved. ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                    setError({ variant: 'danger', message: message });
                    console.log(message);
                })

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
                            {/* <Form.Row className='d-flex justify-content-center'>
                                <Form.Group>
                                    <Form.Label>Upload Photo</Form.Label>
                                    <Form.Control type="file" name='avatar_url' value={user.avatar_url} onChange={uploadPhoto}/>
                                    {file && <div>{file.name}</div>}
                                    { error && <div className='error'>{error}</div>}
                                </Form.Group>
                            </Form.Row> */}
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" name='full_name' value={user.full_name} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="tel" name='phone_number' value={user.phone_number} onChange={handleChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='###-###-####' required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAddress1" >
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control name='street' value={user.address.street} onChange={handleChange} required isInvalid={error.validAddress ? !error.validAddress : false} />
                                </Form.Group>
                                <Form.Group as={Col} controlId='formGridCity' >
                                    <Form.Label>City</Form.Label>
                                    <Form.Control name='city' value={user.address.city} onChange={handleChange} required isInvalid={error.validAddress ? !error.validAddress : false} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState" >
                                    <Form.Label>State</Form.Label>
                                    <Form.Control name='state' value={user.address.state} onChange={handleChange} required isInvalid={error.validAddress ? !error.validAddress : false} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip" >
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control name='postal_code' value={user.address.postal_code} onChange={handleChange} required isInvalid={error.validAddress ? !error.validAddress : false} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>About Me</Form.Label>
                                <Form.Control name='bio' value={user.bio} onChange={handleChange} as='textarea' required />
                            </Form.Group>
                            {user.sitter &&
                                <Card>
                                    <Card.Body>
                                        <h3 className='text-center mb-4'>Rates</h3>
                                        <Form.Row>
                                            <Form.Group as={Col} >
                                                <Form.Label>Watering / Plant</Form.Label>
                                                <Form.Control name='water_by_plant' value={user.price_rate.water_by_plant} onChange={handleChange} required={user.sitter} isInvalid={isNaN(user.price_rate.water_by_plant)} />
                                                <Form.Control.Feedback type='invalid'>
                                                    {'All price rates must be numbers.'}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Label>Watering / 30 min</Form.Label>
                                                <Form.Control name='water_by_time' value={user.price_rate.water_by_time} onChange={handleChange} required={user.sitter} isInvalid={isNaN(user.price_rate.water_by_time)} />
                                                <Form.Control.Feedback type='invalid'>
                                                    {'All price rates must be numbers.'}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} >
                                                <Form.Label>Repotting / Plant</Form.Label>
                                                <Form.Control name='repot_by_plant' value={user.price_rate.repot_by_plant} onChange={handleChange} required={user.sitter} isInvalid={isNaN(user.price_rate.repot_by_plant)} />
                                                <Form.Control.Feedback type='invalid'>
                                                    {'All price rates must be numbers.'}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Label>Repotting / 30 min</Form.Label>
                                                <Form.Control name='repot_by_time' value={user.price_rate.repot_by_time} onChange={handleChange} required={user.sitter} isInvalid={isNaN(user.price_rate.repot_by_time)} />
                                                <Form.Control.Feedback type='invalid'>
                                                    {'All price rates must be numbers.'}
                                                </Form.Control.Feedback>
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