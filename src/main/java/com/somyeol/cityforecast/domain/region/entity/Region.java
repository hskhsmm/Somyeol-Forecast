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

    @Column(name = "population_50yr_ago", nullable = false)
    private Integer population50yrAgo;

    @Column(name = "avg_decline_rate", nullable = false)
    private Float avgDeclineRate;

    @Column(name = "predicted_extinct_year", nullable = false)
    private Integer predictedExtinctYear;

    public enum RiskLevel {
        DANGER,    // 2100년 미만에 소멸 예상
        WARNING,   // 2100-2199년에 소멸 예상
        CAUTION,   // 2200-2299년에 소멸 예상
        SAFE       // 2300년 이후에 소멸 예상
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level")
    private RiskLevel riskLevel;

    // 생성자 및 메서드
    public void updatePredictedExtinctYear(Integer year) {
        this.predictedExtinctYear = year;
    }

    // 소멸 예상 연도에 따른 위험도 계산 메서드
    public void calculateRiskLevel() {
        if (this.predictedExtinctYear < 2100) {
            this.riskLevel = RiskLevel.DANGER;
        } else if (this.predictedExtinctYear < 2200) {
            this.riskLevel = RiskLevel.WARNING;
        } else if (this.predictedExtinctYear < 2300) {
            this.riskLevel = RiskLevel.CAUTION;
        } else {
            this.riskLevel = RiskLevel.SAFE;
        }
    }
}