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
        DANGER,    // 높은 소멸 위험 (인구 감소율 높음)
        WARNING,   // 잠재적 소멸 위험 (인구 감소율 중간)
        CAUTION,   // 주의 단계 (인구 감소율 낮음)
        SAFE       // 안전 (인구 증가 또는 유지)
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level")
    private RiskLevel riskLevel;

    // 생성자 및 메서드
    public void updatePredictedExtinctYear(Integer year) {
        this.predictedExtinctYear = year;
    }

    // 인구 감소율에 따른 위험도 계산 메서드
    public void calculateRiskLevel() {
        // 인구 증가 또는 유지인 경우 (avgDeclineRate가 0 이하)
        if (this.avgDeclineRate <= 0) {
            this.riskLevel = RiskLevel.SAFE;
        }
        // 인구 감소율에 따른 위험도 분류
        else if (this.avgDeclineRate > 3.0) {
            this.riskLevel = RiskLevel.DANGER;
        } else if (this.avgDeclineRate > 1.5) {
            this.riskLevel = RiskLevel.WARNING;
        } else {
            this.riskLevel = RiskLevel.CAUTION;
        }
    }
}