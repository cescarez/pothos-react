import React, {useState} from 'react';
import { Navbar, Nav, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {useHistory, Link} from 'react-router-dom';

const Navigation = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/')
        } catch {
            setError('Failed to log out')
        }
    }

    const logoutForm = () => {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Profile</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <strong>Email:</strong> {currentUser.email}
                        <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
                            Update Profile
                        </Link>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Button variant='link' onClick={handleLogout}>
                        Log Out
                    </Button>
                </div>
            </div>
        )

    }


    return (
          <Navbar fixed='top' bg="plant-dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/sitters'>Plant Sitters</Nav.Link>
            </Nav>
            {currentUser ? <Button variant="outline-info" as={Link} >Log Out</Button> : <Button variant="outline-info" as={Link} to='/signup'>Sign Up</Button>} 
            {/* <Button variant="outline-info" as={Link} to='/signup'>Sign Up</Button> */}
          </Navbar>
    )
}

export default Navigation