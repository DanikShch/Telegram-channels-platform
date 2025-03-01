import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
    // Mock data for channels - in a real app, this would come from a database
    const [channels, setChannels] = useState([
        {
            id: 1,
            name: "Название канала 1",
            avatar: "https://i.imgur.com/eFV3Ep7.jpeg",
            subscribers: "12.5K",
            views: "1.2K",
            description: "Описание канала и дополнительная информация о контенте"
        },
        {
            id: 2,
            name: "Название канала 2",
            avatar: "https://i.imgur.com/eFV3Ep7.jpeg",
            subscribers: "8.3K",
            views: "950",
            description: "Еще один интересный канал с полезным контентом"
        }
    ]);

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

            <div className="channels-container">
                <h2 className="channels-title">Ваши каналы</h2>
                <div className="channels-list">
                    {channels.map(channel => (
                        <div key={channel.id} className="channel-item">
                            <div className="channel-item-avatar">
                                <img src={channel.avatar} alt={channel.name} />
                            </div>
                            <div className="channel-item-info">
                                <h3 className="channel-item-name">{channel.name}</h3>
                                <p className="channel-item-description">{channel.description}</p>
                                <div className="channel-item-stats">
                                    <span className="stat">
                                        <strong>{channel.subscribers}</strong> подписчиков
                                    </span>
                                    <span className="stat">
                                        <strong>{channel.views}</strong> просмотров
                                    </span>
                                </div>
                            </div>
                            <Link to={`/edit-channel/${channel.id}`} className="edit-channel-btn">
                                <Edit size={18} />
                                <span>Редактировать</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <Link to="/add-channel" className="add-channel-btn">
                Add channel
            </Link>

            <button className="logout-btn" onClick={onLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;