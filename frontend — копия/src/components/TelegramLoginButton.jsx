import React, { useEffect } from "react";

const TelegramLoginButton = ({ botName, onAuth }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.setAttribute("data-telegram-login", botName);
        script.setAttribute("data-size", "large");
        script.setAttribute("data-radius", "8");
        script.setAttribute("data-onauth", "onTelegramAuth(user)");
        script.setAttribute("data-request-access", "write");

        window.onTelegramAuth = (user) => {
            onAuth(user);
        };

        const container = document.getElementById("telegram-login-container");
        if (container) {
            container.innerHTML = "";
            container.appendChild(script);
        }

        return () => {
            if (container) {
                container.innerHTML = "";
            }
            delete window.onTelegramAuth;
        };
    }, [botName, onAuth]);

    return <div id="telegram-login-container" className="flex justify-center"></div>;
};

export default TelegramLoginButton;