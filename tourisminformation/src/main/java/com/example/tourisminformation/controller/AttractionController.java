package com.example.tourisminformation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tourisminformation.model.Attraction;
import com.example.tourisminformation.model.BookingData;
import com.example.tourisminformation.model.Distance;
import com.example.tourisminformation.model.Guide;
import com.example.tourisminformation.model.Hotel;
import com.example.tourisminformation.model.MapLocation;
import com.example.tourisminformation.service.TourismDataService;

@RestController
@RequestMapping("/api/attractions")
public class AttractionController {

	private final TourismDataService dataService;

	public AttractionController(TourismDataService dataService) {
		this.dataService = dataService;
	}

	@GetMapping
	public List<Attraction> list(@RequestParam(required = false) String category) {
		return dataService.getAttractionsByCategory(category);
	}

	@GetMapping("/categories")
	public List<String> categories() {
		return dataService.getAttractionCategories();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Attraction> getById(@PathVariable String id) {
		return dataService.getAttractionById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
}
