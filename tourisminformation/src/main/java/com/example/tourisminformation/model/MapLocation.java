package com.example.tourisminformation.model;

public record MapLocation(
		String id,
		String name,
		String type,
		String description,
		double lat,
		double lng,
		int zoom) {}
