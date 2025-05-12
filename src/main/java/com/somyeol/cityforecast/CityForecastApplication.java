package com.somyeol.cityforecast;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CityForecastApplication {

	public static void main(String[] args) {
		SpringApplication.run(CityForecastApplication.class, args);
	}

}
