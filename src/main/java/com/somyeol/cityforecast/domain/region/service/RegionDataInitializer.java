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
                Long csvId = Long.parseLong(data[0]);  // CSV의 ID를 저장합니다만 엔티티에는 사용하지 않습니다
                String name = data[1];
                String province = data[2];
                Double latitude = Double.parseDouble(data[3]);
                Double longitude = Double.parseDouble(data[4]);
                Integer currentPopulation = Integer.parseInt(data[5]);
                Integer population50yrAgo = Integer.parseInt(data[6]);
                Float avgDeclineRate = Float.parseFloat(data[7]);
                Integer predictedExtinctYear = Integer.parseInt(data[8]);

                // ID를 직접 설정하지 않고 자동 생성되도록 합니다
                Region region = Region.builder()
                        //.id(csvId)  // 이 줄을 제거합니다
                        .name(name)
                        .province(province)
                        .latitude(latitude)
                        .longitude(longitude)
                        .currentPopulation(currentPopulation)
                        .population50yrAgo(population50yrAgo)
                        .avgDeclineRate(avgDeclineRate)
                        .predictedExtinctYear(predictedExtinctYear)
                        .build();

                // RiskLevel 계산
                region.calculateRiskLevel();

                // 저장 후 생성된 ID로 매핑
                Region savedRegion = regionRepository.save(region);
                regionMap.put(csvId, savedRegion);  // CSV ID를 키로, 저장된 엔티티를 값으로 맵에 저장

                log.info("Saved Region: {}", region.getName());
            }
        }
        reader.close();
    }

    private void initRegionInfoData() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/region_info.tsv");
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));

        // 헤더 건너뛰기
        String line = reader.readLine();

        // 데이터 읽기
        while ((line = reader.readLine()) != null) {
            String[] data = line.split("\t");
            if (data.length >= 8) {
                Long csvInfoId = Long.parseLong(data[0].trim());  // 사용하지 않음
                Long csvRegionId = Long.parseLong(data[1].trim());  // CSV에서의 region_id
                String specialty = data[2];

                // GitHub URL을 접근 가능한 URL로 변환
                String specialtyImageUrl = convertToAccessibleUrl(data[3], true);
                String festival = data[4];
                String attraction = data[5];

                // GitHub URL을 접근 가능한 URL로 변환
                String imageUrl = convertToAccessibleUrl(data[6], false);
                String websiteUrl = data[7];

                // 이전에 저장한 Region 엔티티를 찾음
                Region region = regionRepository.findById(csvRegionId)
                        .orElseThrow(() -> new IllegalStateException("Region not found with id: " + csvRegionId));

                RegionInfo regionInfo = RegionInfo.builder()
                        //.id(csvInfoId)  // 이 줄을 제거합니다
                        .region(region)
                        .specialty(specialty)
                        .specialtyImageUrl(specialtyImageUrl)
                        .festival(festival)
                        .attraction(attraction)
                        .imageUrl(imageUrl)
                        .websiteUrl(websiteUrl)
                        .build();

                regionInfoRepository.save(regionInfo);

                log.info("Saved RegionInfo for region: {}", region.getName());
            }
        }
        reader.close();
    }

    // GitHub URL을 접근 가능한 URL로 변환하는 메서드
    private String convertToAccessibleUrl(String originalUrl, boolean isSpecialty) {
        if (originalUrl == null || originalUrl.isEmpty() || originalUrl.contains("github.com/user-attachments")) {
            // 기본 이미지 제공
            if (isSpecialty) {
                return "https://via.placeholder.com/200x150?text=특산물+이미지";
            } else {
                return "https://via.placeholder.com/300x200?text=지역+이미지";
            }
        }

        return originalUrl;
    }
}