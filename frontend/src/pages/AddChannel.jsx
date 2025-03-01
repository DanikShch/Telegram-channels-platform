import React, { useState, useEffect } from "react";
import { Check, Plus, X, ChevronDown } from "lucide-react";
import "./AddChannel.css";

const AddChannel = () => {
    const [channelLink, setChannelLink] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Format options
    const [formatPrices, setFormatPrices] = useState({
        "1/24": "",
        "2/48": "",
        "3/72": "",
        "Нативный": "",
        "7 дней": "",
        "Репост": ""
    });

    // Discounts
    const [discountsEnabled, setDiscountsEnabled] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState("5%");
    const [discountDropdownOpen, setDiscountDropdownOpen] = useState(false);

    // Geo options
    const [geoEnabled, setGeoEnabled] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("Москва");
    const [geoDropdownOpen, setGeoDropdownOpen] = useState(false);

    // Author channel
    const [isAuthorChannel, setIsAuthorChannel] = useState(false);
    const [socialLinks, setSocialLinks] = useState([""]);

    // Source
    const [subscriberSource, setSubscriberSource] = useState("");

    // Animation
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const handleFormatPriceChange = (format, price) => {
        setFormatPrices(prev => ({
            ...prev,
            [format]: price
        }));
    };

    const handleVerifyChannel = () => {
        if (!channelLink) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsVerified(true);
            setIsLoading(false);
        }, 1000);
    };

    const handleAddSocialLink = () => {
        setSocialLinks([...socialLinks, ""]);
    };

    const handleSocialLinkChange = (index, value) => {
        const newLinks = [...socialLinks];
        newLinks[index] = value;
        setSocialLinks(newLinks);
    };

    const handleRemoveSocialLink = (index) => {
        if (socialLinks.length > 1) {
            const newLinks = [...socialLinks];
            newLinks.splice(index, 1);
            setSocialLinks(newLinks);
        }
    };

    const handleSaveChannel = () => {
        // Here you would implement the logic to save the channel
        // For now, we'll just redirect to the dashboard
        window.location.href = "/dashboard";
    };

    const formatOptions = ["1/24", "2/48", "3/72", "Нативный", "7 дней", "Репост"];
    const discountOptions = ["5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%", "55%", "60%"];
    const regionOptions = ["Москва", "Санкт-Петербург", "Минск", "Гродно", "Киев", "Алматы"];

    return (
        <div className={`add-channel-container ${fadeIn ? "fade-in" : ""}`}>
            <div className="add-channel-content">
                <h1 className="page-title">Добавить канал</h1>

                {!isVerified ? (
                    <div className="channel-verification-section">
                        <div className="input-group">
                            <input
                                type="text"
                                className="channel-input"
                                placeholder="Введите ссылку на канал"
                                value={channelLink}
                                onChange={(e) => setChannelLink(e.target.value)}
                            />
                            <button
                                className={`verify-button ${isLoading ? "loading" : ""}`}
                                onClick={handleVerifyChannel}
                                disabled={isLoading || !channelLink}
                            >
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <>
                                        <Check size={18} />
                                        <span>Проверить</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="helper-text">Вставьте ссылку на Telegram канал для проверки и добавления</p>
                    </div>
                ) : (
                    <>
                        <div className="channel-card">
                            <div className="channel-avatar">
                                <img src="https://i.imgur.com/eFV3Ep7.jpeg" alt="Channel Avatar" />
                            </div>
                            <div className="channel-info">
                                <h2 className="channel-name">Название канала</h2>
                                <p className="channel-description">Описание канала и дополнительная информация о контенте</p>
                                <div className="channel-stats">
                                    <span className="stat">
                                        <strong>12.5K</strong> подписчиков
                                    </span>
                                    <span className="stat">
                                        <strong>1.2K</strong> просмотров
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-sections">
                            {/* Format Section */}
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
                                                    checked={formatPrices[format] !== ""}
                                                    onChange={() => {
                                                        if (formatPrices[format] !== "") {
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
                                                value={formatPrices[format]}
                                                onChange={(e) => handleFormatPriceChange(format, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Discounts Section */}
                            <section className="form-section">
                                <div className="section-header">
                                    <label className="header-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={discountsEnabled}
                                            onChange={() => setDiscountsEnabled(!discountsEnabled)}
                                        />
                                        <span className="checkbox-mark"></span>
                                    </label>
                                    <h2>Скидки</h2>
                                </div>

                                {discountsEnabled && (
                                    <div className="custom-dropdown">
                                        <div
                                            className="dropdown-header"
                                            onClick={() => setDiscountDropdownOpen(!discountDropdownOpen)}
                                        >
                                            <span>{selectedDiscount}</span>
                                            <ChevronDown size={18} className={discountDropdownOpen ? "rotate" : ""} />
                                        </div>
                                        {discountDropdownOpen && (
                                            <div className="dropdown-options">
                                                {discountOptions.map((option) => (
                                                    <div
                                                        key={option}
                                                        className={`dropdown-option ${selectedDiscount === option ? "selected" : ""}`}
                                                        onClick={() => {
                                                            setSelectedDiscount(option);
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

                            {/* Geo Section */}
                            <section className="form-section">
                                <div className="section-header">
                                    <label className="header-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={geoEnabled}
                                            onChange={() => setGeoEnabled(!geoEnabled)}
                                        />
                                        <span className="checkbox-mark"></span>
                                    </label>
                                    <h2>Гео канала</h2>
                                </div>

                                {geoEnabled && (
                                    <div className="custom-dropdown">
                                        <div
                                            className="dropdown-header"
                                            onClick={() => setGeoDropdownOpen(!geoDropdownOpen)}
                                        >
                                            <span>{selectedRegion}</span>
                                            <ChevronDown size={18} className={geoDropdownOpen ? "rotate" : ""} />
                                        </div>
                                        {geoDropdownOpen && (
                                            <div className="dropdown-options">
                                                {regionOptions.map((option) => (
                                                    <div
                                                        key={option}
                                                        className={`dropdown-option ${selectedRegion === option ? "selected" : ""}`}
                                                        onClick={() => {
                                                            setSelectedRegion(option);
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

                            {/* Subscriber Source Section */}
                            <section className="form-section">
                                <h2 className="source-title">Источник подписчиков</h2>
                                <div className="input-group source-input-group">
                                    <input
                                        type="text"
                                        className="text-input"
                                        placeholder="Введите источник"
                                        value={subscriberSource}
                                        onChange={(e) => setSubscriberSource(e.target.value)}
                                    />
                                </div>
                            </section>

                            {/* Author Channel Section */}
                            <section className="form-section">
                                <div className="section-header">
                                    <label className="header-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={isAuthorChannel}
                                            onChange={() => setIsAuthorChannel(!isAuthorChannel)}
                                        />
                                        <span className="checkbox-mark"></span>
                                    </label>
                                    <h2>Авторский канал</h2>
                                </div>

                                {isAuthorChannel && (
                                    <div className="social-links">
                                        {socialLinks.map((link, index) => (
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
                                                    disabled={socialLinks.length === 1}
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
                                    Сохранить канал
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Format Info Popup */}
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

export default AddChannel;