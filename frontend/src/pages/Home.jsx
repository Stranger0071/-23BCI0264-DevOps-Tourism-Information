import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import AttractionCard from '../components/AttractionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SkeletonCard from '../components/SkeletonCard';
import SafeImage from '../components/SafeImage';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';

const quickLinks = [
  {
    to: '/hotels',
    icon: 'ST',
    title: 'Hotels & Houseboats',
    text: 'From Dal Lake houseboats to Gulmarg ski lodges, with price ranges and booking links.',
  },
  {
    to: '/guides',
    icon: 'TG',
    title: 'Travel Guides',
    text: 'Permits, best seasons, packing lists, and local etiquette written for actual travellers.',
  },
  {
    to: '/maps',
    icon: 'MR',
    title: 'Maps & Distances',
    text: 'Driving times between Srinagar, Gulmarg, Pahalgam, and Sonamarg. Offline-friendly links.',
  },
  {
    to: '/booking',
    icon: 'BK',
    title: 'Book a Trip',
    text: 'Shikara rides, gondola tickets, guided treks, and registered tour operators.',
    highlight: true,
  },
];

export default function Home() {
  const { data: attractions, loading, error, refetch } = useApi(() => api.getAttractions(), []);

  const featured = useMemo(() => (attractions ? attractions.slice(0, 3) : []), [attractions]);
  const heroImage = attractions?.[0]?.image;

  return (
    <>
      <section className="hero">
        {heroImage && (
          <SafeImage src={heroImage} alt="" className="hero-bg" aria-hidden="true" />
        )}
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="hero-kashmiri">Khosh Ras</p>
          <h1>
            The valley waits.<br />
            <em>Take your time getting here.</em>
          </h1>
          <p className="hero-sub">
            Official tourism portal for Jammu & Kashmir - practical guides, verified stays,
            and maps for Srinagar, Gulmarg, Pahalgam, and beyond.
          </p>
          <div className="hero-actions">
            <Link to="/attractions" className="btn btn-primary">Explore places</Link>
            <Link to="/guides" className="btn btn-outline hero-outline">Plan your visit</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="container stats-inner">
            <div className="stat-item">
              <span className="stat-num">{attractions?.length ?? '-'}</span>
              <span className="stat-label">Major circuits</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">365</span>
              <span className="stat-label">Days of beauty</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">2,650m</span>
              <span className="stat-label">Gulmarg altitude</span>
            </div>
            <div className="stat-item stat-helpline">
              <span className="stat-label">Need help?</span>
              <a href="tel:18001807777">1800-180-7777</a>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <p className="section-label">Where to go</p>
              <h2>Popular destinations</h2>
            </div>
            <Link to="/attractions" className="view-all-link">View all places</Link>
          </div>

          {loading && (
            <div className="home-attractions-grid">
              <SkeletonCard variant="featured" />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {error && <ErrorMessage message={error} onRetry={refetch} />}

          {!loading && !error && featured.length > 0 && (
            <div className="home-attractions-grid">
              <AttractionCard attraction={featured[0]} featured />
              {featured.slice(1).map((a) => (
                <AttractionCard key={a.id} attraction={a} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home-section home-quick-links">
        <div className="container">
          <p className="section-label">Start here</p>
          <h2>Everything you need for a Kashmir trip</h2>
          <div className="quick-links-grid">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`quick-link-card ${link.highlight ? 'ql-highlight' : ''}`}
              >
                <span className="ql-icon" aria-hidden="true">{link.icon}</span>
                <h3>{link.title}</h3>
                <p>{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-editorial">
        <div className="container editorial-layout">
          <div className="editorial-image">
            <SafeImage
              src="https://images.unsplash.com/photo-1708070642298-166c0af7a12d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Shikara on Dal Lake at sunrise"
              loading="lazy"
            />
            <span className="editorial-caption">Dal Lake, early morning - photo: Unsplash</span>
          </div>
          <div className="editorial-text">
            <p className="section-label">From the department</p>
            <h2>A note before you travel</h2>
            <p>
              Kashmir receives visitors year-round, but conditions change quickly, especially
              on mountain roads. We update this portal when routes close, when the gondola
              suspends service, or when permit rules shift.
            </p>
            <p>
              If you are visiting during peak summer (June-August) or ski season
              (December-February), book accommodation at least two weeks ahead. Houseboats
              on Dal Lake fill up fast; Gulmarg hotels often require minimum stays during
              Christmas week.
            </p>
            <Link to="/guides" className="btn btn-outline">Read full travel guides</Link>
          </div>
        </div>
      </section>

      <section className="home-section home-seasons">
        <div className="container">
          <p className="section-label">When to visit</p>
          <h2>Pick your season</h2>
          <div className="seasons-row">
            <div className="season-card">
              <h3>Spring</h3>
              <span className="season-months">Mar - May</span>
              <p>Tulip Garden blooms, mild weather, fewer crowds than summer.</p>
            </div>
            <div className="season-card season-active">
              <h3>Summer</h3>
              <span className="season-months">Jun - Aug</span>
              <p>Peak season. All routes open. Book early.</p>
            </div>
            <div className="season-card">
              <h3>Autumn</h3>
              <span className="season-months">Sep - Nov</span>
              <p>Chinar gold. Harvest in orchards. Photographer's window.</p>
            </div>
            <div className="season-card">
              <h3>Winter</h3>
              <span className="season-months">Dec - Feb</span>
              <p>Gulmarg skiing. Snow in Srinagar. Carry thermals.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
