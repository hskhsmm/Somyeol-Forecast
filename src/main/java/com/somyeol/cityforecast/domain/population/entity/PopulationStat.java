package com.somyeol.cityforecast.domain.population.entity;

import com.somyeol.cityforecast.domain.region.entity.Region;
import com.somyeol.cityforecast.global.base.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "population_stat",
        uniqueConstraints = @UniqueConstraint(columnNames = {"region_id", "year"}))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PopulationStat extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer population;

    @Builder
    public PopulationStat(Region region, Integer year, Integer population) {
        this.region = region;
        this.year = year;
        this.population = population;
    }

    public void updatePopulation(Integer population) {
        this.population = population;
    }
}