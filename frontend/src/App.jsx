import { useEffect } from 'react';

const TelegramLoginButton = ({ botName, onAuth }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.async = true;
        script.setAttribute('data-telegram-login', "AdGramX_bot"); // Имя вашего бота
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-auth-url', 'https://your-backend-url.com/api/users/auth'); // URL вашего бэкенда
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-userpic', 'false'); // Не показывать фото профиля
        document.body.appendChild(script);

        // Обработчик события для аутентификации
        window.TelegramLoginWidget = {
            onAuth: (user) => {
                // Вызовите функцию обратного вызова с данными пользователя
                onAuth(user);
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [botName, onAuth]);

    return <div id="telegram-login"></div>;
};

export default TelegramLoginButton;
/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/
