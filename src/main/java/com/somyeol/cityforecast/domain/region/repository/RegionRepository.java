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

    @Query("SELECT r FROM Region r ORDER BY r.avgDeclineRate DESC LIMIT 10")
    List<Region> findTop10ByDeclineRate();
}