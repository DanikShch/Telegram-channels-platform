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

# Функция для получения информации о канале
def get_channel_info(username):
    try:
        with TelegramClient("asi", API_ID, API_HASH).start(bot_token=BOT_TOKEN) as client:
            # Получаем полную информацию о канале
            full_channel = client(GetFullChannelRequest(username))
            channel = full_channel.chats[0]

            # Извлекаем данные о канале
            channel_name = channel.title
            channel_desc = full_channel.full_chat.about
            channel_id = channel.id
            participants_count = full_channel.full_chat.participants_count

            # Сохраняем аватарку, если она есть
            profile_photo = channel.photo
            saved_file = "None"
            if profile_photo:
                saved_file = f"{IMAGE_DIR}/{channel_id}.jpg"
                client.download_profile_photo(channel, file=saved_file)

            # Формируем JSON с данными о канале
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
        return {"error": str(e)}

# Основная логика
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Channel username is required"}, ensure_ascii=False))
        sys.exit(1)

    url = sys.argv[1]
    username = url.split('/')[-1]
    channel_info = get_channel_info(username)
    print(json.dumps(channel_info, ensure_ascii=False))