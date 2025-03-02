import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import "./Dashboard.css";
import config from "../config/config.js";
import {jwtDecode} from "jwt-decode";

const Dashboard = ({ onLogout }) => {
    const [channels, setChannels] = useState([]);

    // Загрузка каналов пользователя
    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                if (!token) {
                    alert("Вы не авторизованы!");
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;
                const response = await fetch(`${config.baseUrl}/api/channels/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setChannels(data);
                } else {
                    const errorData = await response.json();
                    console.error("Ошибка при загрузке каналов:", errorData);
                    alert(`Ошибка: ${errorData.message || "Неизвестная ошибка"}`);
                }
            } catch (error) {
                console.error("Ошибка при отправке запроса:", error);
                alert("Произошла ошибка при загрузке каналов.");
            }
        };

        fetchChannels();
    }, []);

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
                    {channels.map((channel) => (
                        <div key={channel.id} className="channel-item">
                            <div className="channel-item-avatar">
                                <img src={"channel_avatars/"+channel.channelId+".jpg"} alt={channel.channelName} />
                            </div>
                            <div className="channel-item-info">
                                <h3 className="channel-item-name">{channel.channelName}</h3>
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