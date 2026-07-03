package com.example.tourisminformation.model;

import java.util.List;

public record Attraction(
		String id,
		String name,
		String location,
		String region,
		String category,
		String bestTime,
		String image,
		String excerpt,
		String description,
		List<String> highlights,
		String entryFee,
		Coords coords) {}
