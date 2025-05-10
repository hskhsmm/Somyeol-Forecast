package com.somyeol.cityforecast.domain.info.entity;

import com.somyeol.cityforecast.domain.region.entity.Region;
import com.somyeol.cityforecast.global.base.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "region_info")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RegionInfo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @Column(name = "special_product", columnDefinition = "TEXT")
    private String specialProduct;

    @Column(columnDefinition = "TEXT")
    private String festival;

    @Column(columnDefinition = "TEXT")
    private String attraction;

    @Builder
    public RegionInfo(Region region, String specialProduct, String festival, String attraction) {
        this.region = region;
        this.specialProduct = specialProduct;
        this.festival = festival;
        this.attraction = attraction;
    }

    public void updateInfo(String specialProduct, String festival, String attraction) {
        this.specialProduct = specialProduct;
        this.festival = festival;
        this.attraction = attraction;
    }
}