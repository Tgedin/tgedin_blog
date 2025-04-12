import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import { getAllPosts } from "../lib/posts";
import { getAllProjects } from "../lib/projects";
import { formatDate } from "../lib/date";
import SkillsModule from "../components/SkillsModule";

export default function Home({ recentPosts, projects }) {
  // Filter for featured projects
  const featuredProjects = projects.filter((project) => project.featured);

  // Get the most recent post
  const latestPost = recentPosts.length > 0 ? recentPosts[0] : null;

  return (
    <MainLayout>
      <div className="home-container">
        <h1 className="site-title">From Bricks to Bytes</h1>
        <p className="intro">
          Personal blog by <span itemProp="name">Théo Gédin</span>
        </p>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <section className="featured-section">
            <h2 className="featured-heading">Current Projects</h2>

            <table className="content-table">
              <tbody>
                {featuredProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="date-cell">
                      {
                        formatDate(project.lastUpdated || project.date).split(
                          " "
                        )[0]
                      }
                      <br />
                      {formatDate(project.lastUpdated || project.date)
                        .split(" ")[1]
                        .replace(",", "")}
                    </td>
                    <td className="content-cell">
                      <Link href={`/projects/${project.id}`}>
                        <h3>{project.title}</h3>
                        {project.description && <p>{project.description}</p>}
                      </Link>
                      <div className="project-meta-info">
                        <span className="project-update-info">
                          Last updated:{" "}
                          {formatDate(project.lastUpdated || project.date)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="view-all">
              <Link href="/projects" className="view-all-link">
                View all projects →
              </Link>
            </div>
          </section>
        )}

        {/* Skills Section - Now Collapsible */}
        <section className="featured-section">
          <SkillsModule defaultCollapsed={true} />
        </section>

        {/* Recent Articles Section */}
        <section className="featured-section">
          <h2 className="featured-heading">Latest Article</h2>

          {latestPost ? (
            <>
              <div className="latest-post">
                <div className="latest-post-meta">
                  <time dateTime={latestPost.date}>
                    {formatDate(latestPost.date)}
                  </time>
                  {latestPost.tags && latestPost.tags.length > 0 && (
                    <div className="latest-post-tags">
                      {latestPost.tags.map((tag) => (
                        <span key={tag} className="latest-post-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Link href={`/blog/${latestPost.year}/${latestPost.id}`}>
                  <h3 className="latest-post-title">{latestPost.title}</h3>
                </Link>

                {latestPost.description && (
                  <p className="latest-post-description">
                    {latestPost.description}
                  </p>
                )}

                <Link
                  href={`/blog/${latestPost.year}/${latestPost.id}`}
                  className="read-more-link"
                >
                  Read article →
                </Link>
              </div>

              <div className="view-all">
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
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const allProjects = getAllProjects();

  // Sort posts by date (newest first) and take only the 3 most recent
  const recentPosts = allPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Sort projects by lastUpdated date
  const projects = allProjects.sort(
    (a, b) =>
      new Date(b.lastUpdated || b.date) - new Date(a.lastUpdated || a.date)
  );

  return {
    props: {
      recentPosts,
      projects,
    },
  };
}
