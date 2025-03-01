package tg.platform.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tg.platform.backend.dto.ChannelDTO;
import tg.platform.backend.model.Channel;
import tg.platform.backend.model.User;
import tg.platform.backend.repository.ChannelRepository;
import tg.platform.backend.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;

    public ChannelDTO addChannel(Long userId, ChannelDTO channelDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Channel channel = new Channel();
        channel.setUser(user);
        channel.setChannelName(channelDTO.getChannelName());
        channel.setChannelUrl(channelDTO.getChannelUrl());
        channel.setDescription(channelDTO.getDescription());
        channel.setSubscribers(channelDTO.getSubscribers());
        channel.setViews(channelDTO.getViews());
        channel.setFormatPrices(channelDTO.getFormatPrices());
        channel.setDiscountsEnabled(channelDTO.getDiscountsEnabled());
        channel.setSelectedDiscount(channelDTO.getSelectedDiscount());
        channel.setGeoEnabled(channelDTO.getGeoEnabled());
        channel.setSelectedRegion(channelDTO.getSelectedRegion());
        channel.setIsAuthorChannel(channelDTO.getIsAuthorChannel());
        channel.setSocialLinks(channelDTO.getSocialLinks());
        channel.setSubscriberSource(channelDTO.getSubscriberSource());

        Channel savedChannel = channelRepository.save(channel);
        return mapToDTO(savedChannel);
    }

    public List<ChannelDTO> getChannelsByUserId(Long userId) {
        return channelRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public void deleteChannel(Long channelId) {
        channelRepository.deleteById(channelId);
    }

    // Новый метод для обновления канала
    public ChannelDTO updateChannel(Long channelId, ChannelDTO channelDTO) {
        // Находим канал по ID
        Channel existingChannel = channelRepository.findById(channelId)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        // Обновляем данные канала
        existingChannel.setChannelName(channelDTO.getChannelName());
        existingChannel.setChannelUrl(channelDTO.getChannelUrl());
        existingChannel.setDescription(channelDTO.getDescription());
        existingChannel.setSubscribers(channelDTO.getSubscribers());
        existingChannel.setViews(channelDTO.getViews());
        existingChannel.setFormatPrices(channelDTO.getFormatPrices());
        existingChannel.setDiscountsEnabled(channelDTO.getDiscountsEnabled());
        existingChannel.setSelectedDiscount(channelDTO.getSelectedDiscount());
        existingChannel.setGeoEnabled(channelDTO.getGeoEnabled());
        existingChannel.setSelectedRegion(channelDTO.getSelectedRegion());
        existingChannel.setIsAuthorChannel(channelDTO.getIsAuthorChannel());
        existingChannel.setSocialLinks(channelDTO.getSocialLinks());
        existingChannel.setSubscriberSource(channelDTO.getSubscriberSource());

        // Сохраняем обновленный канал
        Channel updatedChannel = channelRepository.save(existingChannel);
        return mapToDTO(updatedChannel);
    }

    private ChannelDTO mapToDTO(Channel channel) {
        return new ChannelDTO(
                channel.getId(),
                channel.getChannelName(),
                channel.getChannelUrl(),
                channel.getDescription(),
                channel.getSubscribers(),
                channel.getViews(),
                channel.getFormatPrices(),
                channel.getDiscountsEnabled(),
                channel.getSelectedDiscount(),
                channel.getGeoEnabled(),
                channel.getSelectedRegion(),
                channel.getIsAuthorChannel(),
                channel.getSocialLinks(),
                channel.getSubscriberSource()
        );
    }
}