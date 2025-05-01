import React, { useState } from 'react';
import { BiNotification } from 'react-icons/bi';
import { useNotifications } from '../context/NotificationContext';
import '../styles/Notification.css'; // Add this import

const NotificationIcon = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { notifications, unreadCount, markAsRead, deleteNotification } = useNotifications();

    const handleDelete = (e, id) => {
        e.stopPropagation(); // Prevent triggering the markAsRead
        deleteNotification(id);
    };

    return (
        <div className="notify-container">
            <div className="notify" onClick={() => setShowDropdown(!showDropdown)}>
                <BiNotification className="icon" />
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>

            {showDropdown && (
                <div className="notifications-dropdown">
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <div
                                key={notification._id}
                                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                            // onClick={() => markAsRead(notification._id)}
                            >
                                {/* <p>{notification.message}</p>
                                <small>{new Date(notification.createdAt).toLocaleDateString()}</small> */}
                                <div onClick={() => markAsRead(notification._id)}>
                                    <p>{notification.message}</p>
                                    <small>{new Date(notification.createdAt).toLocaleDateString()}</small>
                                </div>
                                <button
                                    className="delete-btn"
                                    onClick={(e) => handleDelete(e, notification._id)}
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="no-notifications">No notifications</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationIcon;