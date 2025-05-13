// src/main/java/com/somyeol/cityforecast/domain/region/controller/RegionController.java
package com.somyeol.cityforecast.domain.region.controller;

import com.somyeol.cityforecast.domain.region.dto.RegionResponseDto;
import com.somyeol.cityforecast.domain.region.service.RegionService;
import com.somyeol.cityforecast.domain.regioninfo.dto.RegionInfoDto;
import com.somyeol.cityforecast.domain.regioninfo.service.RegionInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/regions")
@RequiredArgsConstructor
public class RegionController {

    private final RegionService regionService;
    private final RegionInfoService regionInfoService;

    @GetMapping
    public ResponseEntity<List<RegionResponseDto>> getAllRegions() {
        return ResponseEntity.ok(regionService.getAllRegions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegionResponseDto> getRegionById(@PathVariable Long id) {
        return ResponseEntity.ok(regionService.getRegionById(id));
    }

    @GetMapping("/at-risk")
    public ResponseEntity<List<RegionResponseDto>> getAtRiskRegions() {
        return ResponseEntity.ok(regionService.getAtRiskRegions());
    }

    @GetMapping("/top10")
    public ResponseEntity<List<RegionResponseDto>> getTop10ByDeclineRate() {
        return ResponseEntity.ok(regionService.getTop10ByDeclineRate());
    }

    @GetMapping("/{regionId}/info")
    public ResponseEntity<RegionInfoDto> getRegionInfoByRegionId(@PathVariable Long regionId) {
        RegionInfoDto infoDto = regionInfoService.getRegionInfoByRegionId(regionId);
        if (infoDto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(infoDto);
    }
}