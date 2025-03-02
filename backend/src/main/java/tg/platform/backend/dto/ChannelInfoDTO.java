package tg.platform.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChannelInfoDTO {
    private String name;
    private String description;
    private Long subscribers;
    private Long channelId;
    private String error;
    private String avatar;
}