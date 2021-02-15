import React from 'react';
import {Container, Spinner} from 'react-bootstrap';

export default function LoadingSpinner({setIsLoaded}) {
    return (
        <Container style={{height: '500px', padding: '100px'}}>
            {setIsLoaded &&
                <div className='invisible'>
                    {setTimeout(() => {
                        setIsLoaded(true)
                    }, 500)}
                </div>
            }
            <Spinner animation="border" variant="secondary" style={{height: '200px', width: '200px'}}/>
        </Container>
    )
}
