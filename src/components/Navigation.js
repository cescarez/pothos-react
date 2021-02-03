import React, {useState} from 'react';
import { Navbar, Nav, Button, Alert } from 'react-bootstrap';
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
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div className='navigation'>
            <Navbar fixed='top' bg='primary' variant='dark'>
                <Nav className='mr-auto'>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                </Nav>
                {currentUser ? 
                    <Button variant='secondary' as={Link} onClick={handleLogout}>Log Out</Button> : 
                    <Button variant='secondary' as={Link} to='/signup'>Sign Up</Button>
                } 
            </Navbar>
            {error && <Alert variant='danger'>{error}</Alert>}
        </div>
    )
}

export default Navigation