import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import './Maps.css';

export default function Maps() {
  const { data: locations, loading: locLoading, error: locError, refetch: refetchLoc } = useApi(
    () => api.getMapLocations(),
    []
  );
  const { data: distances, loading: distLoading, error: distError, refetch: refetchDist } = useApi(
    () => api.getDistances(),
    []
  );

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (locations?.length && !selected) {
      setSelected(locations[0]);
    }
  }, [locations, selected]);

  const loading = locLoading || distLoading;
  const error = locError || distError;
  const refetch = () => { refetchLoc(); refetchDist(); };

  if (loading) return <LoadingSpinner label="Loading maps…" />;

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  const mapUrl = selected
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selected.lng - 0.08}%2C${selected.lat - 0.06}%2C${selected.lng + 0.08}%2C${selected.lat + 0.06}&layer=mapnik&marker=${selected.lat}%2C${selected.lng}`
    : '';

  const externalUrl = selected
    ? `https://www.openstreetmap.org/?mlat=${selected.lat}&mlon=${selected.lng}#map=${selected.zoom}/${selected.lat}/${selected.lng}`
    : '#';

  return (
    <div className="container">
      <header className="page-header">
        <p className="section-label">Navigation</p>
        <h1>Maps & routes</h1>
        <p>
          Key locations and driving distances from Srinagar. Download offline maps
          before heading to Sonamarg or upper Pahalgam where signal drops.
        </p>
      </header>

      <div className="maps-layout">
        <div className="maps-sidebar">
          <h3>Select location</h3>
          <ul className="location-list">
            {locations.map((loc) => (
              <li key={loc.id}>
                <button
                  type="button"
                  className={`location-btn ${selected?.id === loc.id ? 'active' : ''}`}
                  onClick={() => setSelected(loc)}
                >
                  <span className="loc-name">{loc.name}</span>
                  <span className="loc-type">{loc.type}</span>
                  <span className="loc-desc">{loc.description}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="maps-main">
          {selected && (
            <>
              <iframe
                title={`Map of ${selected.name}`}
                src={mapUrl}
                className="main-map"
                loading="lazy"
              />
              <div className="map-actions">
                <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  Open full map ↗
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <section className="distances-section">
        <h2>Driving distances & times</h2>
        <p className="distances-note">
          Times assume normal traffic and open roads. Add 1–2 hours during peak season
          or after rainfall on the Srinagar–Jammu highway.
        </p>
        <div className="table-scroll">
          <table className="distances-table">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Distance</th>
                <th>Approx. time</th>
              </tr>
            </thead>
            <tbody>
              {distances.map((row) => (
                <tr key={`${row.from}-${row.to}`}>
                  <td>{row.from}</td>
                  <td>{row.to}</td>
                  <td>{row.distance}</td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
