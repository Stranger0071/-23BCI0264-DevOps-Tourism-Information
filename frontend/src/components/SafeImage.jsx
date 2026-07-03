const fallbackSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" role="img" aria-label="Kashmir landscape">
  <defs>
    <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#dcebea"/>
      <stop offset="0.55" stop-color="#f7f5f0"/>
      <stop offset="1" stop-color="#e8d8c4"/>
    </linearGradient>
    <linearGradient id="water" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#3d6b7a"/>
      <stop offset="1" stop-color="#5a8f9f"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="760" fill="url(#sky)"/>
  <path d="M0 395 180 205 292 330 420 155 610 370 730 235 910 395Z" fill="#d9e2dc"/>
  <path d="M0 430 210 245 346 382 515 190 720 430Z" fill="#2d4a3e"/>
  <path d="M184 249 210 245 250 286 228 279Z" fill="#f7f5f0"/>
  <path d="M480 230 515 190 566 244 530 235Z" fill="#f7f5f0"/>
  <path d="M0 470h1200v290H0Z" fill="url(#water)"/>
  <path d="M0 528c150-35 278-37 420 0s300 36 460 0 244-32 320 0v232H0Z" fill="#315b54" opacity=".28"/>
  <path d="M318 575c68-18 142-18 210 0" stroke="#f2ece1" stroke-width="12" stroke-linecap="round" opacity=".6"/>
  <path d="M725 625c96-18 186-18 282 0" stroke="#f2ece1" stroke-width="12" stroke-linecap="round" opacity=".45"/>
  <circle cx="1000" cy="150" r="54" fill="#e8a574" opacity=".9"/>
</svg>
`);

export const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${fallbackSvg}`;

export default function SafeImage({ src, alt, className, ...props }) {
  return (
    <img
      src={src || FALLBACK_IMAGE}
      alt={alt}
      className={className}
      onError={(event) => {
        if (event.currentTarget.src !== FALLBACK_IMAGE) {
          event.currentTarget.src = FALLBACK_IMAGE;
        }
      }}
      {...props}
    />
  );
}
