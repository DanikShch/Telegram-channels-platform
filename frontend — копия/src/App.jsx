import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TelegramLoginButton from "./components/TelegramLoginButton";
import Dashboard from "./pages/Dashboard";
import config from "./config/config";

function App() {
    const handleTelegramAuth = (user) => {
        console.log("Telegram auth:", user);
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="container">
                            <h1>Welcome</h1>
                            <button onClick={() => console.log("Fetching protected data")}>
                                Access Protected Data
                            </button>
                            <TelegramLoginButton botName={config.botName} onAuth={handleTelegramAuth} />
                        </div>
                    }
                />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;