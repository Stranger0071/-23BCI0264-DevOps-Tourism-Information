import { Link } from 'react-router-dom';
import './Footer.css';

const quickLinks = [
  { to: '/attractions', label: 'Places to Visit' },
  { to: '/hotels', label: 'Hotels & Houseboats' },
  { to: '/guides', label: 'Travel Guides' },
  { to: '/maps', label: 'Maps' },
  { to: '/booking', label: 'Booking' },
];

const relatedLinks = [
  { href: 'https://jk.gov.in', label: 'J&K Government Portal' },
  { href: 'https://www.incredibleindia.org', label: 'Incredible India' },
  { href: 'https://sarathi.parivahan.gov.in', label: 'ePass / Permits' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-panel">
          <Link to="/" className="footer-brand">
            <span className="footer-mark" aria-hidden="true">
              <span />
            </span>
            <span>
              <span className="footer-dept">Department of Tourism</span>
              <span className="footer-title">Jammu & Kashmir</span>
            </span>
          </Link>

          <p className="footer-tagline">
            Khosh Ras - welcome to the valley of saints and sages.
          </p>

          <address className="footer-address">
            Tourist Reception Centre, Residency Road<br />
            Srinagar - 190001, Jammu & Kashmir
          </address>

          <div className="footer-help">
            <span className="footer-help-label">Need help planning?</span>
            <a href="tel:18001807777">1800-180-7777</a>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer quick links">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-links">
          <h4>Contact</h4>
          <ul>
            <li>
              <span>Toll-free</span>
              <a href="tel:18001807777">1800-180-7777</a>
            </li>
            <li>
              <span>Email</span>
              <a href="mailto:info@jktourism.gov.in">info@jktourism.gov.in</a>
            </li>
            <li>
              <span>Tourist Police</span>
              <a href="tel:01942452000">0194-245-2000</a>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Related</h4>
          <ul>
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>(c) {year} Department of Tourism, Government of Jammu & Kashmir.</p>
          <p className="footer-disclaimer">
            Information is updated periodically. Verify road conditions and permits before travel.
          </p>
        </div>
      </div>
    </footer>
  );
}
