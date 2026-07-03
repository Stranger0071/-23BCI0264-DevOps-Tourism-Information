package com.example.tourisminformation.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tourisminformation.model.Hotel;
import com.example.tourisminformation.service.TourismDataService;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

	private final TourismDataService dataService;

	public HotelController(TourismDataService dataService) {
		this.dataService = dataService;
	}

	@GetMapping
	public List<Hotel> list(@RequestParam(required = false) String type) {
		return dataService.getHotelsByType(type);
	}

	@GetMapping("/types")
	public List<String> types() {
		return dataService.getHotelTypes();
	}
}
