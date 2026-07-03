package com.example.tourisminformation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tourisminformation.model.BookingData;
import com.example.tourisminformation.service.TourismDataService;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

	private final TourismDataService dataService;

	public BookingController(TourismDataService dataService) {
		this.dataService = dataService;
	}

	@GetMapping
	public BookingData getBooking() {
		return dataService.getBookingData();
	}
}
