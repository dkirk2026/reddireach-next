// Plain line icons for career rows that have no company logo to show
// (a private studio, a sold app, a first career). 24x24 stroke paths.
export const CAREER_ICONS = {
  mail: 'M4 6h16v12H4z M4 7l8 6 8-6',
  music: 'M9 18V5l11-2v13 M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  code: 'M8 8l-5 4 5 4 M16 8l5 4-5 4 M14 5l-4 14',
  phone: 'M7 3h10v18H7z M11 18h2',
};

export default function CareerIcon({ name }) {
  return (
    <span className="au-logo au-logo-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={CAREER_ICONS[name]} />
      </svg>
    </span>
  );
}
