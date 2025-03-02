package tg.platform.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}") // Секретный ключ из application.properties
    private String secret;

    @Value("${jwt.expiration}") // Время жизни токена (в миллисекундах)
    private long expiration;

    // Генерация токена
    public String generateToken(Long userId) {
        String token = Jwts.builder()
                .setSubject(userId.toString()) // Используем userId как subject
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();

        System.out.println("Generated token for userId " + userId + ": " + token); // Логируем токен
        return token;
    }

    // Проверка токена
    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    // Проверка, истёк ли токен
    public boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    public Long getUserId(String token) {
        String subject = getClaims(token).getSubject();
        return Long.parseLong(subject); // Преобразуем subject в Long
    }
}