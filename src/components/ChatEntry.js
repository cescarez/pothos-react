import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from './Timestamp';
import './ChatEntry.css';

const ChatEntry = ({baseURL, sender, sender_name, text, photo, photo_url, timeStamp, currentUserID}) => {
    let senderClass = 'chat-entry local'
    if (sender === currentUserID) {
        senderClass = 'chat-entry remote'
    }

    return (
        <div className={senderClass}>
        <h2 className='entry-name'>{sender_name}</h2>
        <section className="entry-bubble">
            { photo ? <img src={photo_url} alt='plant pic' /> : <p>{text}</p>}
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
