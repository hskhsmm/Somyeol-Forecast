package com.somyeol.cityforecast.domain.region.repository;

import com.somyeol.cityforecast.domain.region.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {

    List<Region> findByProvince(String province);

    Region findByNameAndProvince(String name, String province);

    @Query("SELECT r FROM Region r WHERE r.currentPopulation < 50000 ORDER BY r.predictedExtinctYear ASC")
    List<Region> findAllAtRiskRegions();

    // 감소율 기준 정렬 수정 (ASC로 변경 - 음수 값이므로 작을수록 감소율이 더 큼)
    @Query("SELECT r FROM Region r ORDER BY r.avgDeclineRate ASC LIMIT 10")
    List<Region> findTop10ByDeclineRate();

    // 또는 절대값 기준으로 정렬할 경우 다음과 같이 사용
    // @Query("SELECT r FROM Region r ORDER BY ABS(r.avgDeclineRate) DESC LIMIT 10")
    // List<Region> findTop10ByDeclineRate();
}