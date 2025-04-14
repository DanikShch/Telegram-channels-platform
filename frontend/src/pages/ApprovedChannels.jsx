import React, { useEffect, useState } from "react";
import config from "../config/config";

function ApprovedChannels() {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchApprovedChannels = async () => {
            try {
                const response = await fetch(`${config.baseUrl}/api/channels/approved`);
                if (response.ok) {
                    const data = await response.json();
                    setChannels(data);
                } else {
                    console.error("Ошибка при получении одобренных каналов:", await response.text());
                }
            } catch (error) {
                console.error("Ошибка запроса к API:", error);
            }
        };

        fetchApprovedChannels();
    }, []);

    return (
        <div className="approved-channels-page">
            <h1>Одобренные каналы</h1>
            {channels.length === 0 ? (
                <p>Пока нет одобренных каналов</p>
            ) : (
                <div className="channels-list">
                    {channels.map((channel) => (
                        <div key={channel.id} className="channel-item">
                            <h3>{channel.channelName}</h3>
                            <p>{channel.description}</p>
                            <p><strong>Подписчиков:</strong> {channel.subscribers}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ApprovedChannels;
