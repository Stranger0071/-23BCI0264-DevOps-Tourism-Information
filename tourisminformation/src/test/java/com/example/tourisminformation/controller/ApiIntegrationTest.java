package com.example.tourisminformation.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ApiIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void apiRootReturnsServiceMetadata() throws Exception {
		mockMvc.perform(get("/api"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.service").value("tourisminformation"))
				.andExpect(jsonPath("$.endpoints.health").value("/api/health"));

		mockMvc.perform(get("/api/"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.service").value("tourisminformation"));
	}

	@Test
	void healthEndpointReturnsUp() throws Exception {
		mockMvc.perform(get("/api/health"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value("UP"));
	}

	@Test
	void attractionsEndpointReturnsData() throws Exception {
		mockMvc.perform(get("/api/attractions"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].name").exists());
	}

	@Test
	void attractionByIdReturnsDalLake() throws Exception {
		mockMvc.perform(get("/api/attractions/dal-lake"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("Dal Lake"));
	}
}
