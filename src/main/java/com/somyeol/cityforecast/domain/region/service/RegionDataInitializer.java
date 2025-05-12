// src/main/java/com/somyeol/cityforecast/domain/region/service/RegionDataInitializer.java
package com.somyeol.cityforecast.domain.region.service;

import com.somyeol.cityforecast.domain.region.entity.Region;
import com.somyeol.cityforecast.domain.region.repository.RegionRepository;
import com.somyeol.cityforecast.domain.regioninfo.entity.RegionInfo;
import com.somyeol.cityforecast.domain.regioninfo.repository.RegionInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class RegionDataInitializer implements CommandLineRunner {

    private final RegionRepository regionRepository;
    private final RegionInfoRepository regionInfoRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // 기존 데이터가 없을 경우에만 초기화
        if (regionRepository.count() == 0) {
            log.info("Initializing Region data...");
            initRegionData();
        }

        if (regionInfoRepository.count() == 0) {
            log.info("Initializing RegionInfo data...");
            initRegionInfoData();
        }
    }

    private void initRegionData() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/population_data.csv");
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));

        // 헤더 건너뛰기
        String line = reader.readLine();

        // 데이터 읽기
        Map<Long, Region> regionMap = new HashMap<>();
        while ((line = reader.readLine()) != null) {
            String[] data = line.split(",");
            if (data.length >= 9) {
                Long id = Long.parseLong(data[0]);
                String name = data[1];
                String province = data[2];
                Double latitude = Double.parseDouble(data[3]);
                Double longitude = Double.parseDouble(data[4]);
                Integer currentPopulation = Integer.parseInt(data[5]);
                Integer population50yrAgo = Integer.parseInt(data[6]);  // 50년 전 인구 데이터
                Float avgDeclineRate = Float.parseFloat(data[7]);
                Integer predictedExtinctYear = Integer.parseInt(data[8]);

                Region region = Region.builder()
                        .id(id)
                        .name(name)
                        .province(province)
                        .latitude(latitude)
                        .longitude(longitude)
                        .currentPopulation(currentPopulation)
                        .population50yrAgo(population50yrAgo)  // 50년 전 인구 데이터 사용
                        .avgDeclineRate(avgDeclineRate)
                        .predictedExtinctYear(predictedExtinctYear)
                        .build();

                // RiskLevel 계산
                region.calculateRiskLevel();

                regionRepository.save(region);
                regionMap.put(id, region);

                log.info("Saved Region: {}", region.getName());
            }
        }
        reader.close();
    }

    private void initRegionInfoData() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/region_info.csv");
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));

        // 헤더 건너뛰기
        String line = reader.readLine();

        // 데이터 읽기
        while ((line = reader.readLine()) != null) {
            String[] data = line.split(",");
            if (data.length >= 6) {
                Long id = Long.parseLong(data[0]);
                Long regionId = Long.parseLong(data[1]);
                String specialty = data[2];
                String festival = data[3];
                String attraction = data[4];
                String imageUrl = data[5];

                Region region = regionRepository.findById(regionId)
                        .orElseThrow(() -> new IllegalStateException("Region not found with id: " + regionId));

                RegionInfo regionInfo = RegionInfo.builder()
                        .id(id)
                        .region(region)
                        .specialty(specialty)
                        .festival(festival)
                        .attraction(attraction)
                        .imageUrl(imageUrl)
                        .build();

                regionInfoRepository.save(regionInfo);

                log.info("Saved RegionInfo for region: {}", region.getName());
            }
        }
        reader.close();
    }
}