import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import { getAllProjects } from "../../lib/projects";
import { formatDate } from "../../lib/date";

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
      <h1>Projects</h1>
      <p>A collection of my work, experiments, and ongoing initiatives.</p>

      <div className="projects-grid">
        {ongoingProjects.length > 0 && (
          <section>
            <h2 className="content-year-heading">Ongoing Projects</h2>
            <div className="project-card-list">
              {ongoingProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <Link href={`/projects/${project.id}`}>
                    <h3>{project.title}</h3>
                    {project.description && <p>{project.description}</p>}
                    <div className="project-meta-info">
                      <span className="project-update-info">
                        Last updated: {formatDate(project.lastUpdated)}
                      </span>
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
                    <h3>{project.title}</h3>
                    {project.description && <p>{project.description}</p>}
                    <div className="project-meta-info">
                      <span className="project-update-info">
                        Last updated: {formatDate(project.lastUpdated)}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <style jsx>{`
        .projects-grid {
          width: 100%;
        }
        .project-card-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: 2rem;
          margin: 2rem 0 3rem 0;
        }
        .project-card {
          background: var(--color-card-bg);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          padding: 1.5rem 1.25rem;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .project-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.13);
          border-color: var(--color-primary);
          transform: translateY(-4px) scale(1.015);
        }
        .project-card h3 {
          margin: 0 0 0.7rem 0;
          color: var(--color-primary);
          font-size: 1.18rem;
        }
        .project-card p {
          color: var(--color-text-secondary);
          font-size: 1.02rem;
          margin-bottom: 0.7rem;
        }
        .project-meta-info {
          font-size: 0.92rem;
          color: var(--color-muted);
        }
        @media (max-width: 700px) {
          .project-card-list {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .project-card {
            padding: 1.1rem 0.9rem;
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
