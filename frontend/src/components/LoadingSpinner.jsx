import './LoadingSpinner.css';

export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="loading-spinner-wrap" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      <span className="loading-label">{label}</span>
    </div>
  );
}
