import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:9080/notifications');
            setNotifications(response.data);
            setUnreadCount(response.data.filter(n => !n.isRead).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const checkExpiringBudgets = async () => {
        try {
            await axios.get('http://localhost:9080/notifications/check-expiring');
            fetchNotifications();
        } catch (error) {
            console.error('Error checking expiring budgets:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.put(`http://localhost:9080/notifications/${id}/read`);
            fetchNotifications();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Check for expiring budgets every hour
        const interval = setInterval(checkExpiringBudgets, 3600000);
        return () => clearInterval(interval);
    }, []);

    // const deleteNotification = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:8080/notifications/${id}`);
    //         fetchNotifications(); // Refresh notifications after deletion
    //     } catch (error) {
    //         console.error('Error deleting notification:', error);
    //     }
    // };

    const deleteNotification = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:9080/notifications/${id}`);
            if (response.status === 200) {
                console.log('Notification deleted successfully');
                await fetchNotifications(); // Refresh notifications after deletion
            }
        } catch (error) {
            console.error('Error deleting notification:', error.response?.data || error.message);
            // Optionally add user feedback here
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, fetchNotifications, deleteNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);