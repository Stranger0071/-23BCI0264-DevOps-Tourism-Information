package com.example.tourisminformation.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

	@GetMapping({"", "/"})
	public Map<String, Object> index() {
		return Map.of(
				"service", "tourisminformation",
				"status", "UP",
				"endpoints", Map.of(
						"health", "/api/health",
						"attractions", "/api/attractions",
						"hotels", "/api/hotels",
						"guides", "/api/guides",
						"maps", "/api/maps",
						"booking", "/api/booking"));
	}

	@GetMapping("/health")
	public Map<String, String> health() {
		return Map.of("status", "UP", "service", "tourisminformation");
	}
}
