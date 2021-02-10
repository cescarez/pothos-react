import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { Container, Button, Form, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import ChatEntry from './ChatEntry';
import './ChatLog.css';

const ChatLog = ({ location }) => {
    const [messageList, setMessageList] = useState(null);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();
    // const [user, setUser] = useState(null);
    const [body, setBody] = useState('')
    const match = useRouteMatch('/requests/:id');
    const requestID = match.params.id;
    const {baseURL, currentUserID, otherUserName } = location.state;

    // const loadUserData = (auth_id) => {
    //     if (!user) {
    //         axios.get(`${baseURL}/users/current/${auth_id}`)
    //             .then((response) => {
    //                 const apiUser = Object.values(response.data)[0]
    //                 if (Object.keys(response.data)[0] !== 'message') {
    //                     apiUser.userID = Object.keys(response.data)[0]
    //                     setUser(apiUser);
    //                 } else {
    //                     setError({variant: 'warning', message: apiUser})
    //                 }
    //             })
    //             .catch((error) => {
    //                 const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
    //                 setError({variant: 'danger', message: message});
    //                 console.log(message);
    //             })
    //     }
    // }

    // useEffect(() => {
    //     loadUserData(currentUser.uid);
    // }, [])

    const loadMessageList = () => {
        axios.get(baseURL + '/messages-by-request/' + requestID)
            .then((response) => {
                const apiMessages = Object.values(response.data)
                setMessageList(apiMessages);
            }).catch((error) => {
                const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })

    }

    useEffect(() => {
        loadMessageList();
    },[])

    const chatComponents = (() => {
        if (!messageList) {
            return (<div></div>);
        } else {
            return(
                messageList.map((messages, i) => {
                    return(
                        <ChatEntry key={i} 
                        baseURL={baseURL} 
                        sender={messages.sender} 
                        sender_name={messages.sender_name} 
                        body={messages.message} 
                        timeStamp={messages.timestamp}
                        currentUserID={currentUserID} />
                    );
                })
            )
        }
    });

    const handleChange = (event) => {
        const newValue = event.target.value
        setBody(newValue)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseURL + '/messages', {
            "message": body,
            "sender": currentUserID,
            "request_id": requestID
        })
            .then(() => {
                setBody('')
                loadMessageList();
            })
            .catch((error) => {
                const message = `There was an error with your request. User profile was not saved. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                setError({ variant: 'danger', message: message });
                console.log(message);
            })
    }

    return(
        <Container>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            <h2>Chat with {otherUserName}</h2>
            <div className='chat-log'>
                {chatComponents()}
            </div>
            <div className='chat-log'>
                <Form className='chat-box' onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col xs={10}>
                            <Form.Control type='text' name='message' value={body} onChange={handleChange}/>
                        </Col>
                        <Col>
                            <Button type='submit' value='submit'>Submit</Button>
                        </Col>
                    </Form.Row>
                </Form>
                <Button className='inbox-button' variant='secondary w-100' as={Link} to={'/inbox'}>Return to Inbox</Button>
            </div>
        </Container>
    )
}

export default ChatLog;
