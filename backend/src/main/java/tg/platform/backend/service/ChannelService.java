package tg.platform.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tg.platform.backend.dto.ChannelDTO;
import tg.platform.backend.dto.ChannelInfoDTO;
import tg.platform.backend.model.Channel;
import tg.platform.backend.model.User;
import tg.platform.backend.repository.ChannelRepository;
import tg.platform.backend.repository.UserRepository;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
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
        channel.setChannelId(channelDTO.getChannelId()); // это идентификатор из Telegram
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

    public ChannelDTO getChannelById(Long channelId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        System.out.println("Channel data: " + channel); // Логирование данных
        return mapToDTO(channel);
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
        existingChannel.setChannelId(channelDTO.getChannelId());
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
                channel.getId(), // Первичный ключ из базы данных
                channel.getChannelId(), // Идентификатор из Telegram
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

    public ChannelDTO getChannelInfoByName(String channelUrl) {
        if(channelRepository.existsByChannelUrl(channelUrl)) {
            throw new RuntimeException("Channel already exists");
        }
        ChannelDTO channelDTO = new ChannelDTO();
        try {
            Process process = new ProcessBuilder("python", "telethon_script.py", channelUrl).start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8));
            StringBuilder jsonOutput = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonOutput.append(line);
            }
            // Парсинг JSON
            ObjectMapper objectMapper = new ObjectMapper();
            ChannelInfoDTO channelInfo = objectMapper.readValue(jsonOutput.toString(), ChannelInfoDTO.class);
            // Заполнение ChannelDTO
            if (channelInfo.getError() != null) {
                // Обработка ошибки
                throw new RuntimeException("Python script error: " + channelInfo.getError());
            } else {
                channelDTO.setChannelName(channelInfo.getName());
                channelDTO.setDescription(channelInfo.getDescription());
                channelDTO.setSubscribers(channelInfo.getSubscribers());
                channelDTO.setChannelId(channelInfo.getChannelId());
                channelDTO.setChannelUrl(channelUrl);
            }

            int exitCode = process.waitFor();
            System.out.println("Process exit code: " + exitCode);
        } catch (Exception e) {
            // Не обрабатываем исключение здесь, пробрасываем его выше
            throw new RuntimeException("Error while getting channel info", e);
        }
        return channelDTO;
    }
}

