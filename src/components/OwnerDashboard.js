import React from 'react';
import SitterList from './SitterList';

export default function OwnerDashboard({ baseURL }) {
    return (
        <div>
            <SitterList baseURL={baseURL} />
        </div>
    )
}
