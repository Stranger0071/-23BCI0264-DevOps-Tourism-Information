const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

function decodeMojibake(value) {
  if (typeof value !== 'string' || !/[\u00c2\u00c3\u00e2\u00f0]/.test(value)) {
    return value;
  }

  try {
    const bytes = Uint8Array.from([...value].map((char) => char.charCodeAt(0) & 0xff));
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return decoded.includes('\uFFFD') ? value : decoded;
  } catch {
    return value;
  }
}

function normalizeData(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeData);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, normalizeData(entry)])
    );
  }

  return decodeMojibake(value);
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(message || `Request failed (${response.status})`);
  }

  return normalizeData(await response.json());
}

export const api = {
  getHealth: () => request('/health'),

  getAttractions: (category) => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/attractions${query}`);
  },

  getAttraction: (id) => request(`/attractions/${id}`),

  getAttractionCategories: () => request('/attractions/categories'),

  getHotels: (type) => {
    const query = type && type !== 'All' ? `?type=${encodeURIComponent(type)}` : '';
    return request(`/hotels${query}`);
  },

  getHotelTypes: () => request('/hotels/types'),

  getGuides: () => request('/guides'),

  getGuide: (id) => request(`/guides/${id}`),

  getMapLocations: () => request('/maps/locations'),

  getDistances: () => request('/maps/distances'),

  getBooking: () => request('/booking'),
};
