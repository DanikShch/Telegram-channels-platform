import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Plus, X, ChevronDown } from "lucide-react";
import "./AddChannel.css";
import config from "../config/config.js";

const EditChannel = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();

    const [channelData, setChannelData] = useState({
        channelName: "",
        channelUrl: "",
        description: "",
        channelId: "",
        subscribers: "",
        views: "",
        formatPrices: {
            "1/24": "",
            "2/48": "",
            "3/72": "",
            "Нативный": "",
            "7 дней": "",
            "Репост": "",
        },
        discountsEnabled: false,
        selectedDiscount: "5%",
        geoEnabled: false,
        selectedRegion: "",
        isAuthorChannel: false,
        socialLinks: [""],
        subscriberSource: "",
    });

    const [isVerified, setIsVerified] = useState(true); // Предполагаем, что канал уже проверен
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [discountDropdownOpen, setDiscountDropdownOpen] = useState(false);
    const [geoDropdownOpen, setGeoDropdownOpen] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    useEffect(() => {
        const fetchChannelData = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                if (!token) {
                    alert("Вы не авторизованы!");
                    return;
                }

                const response = await fetch(`${config.baseUrl}/api/channels/channel/${channelId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Channel data loaded:", data); // Логирование данных
                    console.log("Channel ID from API:", data.channelId); // Логирование channelId
                    setChannelData({
                        channelName: data.channelName || "",
                        channelUrl: data.channelUrl || "",
                        channelId: data.channelId || "", // Убедитесь, что это идентификатор из Telegram
                        description: data.description || "",
                        subscribers: data.subscribers || "",
                        views: data.views || "",
                        formatPrices: data.formatPrices || {
                            "1/24": "",
                            "2/48": "",
                            "3/72": "",
                            "Нативный": "",
                            "7 дней": "",
                            "Репост": "",
                        },
                        discountsEnabled: data.discountsEnabled || false,
                        selectedDiscount: data.selectedDiscount || "5%",
                        geoEnabled: data.geoEnabled || false,
                        selectedRegion: data.selectedRegion || "Москва",
                        isAuthorChannel: data.isAuthorChannel || false,
                        socialLinks: data.socialLinks || [""],
                        subscriberSource: data.subscriberSource || "",
                    });
                } else {
                    const errorData = await response.json();
                    console.error("Ошибка при загрузке канала:", errorData);
                    alert(`Ошибка: ${errorData.message || "Неизвестная ошибка"}`);
                }
            } catch (error) {
                console.error("Ошибка при отправке запроса:", error);
                alert("Произошла ошибка при загрузке канала.");
            }
        };

        fetchChannelData();
    }, [channelId]);

    const updateChannelData = (field, value) => {
        setChannelData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFormatPriceChange = (format, value) => {
        // Разрешаем только цифры
        const numericValue = value.replace(/[^0-9]/g, "");
        const updatedFormatPrices = { ...channelData.formatPrices, [format]: numericValue };
        updateChannelData("formatPrices", updatedFormatPrices);
    };

    const handleAddSocialLink = () => {
        updateChannelData("socialLinks", [...channelData.socialLinks, ""]);
    };

    const handleSocialLinkChange = (index, value) => {
        const newLinks = [...channelData.socialLinks];
        newLinks[index] = value;
        updateChannelData("socialLinks", newLinks);
    };

    const handleRemoveSocialLink = (index) => {
        if (channelData.socialLinks.length > 1) {
            const newLinks = [...channelData.socialLinks];
            newLinks.splice(index, 1);
            updateChannelData("socialLinks", newLinks);
        }
    };

    const handleSaveChannel = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                alert("Вы не авторизованы!");
                return;
            }

            const response = await fetch(`${config.baseUrl}/api/channels/${channelId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(channelData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Канал успешно обновлен:", data);
                navigate("/dashboard");
            } else {
                const errorData = await response.json();
                console.error("Ошибка при обновлении канала:", errorData);
                alert(`Ошибка: ${errorData.message || "Неизвестная ошибка"}`);
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
            alert("Произошла ошибка при обновлении канала.");
        }
    };

    const formatOptions = ["1/24", "2/48", "3/72", "Нативный", "7 дней", "Репост"];
    const discountOptions = ["5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%", "55%", "60%"];
    const regionOptions = ["Москва", "Санкт-Петербург", "Минск", "Гродно", "Киев", "Алматы"];

    return (
        <div className={`add-channel-container ${fadeIn ? "fade-in" : ""}`}>
            <div className="add-channel-content">
                <h1 className="page-title">Редактировать канал</h1>

                <div className="channel-card">
                    <div className="channel-avatar">
                        <img src={"/channel_avatars/"+channelData.channelId+".jpg"} alt={channelData.channelId}/>
                    </div>
                    <div className="channel-info">
                        <h2 className="channel-name">{channelData.channelName}</h2>
                        <p className="channel-description">{channelData.description}</p>
                        <div className="channel-stats">
                            <span className="stat">
                                <strong>{channelData.subscribers}</strong> подписчиков
                            </span>
                            <span className="stat">
                                <strong>{channelData.views}</strong> просмотров
                            </span>
                        </div>
                    </div>
                </div>

                <div className="form-sections">
                    {/* Формат и цена размещения */}
                    <section className="form-section">
                        <div className="section-header">
                            <h2>Формат и цена размещения</h2>
                            <button
                                className="more-button"
                                onClick={() => setShowPopup(true)}
                            >
                                Подробнее
                            </button>
                        </div>
                        <div className="format-price-grid">
                            {formatOptions.map((format) => (
                                <div key={format} className="format-price-row">
                                    <label className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={channelData.formatPrices[format] !== ""}
                                            onChange={() => {
                                                if (channelData.formatPrices[format] !== "") {
                                                    handleFormatPriceChange(format, "");
                                                } else {
                                                    handleFormatPriceChange(format, "0");
                                                }
                                            }}
                                        />
                                        <span className="checkbox-mark"></span>
                                        <span className="checkbox-label">{format}</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="price-input"
                                        placeholder="Цена"
                                        value={channelData.formatPrices[format]}
                                        onChange={(e) => handleFormatPriceChange(format, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Скидки */}
                    <section className="form-section">
                        <div className="section-header">
                            <label className="header-checkbox">
                                <input
                                    type="checkbox"
                                    checked={channelData.discountsEnabled}
                                    onChange={() => updateChannelData("discountsEnabled", !channelData.discountsEnabled)}
                                />
                                <span className="checkbox-mark"></span>
                            </label>
                            <h2>Скидки</h2>
                        </div>

                        {channelData.discountsEnabled && (
                            <div className="custom-dropdown">
                                <div
                                    className="dropdown-header"
                                    onClick={() => setDiscountDropdownOpen(!discountDropdownOpen)}
                                >
                                    <span>{channelData.selectedDiscount}</span>
                                    <ChevronDown size={18} className={discountDropdownOpen ? "rotate" : ""} />
                                </div>
                                {discountDropdownOpen && (
                                    <div className="dropdown-options">
                                        {discountOptions.map((option) => (
                                            <div
                                                key={option}
                                                className={`dropdown-option ${channelData.selectedDiscount === option ? "selected" : ""}`}
                                                onClick={() => {
                                                    updateChannelData("selectedDiscount", option);
                                                    setDiscountDropdownOpen(false);
                                                }}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    {/* Гео канала */}
                    <section className="form-section">
                        <div className="section-header">
                            <label className="header-checkbox">
                                <input
                                    type="checkbox"
                                    checked={channelData.geoEnabled}
                                    onChange={() => updateChannelData("geoEnabled", !channelData.geoEnabled)}
                                />
                                <span className="checkbox-mark"></span>
                            </label>
                            <h2>Гео канала</h2>
                        </div>

                        {channelData.geoEnabled && (
                            <div className="custom-dropdown">
                                <div
                                    className="dropdown-header"
                                    onClick={() => setGeoDropdownOpen(!geoDropdownOpen)}
                                >
                                    <span>{channelData.selectedRegion}</span>
                                    <ChevronDown size={18} className={geoDropdownOpen ? "rotate" : ""} />
                                </div>
                                {geoDropdownOpen && (
                                    <div className="dropdown-options">
                                        {regionOptions.map((option) => (
                                            <div
                                                key={option}
                                                className={`dropdown-option ${channelData.selectedRegion === option ? "selected" : ""}`}
                                                onClick={() => {
                                                    updateChannelData("selectedRegion", option);
                                                    setGeoDropdownOpen(false);
                                                }}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    {/* Источник подписчиков */}
                    <section className="form-section">
                        <h2 className="source-title">Источник подписчиков</h2>
                        <div className="input-group source-input-group">
                            <input
                                type="text"
                                className="text-input"
                                placeholder="Введите источник"
                                value={channelData.subscriberSource}
                                onChange={(e) => updateChannelData("subscriberSource", e.target.value)}
                            />
                        </div>
                    </section>

                    {/* Авторский канал */}
                    <section className="form-section">
                        <div className="section-header">
                            <label className="header-checkbox">
                                <input
                                    type="checkbox"
                                    checked={channelData.isAuthorChannel}
                                    onChange={() => updateChannelData("isAuthorChannel", !channelData.isAuthorChannel)}
                                />
                                <span className="checkbox-mark"></span>
                            </label>
                            <h2>Авторский канал</h2>
                        </div>

                        {channelData.isAuthorChannel && (
                            <div className="social-links">
                                {channelData.socialLinks.map((link, index) => (
                                    <div key={index} className="social-link-input">
                                        <input
                                            type="text"
                                            className="text-input"
                                            placeholder="Ссылка на соцсеть"
                                            value={link}
                                            onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                                        />
                                        <button
                                            className="remove-link-button"
                                            onClick={() => handleRemoveSocialLink(index)}
                                            disabled={channelData.socialLinks.length === 1}
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button className="add-link-button" onClick={handleAddSocialLink}>
                                    <Plus size={18} />
                                    <span>Добавить соцсеть</span>
                                </button>
                            </div>
                        )}
                    </section>

                    <div className="form-actions">
                        <button className="submit-button" onClick={handleSaveChannel}>
                            Сохранить изменения
                        </button>
                    </div>
                </div>
            </div>

            {/* Форматы размещения (попап) */}
            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            <h2>Форматы размещения</h2>
                            <button className="close-button" onClick={() => setShowPopup(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="popup-body">
                            <div className="format-info">
                                <h3>1/24</h3>
                                <p>Размещение на 24 часа в первой позиции. Идеально для срочных объявлений и важных новостей.</p>
                            </div>
                            <div className="format-info">
                                <h3>2/48</h3>
                                <p>Размещение на 48 часов во второй позиции. Хороший баланс между видимостью и стоимостью.</p>
                            </div>
                            <div className="format-info">
                                <h3>3/72</h3>
                                <p>Размещение на 72 часа в третьей позиции. Подходит для долгосрочных объявлений.</p>
                            </div>
                            <div className="format-info">
                                <h3>Нативный</h3>
                                <p>Естественная интеграция рекламы в контент канала. Выглядит как обычный пост.</p>
                            </div>
                            <div className="format-info">
                                <h3>7 дней</h3>
                                <p>Размещение на 7 дней. Максимальный охват аудитории в течение недели.</p>
                            </div>
                            <div className="format-info">
                                <h3>Репост</h3>
                                <p>Репост вашего контента с другого канала. Быстрый способ расширить аудиторию.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditChannel;