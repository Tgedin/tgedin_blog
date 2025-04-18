import MainLayout from "../layouts/MainLayout";
import Image from "next/image";

export default function Newsletter() {
  return (
    <MainLayout
      title="Newsletter – Substack"
      description="Subscribe to Théo Gédin's Substack newsletter for weekly explorations on housing, engineering, and society."
    >
      <div className="newsletter-container">
        <h1>Newsletter</h1>
        <div className="newsletter-logo-container">
          <Image
            src="/Logo.png"
            alt="Substack Newsletter Logo"
            className="newsletter-logo"
            width={420}
            height={280}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "24px",
            }}
            priority
          />
        </div>
        <div className="newsletter-content">
          <p className="newsletter-description">
            What if our housing crisis isn{"'"}t a resource problem, but an
            information one? Weekly explorations from an engineer with a poet
            {"'"}s heart – mixing technical deep dives with philosophical
            musings on how we build our world.
          </p>
          <a
            href="https://theogedin.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="newsletter-button"
          >
            Read Crossroads of Curiosity
          </a>
        </div>
      </div>
      <style jsx>{`
        .newsletter-container {
          max-width: 600px;
          margin: 3rem auto;
          padding: 2rem;
          background: var(--color-card-bg);
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          text-align: center;
        }
        .newsletter-logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .newsletter-logo {
          width: 420px;
          height: 280px;
          max-width: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 24px;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          display: block;
        }
        @media (max-width: 700px) {
          .newsletter-logo {
            width: 100vw;
            height: auto;
            aspect-ratio: 3/2;
            max-width: 100vw;
            min-height: 120px;
            object-fit: cover;
            object-position: center;
          }
        }
        .newsletter-description {
          font-size: 1.15rem;
          margin-bottom: 2rem;
          color: var(--color-text);
          font-style: italic;
        }
        .newsletter-button {
          display: inline-block;
          background-color: var(--color-primary);
          color: white;
          padding: 0.8rem 1.6rem;
          border-radius: 8px;
          font-weight: 500;
          font-size: 1.1rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .newsletter-button:hover {
          background-color: var(--color-primary-dark);
        }
      `}</style>
    </MainLayout>
  );
}
