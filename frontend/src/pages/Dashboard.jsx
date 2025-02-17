import React from "react";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome!</p>
            <div className="animated-text">
                <span>💅</span>
                <span>✨</span>
                <span>🤡</span>
                <span>🚀</span>
                <span>👾</span>
                <span>🧶</span>
            </div>

            <button className="logout-btn" onClick={onLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;