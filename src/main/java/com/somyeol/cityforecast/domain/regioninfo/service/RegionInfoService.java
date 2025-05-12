// src/main/java/com/somyeol/cityforecast/domain/regioninfo/service/RegionInfoService.java
package com.somyeol.cityforecast.domain.regioninfo.service;

import com.somyeol.cityforecast.domain.region.entity.Region;
import com.somyeol.cityforecast.domain.region.repository.RegionRepository;
import com.somyeol.cityforecast.domain.regioninfo.dto.RegionInfoDto;
import com.somyeol.cityforecast.domain.regioninfo.entity.RegionInfo;
import com.somyeol.cityforecast.domain.regioninfo.repository.RegionInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RegionInfoService {

    private final RegionInfoRepository regionInfoRepository;
    private final RegionRepository regionRepository;

    @Transactional(readOnly = true)
    public RegionInfoDto getRegionInfoByRegionId(Long regionId) {
        return regionInfoRepository.findByRegionId(regionId)
                .map(RegionInfoDto::fromEntity)
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public RegionInfoDto getRegionInfoById(Long id) {
        RegionInfo regionInfo = regionInfoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("RegionInfo not found with id: " + id));
        return RegionInfoDto.fromEntity(regionInfo);
    }
}