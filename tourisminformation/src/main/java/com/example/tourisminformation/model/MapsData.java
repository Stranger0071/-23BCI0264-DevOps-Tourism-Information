package com.example.tourisminformation.model;

import java.util.List;

public record MapsData(List<MapLocation> locations, List<Distance> distances) {}
