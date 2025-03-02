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
        System.out.println("Received token: " + token); // Отладочное сообщение

        String jwtToken = token.substring(7); // Убираем "Bearer "
        Long userId = jwtUtil.getUserId(jwtToken);

        return "Hello, id=" + userId + "! Secure data is displayed on the server.";
    }
}