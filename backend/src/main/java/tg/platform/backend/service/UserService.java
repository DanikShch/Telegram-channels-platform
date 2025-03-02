package tg.platform.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tg.platform.backend.dto.UserDTO;
import tg.platform.backend.model.User;
import tg.platform.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserDTO createOrUpdateUser(UserDTO userDTO) {
        User user = userRepository.findByTelegramId(userDTO.getTelegramId())
                .orElse(new User());

        user.setTelegramId(userDTO.getTelegramId());
        user.setUsername(userDTO.getUsername());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhotoUrl(userDTO.getPhotoUrl());
        System.out.println(userDTO);

        userRepository.save(user);
        userDTO.setId(user.getId());

        return userDTO;
    }

    public UserDTO getUserByTelegramId(Long telegramId) {
        return userRepository.findByTelegramId(telegramId)
                .map(user -> new UserDTO(
                        user.getTelegramId(),
                        user.getUsername(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getPhotoUrl(),
                        user.getId()
                ))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
