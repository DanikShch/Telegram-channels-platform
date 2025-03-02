package tg.platform.backend.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChannelDTO {
    private Long id;
    private Long channelId;
    private String channelName;
    private String channelUrl;
    private String description;
    private Long subscribers;
    private String views;
    private Map<String, String> formatPrices;
    private Boolean discountsEnabled;
    private String selectedDiscount;
    private Boolean geoEnabled;
    private String selectedRegion;
    private Boolean isAuthorChannel;
    private List<String> socialLinks;
    private String subscriberSource;
}