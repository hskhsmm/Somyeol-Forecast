package com.somyeol.cityforecast.domain.regioninfo.entity;

import com.somyeol.cityforecast.domain.region.entity.Region;
import com.somyeol.cityforecast.global.base.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "region_info")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegionInfo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @Column(nullable = false)
    private String specialty;

    @Column(nullable = false)
    private String festival;

    @Column(nullable = false)
    private String attraction;

    @Column(name = "image_url")
    private String imageUrl;
}
