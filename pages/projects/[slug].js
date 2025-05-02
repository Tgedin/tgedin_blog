import { useRouter } from "next/router";
import Link from "next/link";
import MainLayout from "../../layouts/MainLayout";
import { getProjectBySlug, getAllProjects } from "../../lib/projects";
import { formatDate } from "../../lib/date";
import { MDXRemote } from "next-mdx-remote";
import BootcampSyllabus from "../../components/BootcampSyllabus";

const components = {
  BootcampSyllabus,
};

export default function Project({ project }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return (
      <MainLayout title="Project Not Found">
        <div className="error-container">
          <h1>Project Not Found</h1>
          <p>
            The project you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="error-actions">
            <button onClick={() => router.push("/projects")}>
              View All Projects
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const { frontmatter, content } = project;

  return (
    <MainLayout title={frontmatter.title} description={frontmatter.description}>
      <div className="project-container">
        <header className="project-header">
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="project-tags">
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1>{frontmatter.title}</h1>
          <div className="project-meta">
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            <span className="project-status">
              {frontmatter.completed ? "Completed" : "Ongoing"}
            </span>
          </div>
        </header>

        <div className="project-content">
          <MDXRemote {...content} components={components} />
        </div>

        <div className="project-footer">
          <Link href="/projects">← Back to Projects</Link>
        </div>
      </div>

      <style jsx>{`
        /* Add custom styles to ensure project header doesn't stick */
        .project-header {
          position: static !important;
          z-index: 1;
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .project-container {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }

        .project-header h1 {
          font-size: 2.5rem;
          margin: 1rem 0;
          letter-spacing: -0.02em;
          font-weight: 700;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .project-tag {
          background-color: var(--color-card-bg);
          color: var(--color-primary);
          padding: 0.3rem 0.8rem;
          border-radius: 2rem;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          border: 1px solid var(--color-border);
        }

        .project-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          color: var(--color-secondary);
          font-size: 0.95rem;
        }

        .project-status {
          background-color: var(--color-card-bg);
          padding: 0.3rem 0.8rem;
          border-radius: 2rem;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid var(--color-border);
          display: inline-flex;
          align-items: center;
        }

        .project-status::before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${frontmatter.completed ? "#4CAF50" : "#FFC107"};
          margin-right: 0.5rem;
        }

        .project-content {
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .project-content h2 {
          font-size: 1.75rem;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .project-content p {
          margin-bottom: 1.5rem;
        }

        .project-content ul {
          margin-bottom: 2rem;
        }

        .project-content li {
          margin-bottom: 0.5rem;
        }

        .project-footer {
          margin-top: 4rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
          font-weight: 500;
        }

        .project-footer a {
          color: var(--color-primary);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: transform 0.2s ease;
        }

        .project-footer a:hover {
          transform: translateX(-3px);
        }

        @media (max-width: 768px) {
          .project-container {
            padding: 2rem 1rem;
          }

          .project-header h1 {
            font-size: 2rem;
          }

          .project-content {
            font-size: 1rem;
          }
        }
      `}</style>
    </MainLayout>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
    // Add revalidation period (in seconds)
    revalidate: 3600, // Revalidate every hour
  };
}

export async function getStaticPaths() {
  const projects = getAllProjects();

  const paths = projects.map((project) => ({
    params: {
      slug: project.id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
