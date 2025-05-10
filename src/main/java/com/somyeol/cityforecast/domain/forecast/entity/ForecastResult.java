package com.somyeol.cityforecast.domain.forecast.entity;

import com.somyeol.cityforecast.domain.region.entity.Region;
import com.somyeol.cityforecast.global.base.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "forecast_result")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ForecastResult extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @Column(name = "forecast_year", nullable = false)
    private Integer forecastYear;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false)
    private RiskLevel riskLevel;

    @Builder
    public ForecastResult(Region region, Integer forecastYear, RiskLevel riskLevel) {
        this.region = region;
        this.forecastYear = forecastYear;
        this.riskLevel = riskLevel;
    }

    public void updateForecast(Integer forecastYear, RiskLevel riskLevel) {
        this.forecastYear = forecastYear;
        this.riskLevel = riskLevel;
    }
}