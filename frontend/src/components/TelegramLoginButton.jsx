import React, { useEffect } from "react";

const TelegramLoginButton = ({ botName, onAuth }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.setAttribute("data-telegram-login", botName);
        script.setAttribute("data-size", "large");
        script.setAttribute("data-onauth", "onTelegramAuth(user)");
        script.setAttribute("data-request-access", "write");
        document.getElementById("telegram-login").appendChild(script);

        window.onTelegramAuth = (user) => {
            onAuth(user);
        };

        return () => {
            delete window.onTelegramAuth;
        };
    }, [botName, onAuth]);

    return <div id="telegram-login" className="flex justify-center mt-4"></div>;
};

export default TelegramLoginButton;
