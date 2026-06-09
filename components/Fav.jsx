export default function Fav({ domain, size = 64, className = 'fav' }) {
  return (
    <img
      className={className}
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`}
      alt=""
      loading="lazy"
    />
  );
}
