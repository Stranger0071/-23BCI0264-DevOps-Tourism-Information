import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import './Guides.css';

export default function Guides() {
  const { data: guides, loading, error, refetch } = useApi(() => api.getGuides(), []);
  const [activeGuide, setActiveGuide] = useState(null);

  useEffect(() => {
    if (guides?.length && !activeGuide) {
      setActiveGuide(guides[0].id);
    }
  }, [guides, activeGuide]);

  const current = guides?.find((g) => g.id === activeGuide);

  if (loading) return <LoadingSpinner label="Loading travel guides…" />;

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="container">
      <header className="page-header">
        <p className="section-label">Resources</p>
        <h1>Travel guides</h1>
        <p>
          Practical information compiled by the tourism department.
          Updated quarterly; last revision March 2026.
        </p>
      </header>

      <div className="guides-layout">
        <nav className="guides-nav" aria-label="Guide topics">
          {guides.map((guide) => (
            <button
              key={guide.id}
              type="button"
              className={`guide-nav-btn ${activeGuide === guide.id ? 'active' : ''}`}
              onClick={() => setActiveGuide(guide.id)}
            >
              <span className="guide-nav-icon">{guide.icon}</span>
              <span className="guide-nav-text">
                <strong>{guide.title}</strong>
                <small>{guide.summary}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="guide-content">
          {current && (
            <>
              <h2>{current.title}</h2>
              <p className="guide-summary">{current.summary}</p>
              {current.sections.map((section) => (
                <div key={section.heading} className="guide-section">
                  <h3>{section.heading}</h3>
                  <p>{section.content}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
