import React from 'react';
import TelegramLoginButton from './components/TelegramLoginButton';
import config from './config/config.js';

function App() {
    const handleTelegramAuth = async (user) => {
        try {
            const response = await fetch(`${config.baseUrl}/api/users/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User data from backend:', data);

                // Сохраняем токен в localStorage
                localStorage.setItem('jwtToken', data.token);

                alert(`Welcome, ${data.user.firstName}!`);
            } else {
                console.error('Error during authentication');
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    const fetchProtectedData = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('You are not authenticated!');
            return;
        }

        try {
            const response = await fetch(`${config.baseUrl}/api/protected/data`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.text();
                alert(data); // Показываем ответ в alert
            } else {
                alert('Error fetching protected data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Login with Telegram</h1>
            <TelegramLoginButton botName={config.botName} onAuth={handleTelegramAuth} />
            <button onClick={fetchProtectedData} style={styles.button}>
                Get Protected Data
            </button>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        backgroundColor: '#f4f4f4',
        textAlign: 'center',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
};

export default App;