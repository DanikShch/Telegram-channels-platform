import React, { useEffect } from 'react';

const TelegramLoginButton = ({ botName, onAuth }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');
        document.body.appendChild(script);

        // Обработчик для получения данных от Telegram
        window.onTelegramAuth = (user) => {
            onAuth(user); // Передаем данные в родительский компонент
        };

        return () => {
            document.body.removeChild(script);
            delete window.onTelegramAuth; // Удаляем обработчик при размонтировании компонента
        };
    }, [botName, onAuth]);

    return <div id="telegram-login"></div>;
};

export default TelegramLoginButton;