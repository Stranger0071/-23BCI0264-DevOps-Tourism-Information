import './ErrorMessage.css';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <div className="error-icon" aria-hidden="true">!</div>
      <div className="error-body">
        <strong>Could not load data</strong>
        <p>{message || 'The server may be unavailable. Check that the backend is running on port 8080.'}</p>
        {onRetry && (
          <button type="button" className="btn btn-outline error-retry" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
