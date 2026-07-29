import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Page not found · ReddiReach',
  robots: { index: false, follow: true },
};

// Rendered with a genuine HTTP 404 whenever notFound() is called (for example an
// unknown blog slug) or a route does not exist. Without this file Next.js falls
// back to its unstyled default 404, which looks like a broken deploy.
export default function NotFound() {
  return (
    <>
      <Nav />
      <div className="frame">
        <section className="sect hero">
          <div className="hero-glow"></div>
          <div className="pad hero-in" style={{ maxWidth: '640px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>404</span>
            <h1 className="display" style={{ margin: '22px 0 16px', fontSize: 'clamp(30px,5vw,48px)' }}>
              This page does not exist.
            </h1>
            <p className="lead" style={{ margin: '0 auto', textWrap: 'pretty' }}>
              The link may be out of date, or the page has moved. Try the blog or the homepage instead.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
              <a href="/" className="btn btn-primary">Go to homepage</a>
              <a href="/blog" className="btn btn-ghost">Read the blog</a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
