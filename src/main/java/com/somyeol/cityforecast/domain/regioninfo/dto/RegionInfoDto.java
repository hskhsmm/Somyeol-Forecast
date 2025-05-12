// src/main/java/com/somyeol/cityforecast/domain/regioninfo/dto/RegionInfoDto.java
package com.somyeol.cityforecast.domain.regioninfo.dto;

import com.somyeol.cityforecast.domain.regioninfo.entity.RegionInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegionInfoDto {
    private Long id;
    private Long regionId;
    private String specialty;
    private String festival;
    private String attraction;
    private String imageUrl;

    public static RegionInfoDto fromEntity(RegionInfo regionInfo) {
        return RegionInfoDto.builder()
                .id(regionInfo.getId())
                .regionId(regionInfo.getRegion().getId())
                .specialty(regionInfo.getSpecialty())
                .festival(regionInfo.getFestival())
                .attraction(regionInfo.getAttraction())
                .imageUrl(regionInfo.getImageUrl())
                .build();
    }
}