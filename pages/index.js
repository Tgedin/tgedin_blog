import Link from "next/link";
import Image from "next/image";
import MainLayout from "../layouts/MainLayout";
import { getAllPosts } from "../lib/posts";
import { getAllProjects } from "../lib/projects";
import { formatDate } from "../lib/date";
import SkillsModule from "../components/SkillsModule";
import BricksToBytes from "../components/BricksToBytes";
import PostCard from "../components/post/PostCard";
import AboutMeCard from "../components/AboutMeCard";

export default function Home({ recentPosts = [], projects = [] }) {
  // Filter for featured projects - with null check
  const featuredProjects =
    projects?.filter((project) => project.featured) || [];

  // Get the most recent post - with null check
  const latestPost = recentPosts?.length > 0 ? recentPosts[0] : null;

  return (
    <MainLayout>
      <div className="home-container">
        {/* Hero Section with profile image and improved styling */}
        <section className="hero-section">
          <div className="profile-image-container animate-float">
            <Image
              src="/profile_pic.webp"
              alt="Théo Gédin"
              width={220} // Increased from 180
              height={220} // Increased from 180
              className="profile-image"
              priority
            />
          </div>

          <h1 className="site-title animate-fade-in">From Bricks to Bytes</h1>
          <p className="intro animate-fade-in-delay">
            Personal blog by{" "}
            <span itemProp="name" className="highlight-text">
              Théo Gédin
            </span>
          </p>

          {/* CTA buttons */}
          <div className="hero-cta animate-fade-in-delay-2">
            <a
              href="https://theogedin.substack.com/"
              className="primary-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-icon">📬</span> Join Newsletter
            </a>
            <a href="/about" className="secondary-cta">
              <span className="btn-icon">👋</span> Learn About Me
            </a>
          </div>

          {/* Add the visualization component */}
          <div className="transition-visual-container animate-fade-in-delay-3">
            <BricksToBytes className="shadow-md" />
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator">
          <span className="separator-icon">💼</span>
        </div>

        {/* Featured Projects Section - with improved null check */}
        {featuredProjects?.length > 0 && (
          <section className="featured-section animate-slide-up">
            <h2 className="featured-heading">Current Projects</h2>

            <div className="featured-projects-grid">
              {featuredProjects.map((project, index) => (
                <Link
                  href={`/projects/${project.id}`}
                  key={project.id || index}
                  className={`featured-project-card animate-slide-up-delay-${Math.min(
                    index,
                    2
                  )}`}
                >
                  <div className="project-image-container">
                    {project.id === "data-science-bootcamp" ? (
                      <Image
                        src="/4geeksacademyes_logo.jpeg"
                        alt="4Geeks Academy"
                        width={600}
                        height={300}
                        className="project-image"
                      />
                    ) : (
                      <Image
                        src={project.image || "/default-project-image.jpg"}
                        alt={project.title}
                        width={600}
                        height={300}
                        className="project-image"
                      />
                    )}
                  </div>
                  <div className="project-card-content">
                    <div className="project-card-header">
                      <h3>{project.title}</h3>
                      <span className="project-status">
                        {project.completed ? "Completed" : "Ongoing"}
                      </span>
                    </div>
                    {project.description && (
                      <p className="project-description">
                        {project.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="view-all animate-fade-in-delay">
              <Link href="/projects" className="view-all-link">
                View all projects →
              </Link>
            </div>
          </section>
        )}

        {/* Section Separator */}
        <div className="section-separator">
          <span className="separator-icon">🔧</span>
        </div>

        {/* Skills Section - Now Always Expanded */}
        <section className="featured-section animate-slide-up">
          <SkillsModule defaultCollapsed={false} />
        </section>

        {/* Section Separator */}
        <div className="section-separator">
          <span className="separator-icon">📝</span>
        </div>

        {/* Recent Articles Section - enhanced with improved null check */}
        <section className="featured-section animate-slide-up">
          <h2 className="featured-heading">Latest Article</h2>

          {latestPost ? (
            <>
              <PostCard post={latestPost} featured={true} />

              <div className="view-all animate-fade-in-delay">
                <Link href="/blog" className="view-all-link">
                  Browse all articles →
                </Link>
              </div>
            </>
          ) : (
            <p className="empty-state">
              No articles published yet. Check back soon!
            </p>
          )}
        </section>

        {/* Contact CTA Section - Refined */}
        <section className="contact-cta-section animate-slide-up">
          <div className="contact-cta-container">
            <h2 className="contact-cta-title">Find Me Online</h2>
            <div className="contact-cta-socials">
              <a
                href="https://x.com/TheoGedin"
                className="contact-cta-social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <span className="contact-cta-icon">𝕏</span>
                <span>X</span>
              </a>
              <a
                href="https://www.linkedin.com/in/theo-gedin/"
                className="contact-cta-social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span className="contact-cta-icon">💼</span>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Tgedin"
                className="contact-cta-social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <span className="contact-cta-icon">💻</span>
                <span>GitHub</span>
              </a>
            </div>
            <Link href="/contact" className="contact-cta-button">
              Or send a message →
            </Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .hero-section {
          text-align: center;
          margin: 2rem 0 4rem;
        }

        .profile-image-container {
          margin: 0 auto 2rem;
          width: 220px; // Increased from 180px
          height: 220px; // Increased from 180px
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--color-primary);
          box-shadow: 0 6px 16px rgba(var(--color-primary-rgb), 0.25);
          position: relative;
        }

        :global(.profile-image) {
          object-fit: cover;
          border-radius: 50%;
        }

        .site-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          color: var(--color-headings);
          letter-spacing: -0.03em;
        }

        .intro {
          font-size: 1.4rem;
          color: var(--color-secondary);
          margin-bottom: 2rem;
        }

        .highlight-text {
          color: var(--color-primary);
          font-weight: 600;
          position: relative;
          display: inline-block;
        }

        .highlight-text::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -5px;
          left: 0;
          background-color: var(--color-primary);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .highlight-text:hover::after {
          transform: scaleX(1);
        }

        .hero-cta {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
        }

        .primary-cta,
        .secondary-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1.8rem;
          border-radius: var(--radius-md);
          font-weight: 500;
          transition: all var(--transition-medium) ease;
          gap: 0.5rem;
        }

        .primary-cta {
          background-color: var(--color-primary);
          color: white;
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .primary-cta:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          text-decoration: none;
        }

        .secondary-cta {
          background-color: transparent;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
        }

        .secondary-cta:hover {
          background-color: rgba(var(--color-primary-rgb), 0.1);
          transform: translateY(-2px);
          text-decoration: none;
        }

        .transition-visual-container {
          margin: 3rem auto;
          max-width: 800px;
          width: 100%;
        }

        .section-separator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 3rem 0;
          position: relative;
        }

        .section-separator::before,
        .section-separator::after {
          content: "";
          height: 1px;
          background-color: var(--color-border);
          flex: 1;
        }

        .separator-icon {
          margin: 0 1rem;
          background-color: var(--color-card-bg);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1.2rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
        }

        .featured-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .featured-project-card {
          background-color: var(--color-card-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all var(--transition-medium) ease;
          text-decoration: none;
          color: var(--color-text);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .featured-project-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary);
          text-decoration: none;
        }

        .project-image-container {
          width: 100%;
          height: 200px;
          position: relative;
          overflow: hidden;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.project-image) {
          object-fit: contain;
          max-width: 100%;
          max-height: 100%;
          padding: 1rem;
          transition: transform 0.3s ease;
        }

        .featured-project-card:hover :global(.project-image) {
          transform: scale(1.03);
        }

        .project-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .project-card-header h3 {
          margin: 0;
          font-size: 1.3rem;
          color: var(--color-primary);
          flex: 1;
        }

        .project-description {
          margin: 0.5rem 0 1rem;
          font-size: 0.95rem;
          color: var(--color-secondary);
          line-height: 1.5;
        }

        .project-status {
          font-size: 0.75rem;
          background-color: var(--color-tag-bg);
          color: var(--color-primary);
          padding: 0.3rem 0.6rem;
          border-radius: 2rem;
          font-weight: 500;
          white-space: nowrap;
          margin-left: 0.5rem;
        }

        @media (max-width: 768px) {
          .site-title {
            font-size: 2.5rem;
          }

          .intro {
            font-size: 1.2rem;
          }

          .hero-cta {
            flex-direction: column;
            align-items: center;
            gap: 0.8rem;
          }

          .primary-cta,
          .secondary-cta {
            width: 100%;
            max-width: 250px;
            text-align: center;
          }

          .profile-image-container {
            width: 180px; // Adjusted for mobile
            height: 180px;
          }

          .featured-projects-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .project-card-header {
            flex-direction: column;
            gap: 0.5rem;
          }

          .project-status {
            align-self: flex-start;
          }

          .featured-heading {
            font-size: 1.5rem;
          }

          .project-image-container {
            height: 180px;
          }
        }

        @media (max-width: 480px) {
          .site-title {
            font-size: 2rem;
          }

          .transition-visual-container {
            margin: 2rem auto;
          }

          .featured-section {
            padding: 0 0.5rem;
          }
        }

        .contact-cta-section {
          margin: 5rem 0 3rem;
        }

        .contact-cta-container {
          background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-primary-dark)
          );
          color: white;
          padding: 2.5rem 2rem 2.5rem 2rem;
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .contact-cta-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: white;
        }

        .contact-cta-socials {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .contact-cta-social {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 1rem 1.5rem;
          color: white;
          font-weight: 500;
          font-size: 1.1rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }

        .contact-cta-social:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: translateY(-3px) scale(1.05);
        }

        .contact-cta-icon {
          font-size: 2rem;
          margin-bottom: 0.3rem;
        }

        .contact-cta-button {
          background-color: white;
          color: var(--color-primary);
          padding: 1rem 2.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1.1rem;
          display: inline-block;
          transition: all 0.3s;
          margin-top: 0.5rem;
        }

        .contact-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .contact-cta-container {
            padding: 2rem 1rem;
            gap: 1.5rem;
          }
          .contact-cta-title {
            font-size: 1.4rem;
          }
          .contact-cta-socials {
            gap: 1rem;
          }
          .contact-cta-social {
            padding: 0.8rem 1rem;
            font-size: 1rem;
          }
          .contact-cta-button {
            width: 100%;
            padding: 1rem 1.5rem;
            font-size: 1rem;
          }
        }

        /* Animation classes */
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 1s ease-out 0.9s forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-slide-up-delay-0 {
          animation: slideUp 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-slide-up-delay-1 {
          animation: slideUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-slide-up-delay-2 {
          animation: slideUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </MainLayout>
  );
}

export async function getStaticProps() {
  try {
    const allPosts = getAllPosts() || [];
    const allProjects = getAllProjects() || [];

    // Sort posts by date (newest first) and take only the 3 most recent
    const recentPosts = allPosts
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
      .slice(0, 3);

    // Sort projects by lastUpdated date
    const projects = allProjects.sort(
      (a, b) =>
        new Date(b.lastUpdated || b.date || 0) -
        new Date(a.lastUpdated || a.date || 0)
    );

    return {
      props: {
        recentPosts,
        projects,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        recentPosts: [],
        projects: [],
      },
    };
  }
}
