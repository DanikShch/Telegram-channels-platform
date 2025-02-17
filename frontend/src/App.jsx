import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import TelegramLoginButton from "./components/TelegramLoginButton";
import config from "./config/config.js";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleTelegramAuth = async (user) => {
        try {
            const response = await fetch(`${config.baseUrl}/api/users/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const responseBody = await response.text();

            if (response.ok) {
                const data = JSON.parse(responseBody);
                console.log("User data from backend:", data);

                if (data.token) {
                    localStorage.setItem("jwtToken", data.token);
                    setIsAuthenticated(true);
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

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsAuthenticated(false);
    };

    const fetchProtectedData = async () => {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            alert("You are not authenticated!");
            console.error("No token found in localStorage");
            return;
        }

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
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="app-container">
                            <div className="login-card">
                                <div className="card-header">
                                    <h1>AdGram</h1>
                                    <p className="subtitle">Login using your Telegram account</p>
                                </div>

                                <div className="card-content">{}
                                    <button className="protected-data-btn" onClick={fetchProtectedData}>
                                        <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0110 0v4" />
                                        </svg>
                                        Access Protected Data
                                    </button>

                                    {/* Кнопка авторизации через Telegram (из первого кода) */}
                                    {!isAuthenticated && (
                                        <TelegramLoginButton botName={config.botName} onAuth={handleTelegramAuth} />
                                    )}

                                    {/* Кнопка перехода в Личный кабинет */}
                                    {isAuthenticated && (
                                        <Link to="/dashboard" className="dashboard-btn">
                                            <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            </svg>
                                            Dashboard
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <Dashboard onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
