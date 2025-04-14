import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Navigate,
    useNavigate
} from "react-router-dom";
import TelegramLoginButton from "./components/TelegramLoginButton";
import config from "./config/config.js";
import Dashboard from "./pages/Dashboard";
import AddChannel from "./pages/AddChannel";
import EditChannel from "./pages/EditChannel";
import ModeratorPage from "./pages/ModeratorPage";
import ApprovedChannels from "./pages/ApprovedChannels"; // 👈 новый импорт
import "./App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModerator, setIsModerator] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
                if (data.token) {
                    localStorage.setItem("jwtToken", data.token);
                    setIsAuthenticated(true);
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
        setIsModerator(false);
    };

    const handleModeratorPasswordSubmit = async () => {
        const response = await fetch(`${config.baseUrl}/api/verify-moderator-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            setIsModerator(true);
            setShowPasswordForm(false);
        } else {
            alert("Неверный пароль!");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && isModerator) {
            navigate("/moderator");
        }
    }, [isAuthenticated, isModerator, navigate]);

    return (
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

                            <div className="card-content">
                                {!isAuthenticated && (
                                    <TelegramLoginButton botName={config.botName} onAuth={handleTelegramAuth} />
                                )}

                                {isAuthenticated && !isModerator && (
                                    <button
                                        className="protected-data-btn"
                                        onClick={() => setShowPasswordForm(true)}
                                    >
                                        Become Moderator
                                    </button>
                                )}

                                {showPasswordForm && (
                                    <div>
                                        <input
                                            type="password"
                                            placeholder="Enter moderator password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            className="protected-data-btn"
                                            onClick={handleModeratorPasswordSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                )}

                                {isAuthenticated && (
                                    <>
                                        <Link to="/dashboard" className="dashboard-btn">
                                            Dashboard
                                        </Link>

                                        <Link to="/approved-channels" className="dashboard-btn">
                                            Посмотреть каналы
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                }
            />

            <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />}
            />

            <Route
                path="/add-channel"
                element={isAuthenticated ? <AddChannel /> : <Navigate to="/" />}
            />

            <Route
                path="/edit-channel/:channelId"
                element={isAuthenticated ? <EditChannel /> : <Navigate to="/" />}
            />

            <Route
                path="/moderator"
                element={isModerator ? <ModeratorPage /> : <Navigate to="/" />}
            />

            <Route
                path="/approved-channels"
                element={isAuthenticated ? <ApprovedChannels /> : <Navigate to="/" />}
            />
        </Routes>
    );
}

export default function WrappedApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}
