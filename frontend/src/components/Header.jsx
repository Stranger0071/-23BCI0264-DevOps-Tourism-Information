import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { to: '/attractions', label: 'Places to Visit' },
  { to: '/hotels', label: 'Stay' },
  { to: '/guides', label: 'Travel Guides' },
  { to: '/maps', label: 'Maps & Routes' },
  { to: '/booking', label: 'Book a Trip' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="logo-block">
          <div className="logo-mark" aria-hidden="true">
            <span className="logo-mountain" />
          </div>
          <div className="logo-text">
            <span className="logo-dept">Department of Tourism</span>
            <span className="logo-title">Jammu & Kashmir</span>
          </div>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <ul>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a href="tel:18001807777" className="helpline-chip">
          <span className="helpline-label">Helpline</span>
          <span className="helpline-num">1800-180-7777</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        <ul>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <a href="tel:18001807777" className="mobile-helpline">
          Tourism Helpline: 1800-180-7777
        </a>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
