// src/main/java/com/somyeol/cityforecast/domain/region/entity/Region.java
package com.somyeol.cityforecast.domain.region.entity;

import com.somyeol.cityforecast.global.base.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "region")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Region extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String province;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(name = "current_population", nullable = false)
    private Integer currentPopulation;

    @Column(name = "population_20yr_ago", nullable = false)
    private Integer population20yrAgo;

    @Column(name = "avg_decline_rate", nullable = false)
    private Float avgDeclineRate;

    @Column(name = "predicted_extinct_year", nullable = false)
    private Integer predictedExtinctYear;

    public enum RiskLevel {
        HIGH,   // 0 ~ 20,000명
        MEDIUM, // 20,001 ~ 35,000명
        LOW     // 35,001 ~ 49,999명
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level")
    private RiskLevel riskLevel;

    // 생성자 및 메서드
    public void updatePredictedExtinctYear(Integer year) {
        this.predictedExtinctYear = year;
    }

    // 인구 수에 따른 위험도 계산 메서드
    public void calculateRiskLevel() {
        if (this.currentPopulation <= 20000) {
            this.riskLevel = RiskLevel.HIGH;
        } else if (this.currentPopulation <= 35000) {
            this.riskLevel = RiskLevel.MEDIUM;
        } else {
            this.riskLevel = RiskLevel.LOW;
        }
    }
}