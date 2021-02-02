import React, { Component } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
        this.state = { full_name: '' };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        alert('A form was submitted: ' + this.state);
        fetch('https://localhost:5000/users', {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(function(response) {
            console.log(response)
            return response.json();
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" value={this.state.value} full_name="full_name" onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Username:
                    <input type="text" value={this.state.value} username="username" onChange={this.handleChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
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
        );
    }
}

export default UserForm;