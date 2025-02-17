import React from 'react';
import './Dashboard.css'; // Создайте этот файл для стилей Dashboard

const Dashboard = ({ onLogout }) => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Welcome to your secure dashboard!</p>
                </div>

                <div className="emoji-container">
                    {['💫', '✨', '🚀', '⭐'].map((emoji, index) => (
                        <span key={emoji} className="animated-emoji">{emoji}</span>
                    ))}
                </div>

                <button onClick={onLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;