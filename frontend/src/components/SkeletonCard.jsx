import './SkeletonCard.css';

export default function SkeletonCard({ variant = 'default' }) {
  return (
    <div className={`skeleton-card skeleton-${variant}`} aria-hidden="true">
      <div className="skeleton-image shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-line shimmer w-40" />
        <div className="skeleton-line shimmer w-70" />
        <div className="skeleton-line shimmer w-100" />
        <div className="skeleton-line shimmer w-90" />
      </div>
    </div>
  );
}
