// src/pages/ModeratorPage.jsx
import React, { useEffect, useState } from "react";
import config from "../config/config";

function ModeratorPage() {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchChannels = async () => {
            const token = localStorage.getItem("jwtToken");

            try {
                const response = await fetch(`${config.baseUrl}/api/channels`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setChannels(data);
                } else {
                    console.error("Ошибка при получении каналов:", await response.text());
                }
            } catch (error) {
                console.error("Ошибка запроса к API:", error);
            }
        };

        fetchChannels();
    }, []);

    const handleApproveChannel = async (channelName) => {
        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch(`${config.baseUrl}/api/channels/approve/${channelName}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ channelName }),
            });

            if (response.ok) {
                // Обновляем список каналов после одобрения
                const updatedChannel = await response.json();
                setChannels((prevChannels) =>
                    prevChannels.map((channel) =>
                        channel.channelUrl === updatedChannel.channelUrl ? updatedChannel : channel
                    )
                );
            } else {
                console.error("Ошибка при одобрении канала:", await response.text());
            }
        } catch (error) {
            console.error("Ошибка запроса к API для одобрения канала:", error);
        }
    };

    // Обработчик для отклонения канала
    const handleRejectChannel = async (channelUrl) => {
        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch(`${config.baseUrl}/api/channels/reject/${channelUrl}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ channelUrl }),
            });

            if (response.ok) {
                // Обновляем список каналов после отклонения
                const updatedChannel = await response.json();
                setChannels((prevChannels) =>
                    prevChannels.map((channel) =>
                        channel.channelUrl === updatedChannel.channelUrl ? updatedChannel : channel
                    )
                );
            } else {
                console.error("Ошибка при отклонении канала:", await response.text());
            }
        } catch (error) {
            console.error("Ошибка запроса к API для отклонения канала:", error);
        }
    };

    return (
        <div className="moderator-page">
            <h1>Страница Модератора</h1>

            <section className="moderation-section">
                <h2>Модерация</h2>
                {channels.length === 0 ? (
                    <p>Нет добавленных каналов</p>
                ) : (
                    <div className="channels-container">
                        <h2 className="channels-title">Ваши каналы</h2>
                        <div className="channels-list">
                            {channels.map((channel) => (
                                <div key={channel.id} className="channel-item">
                                    <div className="channel-item-info">
                                        <h3 className="channel-item-name">{channel.channelName}</h3>
                                        <p className="channel-item-description">{channel.description}</p>

                                    </div>
                                    <div className="channel-item-actions">
                                        <button
                                            className="approve-channel-btn"
                                            onClick={() => handleApproveChannel(channel.channelName)}
                                        >
                                            Одобрить
                                        </button>
                                        <button
                                            className="reject-channel-btn"
                                            onClick={() => handleRejectChannel(channel.channelName)}
                                        >
                                            Отклонить
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default ModeratorPage;
