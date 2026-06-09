import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function Legal({ title, updated, description, children }) {
  return (
    <>
      <Nav />
      <div className="frame">
        <section className="sect legal-hero">
          <div className="hero-glow"></div>
          <div className="pad" style={{ paddingBottom: '36px' }}>
            <span className="eyebrow">Legal</span>
            <h1 className="legal-title">{title}</h1>
            <p className="legal-updated">Last updated: {updated}</p>
          </div>
        </section>

        <section className="sect">
          <div className="pad legal-body">
            {children}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
