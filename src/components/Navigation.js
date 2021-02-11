import React, {useState} from 'react';
import { Navbar, Nav, Button, Alert, Dropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {useHistory, Link} from 'react-router-dom';
import { HiOutlineCog, HiOutlineChatAlt } from 'react-icons/hi';

import './Navigation.css';

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
                    { currentUser &&
                        <Dropdown navbar>
                            <Dropdown.Toggle variant='primary' className='cog-icon' id='account-settings'>
                                <HiOutlineCog className='cog'/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/update-email">Update Email/Password</Dropdown.Item>
                                <Dropdown.Item href="/update-profile">Update Profile</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    { currentUser &&
                    <Nav.Link as={Link} to='/inbox' className='py-0'>
                        <Button className='my-0'>
                        <HiOutlineChatAlt className='chat-icon'/>
                        </Button>
                    </Nav.Link>
                    }
                    <Navbar.Brand as={Link} to='/'>Pothos</Navbar.Brand>
                </Nav>
                    <Button className='checkout-button' variant='secondary'>Check Out</Button>

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