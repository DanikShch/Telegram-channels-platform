package tg.platform.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tg.platform.backend.dto.ChannelDTO;
import tg.platform.backend.service.ChannelService;

import java.util.List;

@RestController
@RequestMapping("/api/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @PostMapping("/{userId}")
    public ChannelDTO addChannel(@PathVariable Long userId, @RequestBody ChannelDTO channelDTO) {
        return channelService.addChannel(userId, channelDTO);
    }

    @GetMapping("/{userId}")
    public List<ChannelDTO> getChannelsByUserId(@PathVariable Long userId) {
        return channelService.getChannelsByUserId(userId);
    }

    @DeleteMapping("/{channelId}")
    public void deleteChannel(@PathVariable Long channelId) {
        channelService.deleteChannel(channelId);
    }

    // Добавляем метод для обновления канала
    @PutMapping("/{channelId}")
    public ChannelDTO updateChannel(@PathVariable Long channelId, @RequestBody ChannelDTO channelDTO) {
        return channelService.updateChannel(channelId, channelDTO);
    }
}