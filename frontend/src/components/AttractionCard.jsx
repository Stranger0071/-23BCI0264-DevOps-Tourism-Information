import { Link } from 'react-router-dom';
import SafeImage from './SafeImage';
import './AttractionCard.css';

export default function AttractionCard({ attraction, featured = false }) {
  return (
    <article className={`attraction-card ${featured ? 'featured' : ''}`}>
      <Link to={`/attractions/${attraction.id}`} className="card-image-link">
        <SafeImage src={attraction.image} alt={attraction.name} loading="lazy" />
        <span className="card-category">{attraction.category}</span>
      </Link>
      <div className="card-body">
        <div className="card-meta">
          <span>{attraction.location}</span>
          <span className="meta-dot">/</span>
          <span>{attraction.bestTime}</span>
        </div>
        <h3>
          <Link to={`/attractions/${attraction.id}`}>{attraction.name}</Link>
        </h3>
        <p>{attraction.excerpt}</p>
        <Link to={`/attractions/${attraction.id}`} className="card-read-more">
          Read more
        </Link>
      </div>
    </article>
  );
}
