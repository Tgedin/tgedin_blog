import MainLayout from "../layouts/MainLayout";
import ContactForm from "../components/ContactForm";
import Image from "next/image";

const web3FormsApiKey = process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY;

export default function Contact() {
  return (
    <MainLayout
      title="Contact"
      description="Get in touch with Théo Gédin for collaborations, questions, or opportunities."
    >
      <div className="contact-container">
        <h1>Contact</h1>
        <div className="contact-logo-container">
          <Image
            src="/profile_pic.webp"
            alt="Profile picture of Théo Gédin"
            className="contact-logo"
            width={220}
            height={220}
            style={{ objectFit: "cover", borderRadius: "50%" }}
            priority
          />
        </div>
        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>
            Have an idea, opportunity, or just want to connect? I{"'"}m always
            open to interesting conversations and potential collaborations.
          </p>
          <ContactForm apiKey={web3FormsApiKey} />
        </section>

        {/* New Social Links Section */}
        <section className="social-links-section">
          <h2>Find Me On</h2>
          <div className="social-links">
            <a
              href="https://x.com/TheoGedin"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">𝕏</span>
              <span>X</span>
            </a>
            <a
              href="https://www.linkedin.com/in/th%C3%A9o-gedin-4a4365226/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">💼</span>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Tgedin"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">💻</span>
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </div>
      <style jsx>{`
        .contact-container {
          max-width: 600px;
          margin: 3rem auto;
          padding: 2rem;
          background: var(--color-card-bg);
          border-radius: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          text-align: center;
        }
        .contact-logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .contact-logo {
          width: 220px;
          height: 220px;
          object-fit: cover;
          border-radius: 50%;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
        }
        .contact-section {
          margin-top: 2rem;
        }
        .contact-section h2 {
          margin-bottom: 1rem;
        }
        .contact-section p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .social-links-section {
          margin-top: 3rem;
          text-align: center;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem;
          background-color: var(--color-card-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          min-width: 120px;
          transition: all var(--transition-medium) ease;
          text-decoration: none;
          color: var(--color-text);
        }

        .social-link:hover {
          transform: translateY(-5px);
          border-color: var(--color-primary);
          box-shadow: var(--shadow-md);
          text-decoration: none;
        }

        .social-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        @media (max-width: 640px) {
          .social-links {
            flex-direction: column;
            align-items: center;
          }

          .social-link {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </MainLayout>
  );
}
