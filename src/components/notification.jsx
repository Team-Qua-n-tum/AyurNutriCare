import React, { useState } from 'react';
import './notification.css';

const NotificationSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const data = [
        {
            update: 'Patient Ramesh Kumar submitted a new prescription request.',
            timestamp: 1694877900000
        },
        {
            update: 'Your personalized diet chart has been updated by Dr. Meena.',
            timestamp: 1694870400000
        },
        {
            update: 'System maintenance scheduled for Sept 18, 2:00 AM IST.',
            timestamp: 1694784000000
        }
    ];

    return (
        <>
            <div className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
                🔔
            </div>

            <div className={`notification-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Notification Alerts</h2>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                </div>
                <div className="notification-list">
                    {data.map((item, idx) => (
                        <div key={idx} className="notification-item">
                            <div className="notification-text">{item.update}</div>
                            <div className="notification-time">{new Date(item.timestamp).toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default NotificationSidebar;