package com.somyeol.cityforecast.domain.region.entity;

import com.somyeol.cityforecast.domain.forecast.entity.ForecastResult;
import com.somyeol.cityforecast.domain.info.entity.RegionInfo;
import com.somyeol.cityforecast.domain.population.entity.PopulationStat;
import com.somyeol.cityforecast.global.base.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "region")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Region extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 50, nullable = false)
    private String province;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @Column(nullable = false)
    private Integer currentPopulation;

    @OneToMany(mappedBy = "region", cascade = CascadeType.ALL)
    private List<PopulationStat> populationStats = new ArrayList<>();

    @OneToMany(mappedBy = "region", cascade = CascadeType.ALL)
    private List<ForecastResult> forecastResults = new ArrayList<>();

    @OneToOne(mappedBy = "region", cascade = CascadeType.ALL)
    private RegionInfo regionInfo;

    @Builder
    public Region(String name, String province, Double latitude, Double longitude, Integer currentPopulation) {
        this.name = name;
        this.province = province;
        this.latitude = latitude;
        this.longitude = longitude;
        this.currentPopulation = currentPopulation;
    }

    public void updateCurrentPopulation(Integer currentPopulation) {
        this.currentPopulation = currentPopulation;
    }

    public void updateCoordinates(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}