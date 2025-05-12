package com.somyeol.cityforecast.domain.population.repository;

import com.somyeol.cityforecast.domain.population.entity.PopulationStat;
import com.somyeol.cityforecast.domain.region.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PopulationRepository extends JpaRepository<PopulationStat, Long> {

    List<PopulationStat> findByRegionOrderByYearAsc(Region region);

    Optional<PopulationStat> findByRegionAndYear(Region region, Integer year);

    @Query("SELECT p FROM PopulationStat p WHERE p.region.id = :regionId ORDER BY p.year DESC")
    List<PopulationStat> findLatestPopulationStatsByRegionId(Long regionId);

    @Query("SELECT p FROM PopulationStat p WHERE p.region.id = :regionId AND p.year BETWEEN :startYear AND :endYear ORDER BY p.year ASC")
    List<PopulationStat> findPopulationStatsByRegionIdAndYearRange(Long regionId, Integer startYear, Integer endYear);

    @Query("SELECT p.year, SUM(p.population) FROM PopulationStat p GROUP BY p.year ORDER BY p.year ASC")
    List<Object[]> getTotalPopulationByYear();
}