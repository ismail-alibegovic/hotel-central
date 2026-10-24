/**
 * HOTEL CENTRAL wordmark for the admin (login screen and sidebar). Plain SVG text in the site's serif stack, drawn with
 * currentColor so it follows the light/dark theme and keeps its contrast. The public website is not affected.
 */
export function Logo() {
  return (
    <svg className="hc-logo" viewBox="0 0 380 64" role="img" aria-label="Hotel Central" xmlns="http://www.w3.org/2000/svg">
      <text x="190" y="30" textAnchor="middle" fontFamily="Gilda Display, Didot, Georgia, 'Times New Roman', serif" fontSize="27" letterSpacing="7" fill="currentColor">
        HOTEL CENTRAL
      </text>
      <line x1="80" y1="42" x2="300" y2="42" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <text x="190" y="58" textAnchor="middle" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" fontSize="11" letterSpacing="4" fill="currentColor" fillOpacity="0.75">
        WEBSITE MANAGER
      </text>
    </svg>
  );
}
