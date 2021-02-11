import React from 'react';
import { Card, Col, Row } from 'react-bootstrap'
import profilepic from '../images/weed.jpg'

export default function AboutUs() {
    return(
        <div>
            <h2>About Us</h2>
            <Row>
                <Col></Col>
                <Col>
                    <Card bg='secondary' text='light' style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={profilepic} />
                        <Card.Body>
                            <Card.Title>Christabel Escarez</Card.Title>
                            <Card.Subtitle>they.them</Card.Subtitle>
                            <Card.Body>
                                Christabel is a brilliant full-stack developer. Hire them.
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg='secondary' text='light' style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={profilepic} />
                        <Card.Body>
                            <Card.Title>Jessica Chan</Card.Title>
                            <Card.Subtitle>she.her</Card.Subtitle>
                            <Card.Body>
                                Jessica can sometimes keep plants alive. Hire her.
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}