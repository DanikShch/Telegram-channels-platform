package tg.platform.backend.controller;

import org.springframework.web.bind.annotation.*;
import tg.platform.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api/protected")
@RequiredArgsConstructor
public class ProtectedController {

    private final JwtUtil jwtUtil;

    @GetMapping("/data")
    public String getProtectedData(@RequestHeader("Authorization") String token) {
        // Убираем "Bearer " из токена
        String jwtToken = token.substring(7);

        // Проверяем токен и получаем имя пользователя
        String username = jwtUtil.getUsername(jwtToken);

        // Возвращаем защищённые данные
        return "Hello, " + username + "! This is protected data.";
    }
}