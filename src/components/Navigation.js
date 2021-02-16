import React, {useState} from 'react';
import { Navbar, Nav, Button, Alert, Dropdown, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {useHistory, Link} from 'react-router-dom';
import { BiCog, BiCart } from 'react-icons/bi';
import { HiOutlineChatAlt } from 'react-icons/hi';

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
        <div className='navigation d-flex'>
            <Navbar fixed='top' bg='primary' variant='dark' >
                <Container className='d-inline-flex justify-content-start'>
                    { currentUser &&
                        <>
                        <Dropdown navbar>
                            <Dropdown.Toggle variant='primary' className='cog-icon' id='account-settings'>
                                <BiCog className='cog'/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/update-email">Update Email/Password</Dropdown.Item>
                                <Dropdown.Item href="/update-profile">Update Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Link as={Link} to='/inbox' className='py-0'>
                            <Button>
                                <HiOutlineChatAlt className='chat-icon'/>
                            </Button>
                        </Nav.Link>
                        </>
                    }
                </Container>
                <Container className='d-inline-flex justify-content-center'>
                    <Navbar.Brand as={Link} to='/'>Pothos</Navbar.Brand>
                </Container>
                <Container className='d-inline-flex justify-content-end'>
                    {!currentUser &&
                        <Button variant='secondary' as={Link} to='/signup'>Sign Up</Button>
                    } 
                </Container>
            </Navbar>
            {error && <Alert variant='danger'>{error}</Alert>}
        </div>
    )
}

export default Navigation