import React from 'react';
import SitterList from './SitterList';

export default function OwnerDashboard({ baseURL }) {
    return (
        <div>
            <h3>Select a Plant Sitter</h3>
            <SitterList baseURL={baseURL} />
        </div>
    )
}
