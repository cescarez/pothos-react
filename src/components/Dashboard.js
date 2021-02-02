import React, { useState } from 'react'
import { Button, Card, Alert, Jumbotron, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { useHistory, Link } from 'react-router-dom'

import OwnerDashboard from './OwnerDashboard';
import SitterDashboard from './SitterDashboard';

const Dashboard = ({baseURL}) => {
    const { currentUser } = useAuth();

    return (
        <div className='dashboard'>
            {/* //include some ternary to render OwnerDashboard or SitterDashboard based on logged in user */}
            <Jumbotron variant='plant'>
                <h1>Welcome back!</h1>
                <p>This is your Plant Owner Dashboard. See below for a list of all available Sitters.</p>
            </Jumbotron>
            <Tabs>
            <Tab eventKey='ownerDashboard' title='Owner Dashboard'>
                <OwnerDashboard baseURL={baseURL}  />
            </Tab>
            <Tab eventKey='sitterDashboard' title='SitterDashboard'>
                <SitterDashboard baseURL={baseURL}  />
            </Tab>
            </Tabs>
        </div>
    )
}

export default Dashboard;