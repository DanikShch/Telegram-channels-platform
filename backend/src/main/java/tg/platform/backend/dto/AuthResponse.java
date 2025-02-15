package tg.platform.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token; // JWT-токен
    private UserDTO user; // Данные пользователя
}