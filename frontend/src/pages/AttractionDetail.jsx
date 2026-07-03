import { useParams, Navigate, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SafeImage from '../components/SafeImage';
import './AttractionDetail.css';

export default function AttractionDetail() {
  const { id } = useParams();
  const { data: place, loading, error, refetch } = useApi(
    () => api.getAttraction(id),
    [id]
  );

  if (loading) {
    return <LoadingSpinner label="Loading destination…" />;
  }

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error} onRetry={refetch} />
        <Link to="/attractions" className="back-link">← All places</Link>
      </div>
    );
  }

  if (!place) {
    return <Navigate to="/attractions" replace />;
  }

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${place.coords.lng - 0.05}%2C${place.coords.lat - 0.03}%2C${place.coords.lng + 0.05}%2C${place.coords.lat + 0.03}&layer=mapnik&marker=${place.coords.lat}%2C${place.coords.lng}`;

  return (
    <article className="detail-page">
      <div className="detail-hero">
        <SafeImage src={place.image} alt={place.name} />
        <div className="detail-hero-overlay">
          <div className="container">
            <span className="tag">{place.category}</span>
            <h1>{place.name}</h1>
            <p className="detail-location">{place.location} · {place.region}</p>
          </div>
        </div>
      </div>

      <div className="container detail-body">
        <div className="detail-main">
          <p className="detail-lead">{place.excerpt}</p>
          <p>{place.description}</p>

          <h2>Highlights</h2>
          <ul className="detail-highlights">
            {place.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="detail-map-section">
            <h2>Location</h2>
            <iframe
              title={`Map of ${place.name}`}
              src={mapUrl}
              className="detail-map"
              loading="lazy"
            />
          </div>
        </div>

        <aside className="detail-sidebar">
          <div className="info-box">
            <h3>Practical info</h3>
            <dl>
              <div>
                <dt>Best time</dt>
                <dd>{place.bestTime}</dd>
              </div>
              <div>
                <dt>Entry / fees</dt>
                <dd>{place.entryFee}</dd>
              </div>
              <div>
                <dt>Region</dt>
                <dd>{place.region}</dd>
              </div>
            </dl>
          </div>

          <div className="info-box info-box-action">
            <h3>Plan your visit</h3>
            <p>Find stays nearby or check our travel guides for permits and transport.</p>
            <Link to="/hotels" className="btn btn-primary sidebar-btn">Nearby hotels</Link>
            <Link to="/booking" className="btn btn-outline sidebar-btn">Book activities</Link>
          </div>

          <Link to="/attractions" className="back-link">← All places</Link>
        </aside>
      </div>
    </article>
  );
}
