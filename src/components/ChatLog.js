import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import ChatEntry from './ChatEntry';
// import './ChatLog.css';

const ChatLog = (props) => {
    const chatComponents = props.chatMessages.map((message, i) => {
        return(
            <ChatEntry key={i} sender={message.sender} body={message.body} timeStamp={message.timeStamp} />
        );
    });

    return(
        <div>
            Chat Log
            <div className='chat-log'>
                {chatComponents}
            </div>
            <Button variant='secondary w-100' as={Link} to={'/'}>Return to Dashboard</Button>
        </div>
    )
}

export default ChatLog;
