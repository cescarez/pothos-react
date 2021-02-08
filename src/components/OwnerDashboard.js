import React from 'react';
import SitterList from './SitterList';

export default function OwnerDashboard({ baseURL, currentUserData }) {
    return (
        <div>
            <SitterList baseURL={baseURL} currentUserData={currentUserData} />
        </div>
    )
}
