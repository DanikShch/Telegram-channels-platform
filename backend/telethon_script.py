import sys
import os
import json
from telethon.sync import TelegramClient
from telethon.tl.functions.channels import GetFullChannelRequest
from telethon.errors import UsernameInvalidError, ChannelPrivateError, FloodWaitError

# Получаем имя канала из аргументов командной строки
CHANNEL_USERNAME = sys.argv[1]

# Настройки Telegram API
BOT_TOKEN = "7903606155:AAG6CB00BMiXFiCoSL-_LfJFLSa27PycmB4"
API_ID = 17907773
API_HASH = "a4fc42731a99bab65d9fe15bc4349868"

# Директория для сохранения аватарок
IMAGE_DIR = "../frontend/channel_avatars"
os.makedirs(IMAGE_DIR, exist_ok=True)

def sanitize_unicode(text):
    """Удаляем символы, которые не могут быть закодированы в UTF-8"""
    return text.encode('utf-8', 'ignore').decode('utf-8') if text else ""

def get_channel_info(username):
    try:
        with TelegramClient("asi", API_ID, API_HASH).start(bot_token=BOT_TOKEN) as client:
            full_channel = client(GetFullChannelRequest(username))
            channel = full_channel.chats[0]

            # Обрабатываем Unicode-символы
            channel_name = sanitize_unicode(channel.title)
            channel_desc = sanitize_unicode(full_channel.full_chat.about)
            channel_id = channel.id
            participants_count = full_channel.full_chat.participants_count

            # Сохраняем аватарку
            saved_file = "None"
            if channel.photo:
                saved_file = f"{IMAGE_DIR}/{channel_id}.jpg"
                client.download_profile_photo(channel, file=saved_file)

            data = {
                "name": channel_name,
                "description": channel_desc,
                "subscribers": participants_count,
                "channelId": channel_id,
                "avatar": saved_file
            }
            return data

    except UsernameInvalidError:
        return {"error": "Invalid username"}
    except ChannelPrivateError:
        return {"error": "Channel is private or inaccessible"}
    except FloodWaitError as e:
        return {"error": f"Flood wait: {e.seconds} seconds"}
    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Channel username is required"}, ensure_ascii=False))
        sys.exit(1)

    url = sys.argv[1]
    username = url.split('/')[-1].strip()
    channel_info = get_channel_info(username)

    # Явно указываем кодировку вывода
    json_str = json.dumps(channel_info, ensure_ascii=False)
    sys.stdout.buffer.write(json_str.encode('utf-8'))  # Бинарный вывод для гарантии
    sys.exit(0)