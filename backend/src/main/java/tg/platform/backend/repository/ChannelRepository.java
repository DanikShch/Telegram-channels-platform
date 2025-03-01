package tg.platform.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tg.platform.backend.model.Channel;

import java.util.List;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    List<Channel> findByUserId(Long userId);
}