package com.example.tourisminformation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tourisminformation.model.Guide;
import com.example.tourisminformation.service.TourismDataService;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

	private final TourismDataService dataService;

	public GuideController(TourismDataService dataService) {
		this.dataService = dataService;
	}

	@GetMapping
	public List<Guide> list() {
		return dataService.getAllGuides();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Guide> getById(@PathVariable String id) {
		return dataService.getGuideById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
}
