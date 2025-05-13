import Link from "next/link";
import Image from "next/image";

export default function AboutMeCard() {
  return (
    <div className="about-me-card hover-lift">
      <div className="about-me-image">
        <div className="image-border-effect">
          <Image
            src="/profile_pic.webp"
            alt="Théo Gédin"
            width={150} // Increased from 120
            height={150} // Increased from 120
            className="profile-image"
          />
        </div>
      </div>
      <div className="about-me-content">
        <h3>Théo Gédin</h3>
        <h4>Civil Engineer & Data Scientist</h4>
        <div className="skill-tags">
          <span className="skill-tag">Python</span>
          <span className="skill-tag">Machine Learning</span>
          <span className="skill-tag">Data Analysis</span>
          <span className="skill-tag">Civil Engineering</span>
        </div>
        <p>
          Bridging traditional engineering with data science to create
          human-centered solutions for complex challenges.
        </p>
        <div className="about-me-links">
          <Link href="/about" className="about-link hover-scale">
            About Me
          </Link>
          <Link href="/contact" className="contact-link hover-scale">
            Get in Touch
          </Link>
        </div>
      </div>

      <style jsx>{`
        .about-me-card {
          display: flex;
          background-color: var(--color-card-bg);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          margin: 2rem 0 3rem;
          transition: all var(--transition-medium) ease;
          animation: fadeIn 1s ease-out forwards;
        }

        .about-me-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary);
        }

        .about-me-image {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-border-effect {
          position: relative;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(45deg, var(--color-primary), transparent);
          animation: rotate 8s linear infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        :global(.profile-image) {
          border-radius: 50%;
          object-fit: cover;
          display: block;
          border: 2px solid var(--color-card-bg);
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0.5rem 0 1rem;
        }

        .skill-tag {
          background-color: rgba(var(--color-primary-rgb), 0.1);
          color: var(--color-primary);
          font-size: 0.7rem;
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          font-weight: 500;
        }

        .about-me-content {
          flex: 1;
          padding: 1.5rem 1.5rem 1.5rem 0;
        }

        .about-me-content h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          color: var(--color-headings);
          letter-spacing: -0.02em;
        }

        .about-me-content h4 {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          color: var(--color-primary);
          font-weight: 500;
        }

        .about-me-content p {
          margin: 0 0 1.5rem 0;
          color: var(--color-secondary);
          line-height: 1.6;
        }

        .about-me-links {
          display: flex;
          gap: 1rem;
        }

        .about-link,
        .contact-link {
          display: inline-block;
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 500;
          transition: all var(--transition-fast) ease;
          text-align: center;
        }

        .about-link {
          background-color: var(--color-primary);
          color: white;
        }

        .about-link:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
          text-decoration: none;
          box-shadow: var(--shadow-sm);
        }

        .contact-link {
          border: 1px solid var(--color-primary);
          color: var(--color-primary);
        }

        .contact-link:hover {
          background-color: rgba(var(--color-primary-rgb), 0.1);
          transform: translateY(-2px);
          text-decoration: none;
        }

        @media (max-width: 700px) {
          .about-me-card {
            flex-direction: column;
            align-items: center;
            padding: 1.5rem;
            margin: 1.5rem 0 2.5rem;
          }

          .about-me-image {
            padding: 0 0 1rem 0;
          }

          .about-me-content {
            padding: 0;
            text-align: center;
          }

          .about-me-links {
            justify-content: center;
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }

          .about-link,
          .contact-link {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .about-me-card {
            padding: 1.25rem;
          }

          :global(.profile-image) {
            width: 100px;
            height: 100px;
          }

          .about-me-content h3 {
            font-size: 1.3rem;
          }

          .about-me-content p {
            font-size: 0.95rem;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
