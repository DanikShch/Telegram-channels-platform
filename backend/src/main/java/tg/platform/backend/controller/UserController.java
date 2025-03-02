package tg.platform.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tg.platform.backend.dto.AuthResponse;
import tg.platform.backend.dto.UserDTO;
import tg.platform.backend.service.UserService;
import tg.platform.backend.util.TelegramAuthValidator;
import tg.platform.backend.util.JwtUtil;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    private final JwtUtil jwtUtil;

    @PostMapping("/auth")
    public AuthResponse auth(@RequestBody Map<String, String> authData) {
        System.out.println("AuthController");
        // Проверяем данные от Telegram
        /*if (!TelegramAuthValidator.validate(authData, botToken)) {
            throw new RuntimeException("Invalid Telegram data");
        }*/

        // Преобразуем данные в DTO
        UserDTO userDTO = new UserDTO();
        userDTO.setTelegramId(Long.parseLong(authData.get("id")));
        userDTO.setUsername(authData.get("username"));
        userDTO.setFirstName(authData.get("first_name"));
        userDTO.setLastName(authData.get("last_name"));
        userDTO.setPhotoUrl(authData.get("photo_url"));

        // Сохраняем или обновляем пользователя
        UserDTO savedUser = userService.createOrUpdateUser(userDTO);

        // Генерируем JWT-токен (пример)
        String token = jwtUtil.generateToken(savedUser.getId());

        // Возвращаем ответ с токеном и данными пользователя
        return new AuthResponse(token, savedUser);
    }

    @GetMapping("/{telegramId}")
    public UserDTO getUser(@PathVariable Long telegramId) {
        return userService.getUserByTelegramId(telegramId);
    }

}