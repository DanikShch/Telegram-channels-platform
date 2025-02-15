package tg.platform.backend.util;

import org.apache.commons.codec.digest.HmacUtils;
import java.util.Map;
import java.util.stream.Collectors;

public class TelegramAuthValidator {

    public static boolean validate(Map<String, String> authData, String botToken) {
        // 1. Формируем data_check_string
        String dataCheckString = authData.entrySet().stream()
                .filter(entry -> !entry.getKey().equals("hash")) // Исключаем поле hash
                .sorted(Map.Entry.comparingByKey()) // Сортируем по ключу
                .map(entry -> entry.getKey() + "=" + entry.getValue()) // Формируем строку "ключ=значение"
                .collect(Collectors.joining("\n")); // Объединяем с разделителем "\n"

        // 2. Вычисляем secret_key как SHA256 от botToken
        byte[] secretKey = HmacUtils.hmacSha256(botToken.getBytes(), botToken.getBytes());

        // 3. Вычисляем HMAC-SHA256 от data_check_string с использованием secret_key
        String calculatedHash = HmacUtils.hmacSha256Hex(secretKey, dataCheckString.getBytes());

        // 4. Сравниваем полученный хэш с тем, что пришёл от Telegram
        String receivedHash = authData.get("hash");
        return calculatedHash.equals(receivedHash);
    }
}