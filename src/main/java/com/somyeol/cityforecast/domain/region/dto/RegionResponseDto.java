// src/main/java/com/somyeol/cityforecast/domain/region/dto/RegionResponseDto.java
package com.somyeol.cityforecast.domain.region.dto;

import com.somyeol.cityforecast.domain.region.entity.Region;
import com.somyeol.cityforecast.domain.regioninfo.dto.RegionInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegionResponseDto {
    private Long id;
    private String name;
    private String province;
    private Double latitude;
    private Double longitude;
    private Integer currentPopulation;
    private Integer population50yrAgo;
    private Float avgDeclineRate;
    private Integer predictedExtinctYear;
    private Region.RiskLevel riskLevel;
    private RegionInfoDto regionInfo;

    public static RegionResponseDto fromEntity(Region region) {
        return RegionResponseDto.builder()
                .id(region.getId())
                .name(region.getName())
                .province(region.getProvince())
                .latitude(region.getLatitude())
                .longitude(region.getLongitude())
                .currentPopulation(region.getCurrentPopulation())
                .population50yrAgo(region.getPopulation50yrAgo())
                .avgDeclineRate(region.getAvgDeclineRate())
                .predictedExtinctYear(region.getPredictedExtinctYear())
                .riskLevel(region.getRiskLevel())
                .build();
    }
}