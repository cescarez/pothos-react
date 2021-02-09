import React from 'react';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import './Navigation.css'

export default function Footer() {

    return(
        <footer className="footer">
            <Navbar bg='primary' sticky='bottom'>
                {/* <Container>
                    <Row>
                        <Nav.Link as={Link} to='/about'>About Us</Nav.Link>
                    </Row>
                </Container> */}
                <div className="footer-bottom">
                    <p className='text-xs-center'>
                        &copy; {new Date().getFullYear()} Pothos, Inc. All Rights Reserved
                    </p>
                </div>
            </Navbar>
        </footer>
    )
}