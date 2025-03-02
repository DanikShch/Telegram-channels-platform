package tg.platform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tg.platform.backend.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByTelegramId(Long telegramId);
}