import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import './Navigation.css'

export default function Footer() {

    return(
        <div className='main-footer'>
            <Navbar bg='primary' sticky='bottom' variant='dark'>
                <Nav className='mr-auto'>
                    <Nav.Link className='footer-link' as={Link} to='/about'>About Us</Nav.Link>
                    <Nav.Link className='footer-link' as={Link} to='/contact'>Contact Us</Nav.Link>
                </Nav>
                    <div className="footer-bottom">
                        <p className='footer-text my-auto'>
                            &copy; {new Date().getFullYear()} Pothos, Inc | All Rights Reserved
                        </p>
                    </div>
            </Navbar>
        </div>
    )
}