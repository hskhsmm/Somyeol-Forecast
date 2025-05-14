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
    private String specialtyImageUrl;  // 추가된 필드
    private String festival;
    private String attraction;
    private String imageUrl;
    private String websiteUrl;

    public static RegionInfoDto fromEntity(RegionInfo regionInfo) {
        return RegionInfoDto.builder()
                .id(regionInfo.getId())
                .regionId(regionInfo.getRegion().getId())
                .specialty(regionInfo.getSpecialty())
                .specialtyImageUrl(regionInfo.getSpecialtyImageUrl())  // 추가된 필드
                .festival(regionInfo.getFestival())
                .attraction(regionInfo.getAttraction())
                .imageUrl(regionInfo.getImageUrl())
                .websiteUrl(regionInfo.getWebsiteUrl())
                .build();
    }
}