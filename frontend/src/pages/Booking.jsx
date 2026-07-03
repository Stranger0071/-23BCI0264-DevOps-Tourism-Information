import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import './Booking.css';

export default function Booking() {
  const { data, loading, error, refetch } = useApi(() => api.getBooking(), []);

  if (loading) return <LoadingSpinner label="Loading booking options…" />;

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  const { options, partners } = data;

  return (
    <div className="container">
      <header className="page-header">
        <p className="section-label">Reservations</p>
        <h1>Book a trip</h1>
        <p>
          Activities and packages from registered operators. External links open partner
          booking platforms — the department does not process payments directly.
        </p>
      </header>

      <div className="booking-disclaimer">
        <strong>Before you pay:</strong> Verify operator registration with the Tourist Reception
        Centre (TRC), Residency Road, Srinagar. Report unregistered touts to Tourist Police: 0194-245-2000.
      </div>

      <div className="booking-grid">
        {options.map((option) => (
          <article key={option.id} className="booking-card">
            {option.badge && <span className="booking-badge">{option.badge}</span>}
            <h3>{option.title}</h3>
            <p className="booking-provider">{option.provider}</p>
            <div className="booking-meta">
              <span>{option.price}</span>
              <span className="meta-sep">·</span>
              <span>{option.duration}</span>
            </div>
            <p className="booking-desc">{option.description}</p>
            <a
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-saffron booking-btn"
            >
              Book now ↗
            </a>
          </article>
        ))}
      </div>

      <section className="partners-section">
        <h2>Booking partners</h2>
        <p>These platforms list verified properties and packages for J&K. Compare prices across sites before confirming.</p>
        <div className="partners-row">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-link"
            >
              {p.name} ↗
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
