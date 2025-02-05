package tg.platform.backend.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long telegramId;
    private String username;
    private String firstName;
    private String lastName;
    private String photoUrl;
}
