import React from 'react';
import { Navbar } from 'react-bootstrap';

import './Navigation.css'

export default function Footer() {

    return(
        <footer class="footer">
            <Navbar bg='primary' sticky='bottom'>
                <div class="d-flex flex-column">
                    <span className='footer-text'>&copy; 2021 Pothos, Inc.</span>
                </div>
            </Navbar>
        </footer>
    )
}