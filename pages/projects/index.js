import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "../../lib/projects";

export default function Projects({ projects }) {
  // Group projects by status
  const completedProjects = projects
    .filter((project) => project.completed)
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  const ongoingProjects = projects
    .filter((project) => !project.completed)
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  return (
    <MainLayout
      title="Projects"
      description="A showcase of my work in data science, machine learning, and software development"
    >
      <div className="projects-wide-container">
        <div className="projects-header">
          <h1>Projects</h1>
          <p className="projects-intro">
            A collection of my work, experiments, and ongoing initiatives.
          </p>
        </div>

        <div className="projects-grid">
          {ongoingProjects.length > 0 && (
            <section>
              <h2 className="content-year-heading">Ongoing Projects</h2>
              <div className="project-card-list">
                {ongoingProjects.map((project) => (
                  <div key={project.id} className="project-card">
                    <Link href={`/projects/${project.id}`}>
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
                        <h3>{project.title}</h3>
                        {project.description && <p>{project.description}</p>}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
          {completedProjects.length > 0 && (
            <section>
              <h2 className="content-year-heading">Completed Projects</h2>
              <div className="project-card-list">
                {completedProjects.map((project) => (
                  <div key={project.id} className="project-card">
                    <Link href={`/projects/${project.id}`}>
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
                        <h3>{project.title}</h3>
                        {project.description && <p>{project.description}</p>}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <style jsx>{`
        .projects-grid {
          width: 100%;
          max-width: 1400px; /* Wider than the default content width */
          margin: 0 auto;
        }

        .project-card-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin: 2rem 0 3rem 0;
        }

        /* For desktop: prefer 2 columns when there are exactly 2 cards */
        @media (min-width: 768px) {
          .project-card-list {
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 3rem;
          }
        }

        @media (min-width: 1200px) {
          .project-card-list {
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
            gap: 3.5rem;
          }
        }

        .project-card {
          background: linear-gradient(
            145deg,
            var(--color-card-bg),
            rgba(255, 255, 255, 0.02)
          );
          border: 2px solid var(--color-border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
        }

        .project-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--color-primary),
            var(--color-accent, #6366f1)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          border-color: var(--color-primary);
          transform: translateY(-6px) scale(1.02);
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-image-container {
          height: 200px;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid var(--color-border);
          position: relative;
        }

        .project-image-container::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--color-primary),
            transparent
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-image-container::after {
          opacity: 0.6;
        }

        :global(.project-image) {
          object-fit: contain;
          width: 100%;
          height: 100%;
          padding: 1rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          filter: contrast(1.1) saturate(1.1);
        }

        .project-card:hover :global(.project-image) {
          transform: scale(1.08);
          filter: contrast(1.2) saturate(1.2) brightness(1.05);
        }

        .project-card-content {
          padding: 1.75rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--color-card-bg);
        }

        .project-card h3 {
          margin: 0 0 1rem 0;
          color: var(--color-primary);
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .project-card:hover h3 {
          color: var(--color-primary-dark, var(--color-primary));
        }

        .project-card p {
          color: var(--color-text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .project-meta-info {
          font-size: 0.9rem;
          color: var(--color-muted);
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
        }

        /* Enhanced section headers */
        .content-year-heading {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--color-headings);
          margin: 3rem 0 1.5rem 0;
          position: relative;
          padding-left: 1rem;
        }

        .content-year-heading::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.2rem;
          width: 4px;
          height: 1.2rem;
          background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-accent, #6366f1)
          );
          border-radius: 2px;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .projects-grid {
            max-width: 100%;
            padding: 0 1rem;
          }

          .project-card-list {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin: 1.5rem 0 2rem 0;
          }

          .project-card {
            max-width: 500px;
            margin: 0 auto;
            width: 100%;
          }

          .project-image-container {
            height: 180px;
          }

          .project-card-content {
            padding: 1.25rem;
          }

          .content-year-heading {
            font-size: 1.4rem;
            margin: 2rem 0 1rem 0;
          }
        }

        @media (max-width: 480px) {
          .project-card {
            border-radius: 12px;
          }

          .project-card-content {
            padding: 1rem;
          }

          .project-card h3 {
            font-size: 1.1rem;
          }

          .project-card p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const projects = getAllProjects();

  return {
    props: {
      projects,
    },
  };
}
