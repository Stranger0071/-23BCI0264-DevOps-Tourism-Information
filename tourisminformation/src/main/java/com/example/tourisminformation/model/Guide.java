package com.example.tourisminformation.model;

import java.util.List;

public record Guide(
		String id,
		String title,
		String icon,
		String summary,
		List<GuideSection> sections) {}
