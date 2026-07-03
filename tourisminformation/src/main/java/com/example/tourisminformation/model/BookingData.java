package com.example.tourisminformation.model;

import java.util.List;

public record BookingData(List<BookingOption> options, List<Partner> partners) {}
