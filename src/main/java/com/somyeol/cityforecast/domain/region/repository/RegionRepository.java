package com.somyeol.cityforecast.domain.region.repository;

import com.somyeol.cityforecast.domain.region.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {

    Optional<Region> findByName(String name);

    List<Region> findByProvince(String province);

    @Query("SELECT r FROM Region r WHERE r.currentPopulation < :populationThreshold")
    List<Region> findByPopulationLessThan(int populationThreshold);

    @Query("SELECT r FROM Region r WHERE r.currentPopulation < :populationThreshold ORDER BY r.currentPopulation ASC")
    List<Region> findSmallestRegions(int populationThreshold);

    @Query("SELECT r FROM Region r WHERE r.name LIKE %:keyword% OR r.province LIKE %:keyword%")
    List<Region> searchByKeyword(String keyword);
}