package tg.platform.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tg.platform.backend.dto.UserDTO;
import tg.platform.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/auth")
    public UserDTO auth(@RequestBody UserDTO userDTO) {
        return userService.createOrUpdateUser(userDTO);
    }

    @GetMapping("/{telegramId}")
    public UserDTO getUser(@PathVariable Long telegramId) {
        return userService.getUserByTelegramId(telegramId);
    }
}