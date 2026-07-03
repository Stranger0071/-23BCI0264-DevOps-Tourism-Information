package com.example.tourisminformation.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tourisminformation.model.Distance;
import com.example.tourisminformation.model.MapLocation;
import com.example.tourisminformation.service.TourismDataService;

@RestController
@RequestMapping("/api/maps")
public class MapController {

	private final TourismDataService dataService;

	public MapController(TourismDataService dataService) {
		this.dataService = dataService;
	}

	@GetMapping("/locations")
	public List<MapLocation> locations() {
		return dataService.getMapLocations();
	}

	@GetMapping("/distances")
	public List<Distance> distances() {
		return dataService.getDistances();
	}
}
