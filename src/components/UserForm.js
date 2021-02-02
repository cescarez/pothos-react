import React, { useState } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';


export default function UserForm() {
    const { currentUser } = useAuth();

    const [user, setUser] = useState({
        username: '', 
        full_name: '',
        phone_number: '',
        avatar_url: '',
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
        const nested_name = event.target.name
        const address_parts = ['street', 'city', 'state', 'postal_code', 'country']
        const price_parts = ['water_by_plant', 'water_by_time', 'repot_by_plant', 'repot_by_time']
        console.log(user)
        if (address_parts.includes(nested_name)){
            setUser({address:{[event.target.name]: event.target.value}})
        }else if (price_parts.includes(nested_name)){
            setUser({price_rate:{[event.target.name]: event.target.value}})
        }else {
            setUser({[event.target.name]: event.target.value});
        }
    }

    const handleCheck = (event) => {
        setUser({[event.target.name]: !user[event.target.name]});
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
            {/* <label>
                City:
                <input type="text" name='city' value={user.address.city} onChange={handleChange} />
            </label>
            <label>
                State:
                <input type="text" name='state' value={user.address.state} onChange={handleChange} />
            </label>
            <label>
                Country:
                <input type="text" name='country' value={user.address.country} onChange={handleChange} />
            </label>
            <label>
                Postal Code:
                <input type="text" name='postal_code' value={user.address.postal_code} onChange={handleChange} />
            </label>
            <br />
            <label>
                Water by Plant Rate:
                <input type="text" name='water_by_plant' value={user.price_rate.water_by_plant} onChange={handleChange} />
            </label>
            <br />
            <label>
                Water by Time Rate:
                <input type="text" name='water_by_time' value={user.price_rate.water_by_time} onChange={handleChange} />
            </label>
            <br />
            <label>
                Repot by Plant Rate:
                <input type="text" name='repot_by_plant' value={user.price_rate.repot_by_plant} onChange={handleChange} />
            </label>
            <br />
            <label>
                Repot by Time Rate:
                <input type="text" name='repot_by_time' value={user.price_rate.repot_by_time} onChange={handleChange} />
            </label>
            <br /> */}
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