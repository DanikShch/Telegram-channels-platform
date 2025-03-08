# AdGram — Telegram channels platform

## Технологии

### Frontend:
- React.js
- JavaScript
- Telegram Widget (для авторизации через Telegram)

### Backend:
- Spring Boot (Java)
- JWT (JSON Web Tokens)
- Telegram API для проверки данных авторизации
- Python (для работы с Telethon) 

## Установка

### 1. Frontend (React)

#### Шаги по установке:

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/DanikShch/Telegram-channels-platform/frontend
    ```

2. Установите зависимости:
    ```bash
    npm install
    ```

3. Запустите сервер:
    ```bash
    npm start
    ```

Frontend будет доступен по адресу [http://localhost:5173](http://localhost:5173). Виджет для авторизации через Telegram будет встроен в страницу, и пользователи смогут авторизоваться.

---

### 2. Backend (Spring Boot)

#### Шаги по установке:

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/DanikShch/Telegram-channels-platform/backend
    ```

2. Установите зависимости с помощью Maven:
    ```bash
    mvn clean install
    ```

3. Установите зависимости для Python:
    ```bash
    pip install telethon
    ```

4. Запустите сервер:
    ```bash
    mvn spring-boot:run
    ```

Backend будет доступен по адресу [http://localhost:8080](http://localhost:8080). Он обрабатывает данные авторизации от Telegram и возвращает JWT-токен для дальнейшего использования на клиентской стороне.

---

## В целом

### Frontend (React):
- Встраивает Telegram-виджет на страницу.
- Пользователи нажимают кнопку для авторизации через Telegram.
- Когда пользователь авторизуется через Telegram, данные передаются в React-компонент через `onTelegramAuth`.
- Эти данные отправляются боту Telegram, он отправляет данные на сервер для дальнейшей обработки.

### Backend (Spring Boot):
- Сервер принимает данные, полученные от Telegram.
- Данные проверяются на подлинность с помощью `TelegramAuthValidator`.
- Если данные корректны, сервер создает или обновляет пользователя в базе данных.
- Генерируется JWT-токен, который возвращается в ответе и используется на фронтенде для авторизации пользователя.
