import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { Container, Button, Form, Col, Alert } from 'react-bootstrap';
// import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import ChatEntry from './ChatEntry';
import './ChatLog.css';
import UploadForm from './UploadForm';

const ChatLog = ({ location }) => {
    const [messageList, setMessageList] = useState(null);
    const [error, setError] = useState('');
    // const { currentUser } = useAuth();
    // const [user, setUser] = useState(null);
    const [body, setBody] = useState('')
    const match = useRouteMatch('/requests/:id');
    const requestID = match.params.id;
    const [baseURL, setBaseURL] = useState();
    const [currentUserID, setCurrentUserID] = useState();
    const [otherUserName, setOtherUserName] = useState();

    const loadMessageList = (someURL) => {
        console.log(someURL);
        axios.get(someURL + '/messages-by-request/' + requestID)
            .then((response) => {
                const apiMessages = Object.values(response.data)
                setMessageList(apiMessages);
            }).catch((error) => {
                const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }

    const loadRequestParams = () => {
        const requestParams = location.state;
        setBaseURL(requestParams.baseURL);
        setCurrentUserID(requestParams.currentUserID);
        setOtherUserName(requestParams.otherUserName);
        loadMessageList(requestParams.baseURL);
    }

    useEffect(() => {
        loadRequestParams();
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
                        text={messages.message}
                        photo={messages.photo}
                        photo_url={messages.photo_url}
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
            "request_id": requestID,
            "photo_url": '',
            "photo": false
        })
            .then(() => {
                setBody('')
                loadMessageList(baseURL);
            })
            .catch((error) => {
                const message = `There was an error with your request. User profile was not saved. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                setError({ variant: 'danger', message: message });
                console.log(message);
            })
    }

    const requestRouterParams = () => {
        return ({
            pathname: '/gallery/' + requestID,
            state: {
                baseURL: baseURL,
                currentUserID: currentUserID,
                otherUserName: otherUserName
            }
        })
    } 

    return(
        <Container>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            <h2>Chat with {otherUserName}</h2>
            {/* <Button className='gallery-button' variant='outline-info' as={Link} to={'/gallery/' + requestID}>View Gallery</Button> */}
            <Button className='gallery-button' variant='outline-info'>
                <Link to={requestRouterParams}>View Gallery</Link>
            </Button>
            <div className='chat-log'>
                {chatComponents()}
            </div>
            <div className='chat-log'>
                <Form className='chat-box' onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col xs={8} md={9}>
                            <Form.Control type='text' name='message' value={body} onChange={handleChange}/>
                        </Col>
                        <Col>
                            <UploadForm loadMessageList={loadMessageList} requestID={requestID} sender={currentUserID} baseURL={baseURL}/>
                        </Col>
                        <Col>
                            <Button type='submit' value='submit'>Submit</Button>
                        </Col>
                    </Form.Row>
                </Form>
                <Container className='d-inline-flex justify-content-around'>
                        <Button className='inbox-button' variant='secondary' as={Link} to={'/'}>Return to Dashboard</Button>
                        <Button className='inbox-button' variant='secondary' as={Link} to={'/inbox'}>Return to Inbox</Button>
                </Container>

            </div>
        </Container>
    )
}

export default ChatLog;
