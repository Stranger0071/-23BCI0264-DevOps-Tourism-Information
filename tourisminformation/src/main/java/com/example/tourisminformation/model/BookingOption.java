package com.example.tourisminformation.model;

public record BookingOption(
		String id,
		String title,
		String provider,
		String price,
		String duration,
		String description,
		String link,
		String badge) {}
