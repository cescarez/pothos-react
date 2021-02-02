import React, { useState } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';


export default function UserForm() {
    const { currentUser } = useAuth();

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
    })

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
        }else if (priceParts.includes(newInput)){
            setUser({
                ...user,
                price_rate: { 
                    ...user.price_rate, 
                    [newInput]: newValue,
                }
            })
        }else {
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
        alert('A form was submitted.');
        fetch('https://localhost:5000/users', {
            method: 'POST',
            body: JSON.stringify(user)
        }).then(function(response) {
            console.log(response)
            return response.json();
        });
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Sitter:
                <input type="checkbox" name='sitter' value={user.sitter} onChange={handleCheck} />
            </label>
            <label>
                Owner:
                <input type="checkbox" name='owner' value={user.owner} onChange={handleCheck} />
            </label>
            <br/>
            <label>
                Full Name:
                <input type="text" name='full_name' value={user.full_name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Username:
                <input type="text" name='username' value={user.username} onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone Number:
                <input type="text" name='phone_number' value={user.phone_number} onChange={handleChange} />
            </label>
            <br />
            <label>
                Street:
                <input type="text" name='street' value={user.street} onChange={handleChange} />
            </label>
            <label>
                City:
                <input type="text" name='city' value={user.city} onChange={handleChange} />
            </label>
            <label>
                State:
                <input type="text" name='state' value={user.state} onChange={handleChange} />
            </label>
            <label>
                Country:
                <input type="text" name='country' value={user.country} onChange={handleChange} />
            </label>
            <label>
                Postal Code:
                <input type="text" name='postal_code' value={user.postal_code} onChange={handleChange} />
            </label>
            <br />
            <label>
                About Me:
                <input type="text" name='bio' value={user.bio} onChange={handleChange} />
            </label>
            <br />
            { user.sitter &&
                <div>
                    <label>
                        Water by Plant Rate:
                        <input type="text" name='water_by_plant' value={user.water_by_plant} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Water by Time Rate:
                        <input type="text" name='water_by_time' value={user.water_by_time} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Repot by Plant Rate:
                        <input type="text" name='repot_by_plant' value={user.repot_by_plant} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Repot by Time Rate:
                        <input type="text" name='repot_by_time' value={user.repot_by_time} onChange={handleChange} />
                    </label>
                    <br />
                </div>
            }
            <input type="submit" value="Submit" />
        </form>
    )
            // <Container 
            // className='d-flex align-items-center justify-content-center'
            // style={{ minHeight: '100vh' }}
            // >
            //     <div className='w-100' style={{ maxWidth: '400px'}}>
            //         <Card>
            //             <Card.Body>
            //                 <Form onSubmit={this.handleSubmit}>
            //                     <Form.Group id='username'>
            //                         <Form.Label>Username</Form.Label>
            //                         <Form.Control type='username' required />
            //                     </Form.Group>
            //                     <Form.Group id='full_name'>
            //                         <Form.Label>Full Name</Form.Label>
            //                         <Form.Control type='username' required />
            //                     </Form.Group>
            //                     <label>
            //                         Name:
            //                         <input type="text" value={this.state.value} name="name" onChange={this.handleChange} />
            //                     </label>
            //                     <Button variant='primary' type="submit">
            //                         Submit
            //                     </Button>
            //                 </Form>
            //             </Card.Body>
            //         </Card>
            //     </div>
            // </Container>
}