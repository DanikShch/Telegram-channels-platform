package tg.platform.backend.util;

import org.apache.commons.codec.digest.HmacUtils;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Map;
import java.util.stream.Collectors;

public class TelegramAuthValidator {

    public static boolean validate(Map<String, String> authData, String botToken) {
        if (!authData.containsKey("hash")) {
            return false;
        }

        // Формируем строку data_check_string
        String dataCheckString = authData.entrySet().stream()
                .filter(entry -> !entry.getKey().equals("hash"))
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> entry.getKey() + "=" + entry.getValue())
                .collect(Collectors.joining("\n"));

        // Вычисляем secret_key как SHA256(botToken)
        byte[] secretKey = sha256(botToken);

        // Вычисляем HMAC-SHA256 от data_check_string с использованием secret_key
        String calculatedHash = HmacUtils.hmacSha256Hex(secretKey, dataCheckString.getBytes(StandardCharsets.UTF_8));

        // Сравниваем полученный хеш с переданным от Telegram
        return calculatedHash.equals(authData.get("hash"));
    }

    private static byte[] sha256(String base) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return digest.digest(base.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException("Error generating SHA-256 hash", e);
        }
    }
}
