import React from 'react';
import SitterList from './SitterList';

export default function OwnerDashboard({ baseURL }) {
    return (
        <div>
            <h3>Owner Dashboard</h3>
            <SitterList baseURL={baseURL} />
        </div>
    )
}
