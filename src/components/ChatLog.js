import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const ChatLog = ({baseURL}) => {
    return(
        <div>
            Chat Log
            <Button variant='secondary w-100' as={Link} to={'/'}>Return to Dashboard</Button>
        </div>
    )
}

export default ChatLog;