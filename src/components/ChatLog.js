import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ChatEntry from './ChatEntry';
// import './ChatLog.css';

const ChatLog = ({ baseURL }) => {
    const [messageList, setMessageList] = useState(null);
    const [error, setError] = useState('')
    const match = useRouteMatch('/requests/:id');
    const requestID = match.params.id

    useEffect(() => {
        axios.get(baseURL + '/messages-by-request/' + requestID)
            .then((response) => {
                const apiMessages = response.data
                setMessageList(apiMessages);
            }).catch((error) => {
                const message=`There was an error with your request. ${error.message}.`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    },[baseURL,requestID])

    // const chatComponents = messageList.map((messages, i) => {
    //     return(
    //         <ChatEntry key={i} sender={messages.sender} body={messages.message} timeStamp={messages.timestamp} />
    //     );
    // });

    // if (!messageList) {
    //     return <div></div>;
    // }

    return(
        <div>
            <h2>Chat Log</h2>
            <div className='chat-log'>
                {/* {chatComponents} */}
            </div>
            <Button variant='secondary w-100' as={Link} to={'/'}>Return to Dashboard</Button>
        </div>
    )
}

export default ChatLog;
