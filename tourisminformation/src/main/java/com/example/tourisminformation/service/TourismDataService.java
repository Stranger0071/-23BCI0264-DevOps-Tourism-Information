package com.example.tourisminformation.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.example.tourisminformation.model.Attraction;
import com.example.tourisminformation.model.BookingData;
import com.example.tourisminformation.model.Distance;
import com.example.tourisminformation.model.Guide;
import com.example.tourisminformation.model.Hotel;
import com.example.tourisminformation.model.MapLocation;
import com.example.tourisminformation.model.MapsData;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Service
public class TourismDataService {

	private final ObjectMapper objectMapper;
	private List<Attraction> attractions;
	private List<Hotel> hotels;
	private List<Guide> guides;
	private MapsData mapsData;
	private BookingData bookingData;

	public TourismDataService(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	@PostConstruct
	void loadData() throws IOException {
		attractions = loadList("data/attractions.json", new TypeReference<List<Attraction>>() {});
		hotels = loadList("data/hotels.json", new TypeReference<List<Hotel>>() {});
		guides = loadList("data/guides.json", new TypeReference<List<Guide>>() {});
		mapsData = loadObject("data/maps.json", MapsData.class);
		bookingData = loadObject("data/booking.json", BookingData.class);
	}

	private <T> T loadObject(String path, Class<T> type) throws IOException {
		try (InputStream in = new ClassPathResource(path).getInputStream()) {
			return objectMapper.readValue(in, type);
		}
	}

	private <T> T loadList(String path, TypeReference<T> typeRef) throws IOException {
		try (InputStream in = new ClassPathResource(path).getInputStream()) {
			return objectMapper.readValue(in, typeRef);
		}
	}

	public List<Attraction> getAllAttractions() {
		return attractions;
	}

	public List<Attraction> getAttractionsByCategory(String category) {
		if (category == null || category.isBlank() || "All".equalsIgnoreCase(category)) {
			return attractions;
		}
		return attractions.stream()
				.filter(a -> a.category().equalsIgnoreCase(category))
				.toList();
	}

	public Optional<Attraction> getAttractionById(String id) {
		return attractions.stream().filter(a -> a.id().equals(id)).findFirst();
	}

	public List<String> getAttractionCategories() {
		return List.of(
				"All",
				"Lake & Heritage",
				"Adventure & Ski",
				"Valley & Trekking",
				"Glacier & Pass",
				"Heritage & Gardens",
				"Wildlife");
	}

	public List<Hotel> getAllHotels() {
		return hotels;
	}

	public List<Hotel> getHotelsByType(String type) {
		if (type == null || type.isBlank() || "All".equalsIgnoreCase(type)) {
			return hotels;
		}
		return hotels.stream().filter(h -> h.type().equalsIgnoreCase(type)).toList();
	}

	public List<String> getHotelTypes() {
		return List.of("All", "Houseboat", "Hotel", "Resort", "Cottage", "Camp / Tent", "Heritage Hotel");
	}

	public List<Guide> getAllGuides() {
		return guides;
	}

	public Optional<Guide> getGuideById(String id) {
		return guides.stream().filter(g -> g.id().equals(id)).findFirst();
	}

	public List<MapLocation> getMapLocations() {
		return mapsData.locations();
	}

	public List<Distance> getDistances() {
		return mapsData.distances();
	}

	public BookingData getBookingData() {
		return bookingData;
	}
}
