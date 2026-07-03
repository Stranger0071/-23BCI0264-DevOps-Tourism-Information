import { useState, useMemo } from 'react';
import AttractionCard from '../components/AttractionCard';
import ErrorMessage from '../components/ErrorMessage';
import SkeletonCard from '../components/SkeletonCard';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';

export default function Attractions() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const { data: categories } = useApi(() => api.getAttractionCategories(), []);
  const { data: attractions, loading, error, refetch } = useApi(
    () => api.getAttractions(activeCategory),
    [activeCategory]
  );

  const filtered = useMemo(() => {
    if (!attractions) return [];
    if (!search.trim()) return attractions;
    const q = search.toLowerCase();
    return attractions.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [attractions, search]);

  return (
    <div className="container">
      <header className="page-header">
        <p className="section-label">Destinations</p>
        <h1>Places to visit in Kashmir</h1>
        <p>
          Six major circuits covering lakes, meadows, gardens, and wildlife.
          Entry fees and timings are approximate — confirm locally before visiting.
        </p>
      </header>

      <div className="page-toolbar">
        <div className="search-box">
          <label htmlFor="attraction-search" className="sr-only">Search places</label>
          <input
            id="attraction-search"
            type="search"
            placeholder="Search by name, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {categories && (
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="cards-grid">
          {[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
        </div>
      )}

      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          {filtered.length > 0 ? (
            <div className="cards-grid">
              {filtered.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
          ) : (
            <p className="empty-state">No places match your search. Try a different keyword or category.</p>
          )}
        </>
      )}
    </div>
  );
}
