package com.somyeol.cityforecast.domain.regioninfo.repository;

import com.somyeol.cityforecast.domain.region.entity.Region;
import com.somyeol.cityforecast.domain.regioninfo.entity.RegionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegionInfoRepository extends JpaRepository<RegionInfo, Long> {

    Optional<RegionInfo> findByRegion(Region region);

    Optional<RegionInfo> findByRegionId(Long regionId);
}