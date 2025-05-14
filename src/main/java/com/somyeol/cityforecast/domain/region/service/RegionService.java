package com.somyeol.cityforecast.domain.region.service;

import com.somyeol.cityforecast.domain.region.dto.RegionResponseDto;
import com.somyeol.cityforecast.domain.region.entity.Region;
import com.somyeol.cityforecast.domain.region.repository.RegionRepository;
import com.somyeol.cityforecast.domain.regioninfo.dto.RegionInfoDto;
import com.somyeol.cityforecast.domain.regioninfo.service.RegionInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegionService {

    private final RegionRepository regionRepository;
    private final RegionInfoService regionInfoService;

    @Transactional(readOnly = true)
    public List<RegionResponseDto> getAllRegions() {
        List<Region> regions = regionRepository.findAll();
        return regions.stream()
                .map(region -> {
                    RegionResponseDto dto = RegionResponseDto.fromEntity(region);
                    RegionInfoDto infoDto = regionInfoService.getRegionInfoByRegionId(region.getId());
                    if (infoDto != null) {
                        return RegionResponseDto.builder()
                                .id(dto.getId())
                                .name(dto.getName())
                                .province(dto.getProvince())
                                .latitude(dto.getLatitude())
                                .longitude(dto.getLongitude())
                                .currentPopulation(dto.getCurrentPopulation())
                                .population50yrAgo(dto.getPopulation50yrAgo())
                                .avgDeclineRate(dto.getAvgDeclineRate())
                                .predictedExtinctYear(dto.getPredictedExtinctYear())
                                .riskLevel(dto.getRiskLevel())
                                .regionInfo(infoDto)
                                .build();
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RegionResponseDto getRegionById(Long id) {
        Region region = regionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Region not found with id: " + id));

        RegionResponseDto dto = RegionResponseDto.fromEntity(region);
        RegionInfoDto infoDto = regionInfoService.getRegionInfoByRegionId(id);

        if (infoDto != null) {
            return RegionResponseDto.builder()
                    .id(dto.getId())
                    .name(dto.getName())
                    .province(dto.getProvince())
                    .latitude(dto.getLatitude())
                    .longitude(dto.getLongitude())
                    .currentPopulation(dto.getCurrentPopulation())
                    .population50yrAgo(dto.getPopulation50yrAgo())
                    .avgDeclineRate(dto.getAvgDeclineRate())
                    .predictedExtinctYear(dto.getPredictedExtinctYear())
                    .riskLevel(dto.getRiskLevel())
                    .regionInfo(infoDto)
                    .build();
        }

        return dto;
    }

    @Transactional(readOnly = true)
    public List<RegionResponseDto> getAtRiskRegions() {
        List<Region> regions = regionRepository.findAllAtRiskRegions();
        return regions.stream()
                .map(region -> {
                    RegionResponseDto dto = RegionResponseDto.fromEntity(region);
                    RegionInfoDto infoDto = regionInfoService.getRegionInfoByRegionId(region.getId());
                    if (infoDto != null) {
                        return RegionResponseDto.builder()
                                .id(dto.getId())
                                .name(dto.getName())
                                .province(dto.getProvince())
                                .latitude(dto.getLatitude())
                                .longitude(dto.getLongitude())
                                .currentPopulation(dto.getCurrentPopulation())
                                .population50yrAgo(dto.getPopulation50yrAgo())
                                .avgDeclineRate(dto.getAvgDeclineRate())
                                .predictedExtinctYear(dto.getPredictedExtinctYear())
                                .riskLevel(dto.getRiskLevel())
                                .regionInfo(infoDto)
                                .build();
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<RegionResponseDto> getTop10ByDeclineRate() {
        List<Region> regions = regionRepository.findTop10ByDeclineRate();
        return regions.stream()
                .map(region -> {
                    RegionResponseDto dto = RegionResponseDto.fromEntity(region);
                    RegionInfoDto infoDto = regionInfoService.getRegionInfoByRegionId(region.getId());
                    if (infoDto != null) {
                        return RegionResponseDto.builder()
                                .id(dto.getId())
                                .name(dto.getName())
                                .province(dto.getProvince())
                                .latitude(dto.getLatitude())
                                .longitude(dto.getLongitude())
                                .currentPopulation(dto.getCurrentPopulation())
                                .population50yrAgo(dto.getPopulation50yrAgo())
                                .avgDeclineRate(dto.getAvgDeclineRate())
                                .predictedExtinctYear(dto.getPredictedExtinctYear())
                                .riskLevel(dto.getRiskLevel())
                                .regionInfo(infoDto)
                                .build();
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }
}