package com.example.tourisminformation.model;

import java.util.List;

public record Hotel(
		String id,
		String name,
		String type,
		String location,
		double rating,
		String priceRange,
		String image,
		List<String> amenities,
		String bookingUrl,
		String note) {}
