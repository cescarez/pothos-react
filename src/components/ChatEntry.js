import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Timestamp from './Timestamp';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './ChatEntry.css';


const ChatEntry = ({baseURL, sender, sender_name, body, timeStamp}) => {
    const { currentUser } = useAuth();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('')

    const loadUserData = (auth_id) => {
        if (!user) {
            axios.get(`${baseURL}/users/current/${auth_id}`)
                .then((response) => {
                    const apiUser = Object.values(response.data)[0]
                    if (Object.keys(response.data)[0] !== 'message') {
                        apiUser.userID = Object.keys(response.data)[0]
                        console.log(apiUser);
                        setUser(apiUser);
                    } else {
                        setError({variant: 'warning', message: apiUser})
                    }
                })
                .catch((error) => {
                    const message=`There was an error with your request. ${error.message}.`;
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
        }
    }

    useEffect(() => {
        loadUserData(currentUser.uid);
    }, [])

    let senderClass = 'chat-entry local'
    if (sender === '-MT2hIkqpzEkQklrNzCz') {
        senderClass = 'chat-entry remote'
    }

    return (
        <div className={senderClass}>
        <h2 className='entry-name'>{sender_name}</h2>
        <section className="entry-bubble">
            <p>{body}</p>
            <p className='entry-time'><Timestamp time={timeStamp} /></p>
        </section>
        </div>
    )
}

ChatEntry.propTypes = {
    sender: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timeStamp: PropTypes.string.isRequired,
}

export default ChatEntry;
