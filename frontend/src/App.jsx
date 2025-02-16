import React, { useEffect } from "react";
import TelegramLoginButton from "./components/TelegramLoginButton";
import config from "./config/config.js";

function App() {
    const handleTelegramAuth = async (user) => {
        try {
            const response = await fetch(`${config.baseUrl}/api/users/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const responseBody = await response.text(); // Читаем тело ответа

            if (response.ok) {
                const data = JSON.parse(responseBody);
                console.log("User data from backend:", data);

                if (data.token) {
                    localStorage.setItem("jwtToken", data.token);
                    console.log("Token saved to localStorage:", data.token);
                } else {
                    console.error("No token in response:", data);
                }
            } else {
                console.error(`Error during authentication: ${response.status}`);
                console.error(`Response body: ${responseBody}`);
            }
        } catch (error) {
            console.error("Error sending data to backend:", error);
        }
    };

    const fetchProtectedData = async () => {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            alert("You are not authenticated!");
            console.error("No token found in localStorage");
            return;
        }

        console.log("Sending token:", token);

        try {
            const response = await fetch(`${config.baseUrl}/api/protected/data`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.text();
                alert(data);
            } else {
                alert("Error fetching protected data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            console.log("User is already authenticated");
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Login with Telegram</h1>
                <TelegramLoginButton botName={config.botName} onAuth={handleTelegramAuth} />
                <button
                    onClick={fetchProtectedData}
                    className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    Get Protected Data
                </button>
            </div>
        </div>
    );
}

export default App;
