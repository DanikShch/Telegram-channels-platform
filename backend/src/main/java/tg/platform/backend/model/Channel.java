package tg.platform.backend.model;

import jakarta.persistence.*;
import lombok.*;
import tg.platform.backend.util.HashMapConverter;
import tg.platform.backend.util.ListConverter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "channels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Channel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "channel_name", nullable = false)
    private String channelName;

    @Column(name = "channel_url", nullable = false)
    private String channelUrl;

    @Column(name = "channel_id")
    private Long channelId;

    @Column(name = "description")
    private String description;

    @Column(name = "subscribers")
    private Long subscribers;

    @Column(name = "views")
    private String views;

    @Column(name = "format_prices")
    @Convert(converter = HashMapConverter.class)
    private Map<String, String> formatPrices;

    @Column(name = "discounts_enabled")
    private Boolean discountsEnabled;

    @Column(name = "selected_discount")
    private String selectedDiscount;

    @Column(name = "geo_enabled")
    private Boolean geoEnabled;

    @Column(name = "selected_region")
    private String selectedRegion;

    @Column(name = "is_author_channel")
    private Boolean isAuthorChannel;

    @Column(name = "social_links")
    @Convert(converter = ListConverter.class)
    private List<String> socialLinks;

    @Column(name = "subscriber_source")
    private String subscriberSource;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}