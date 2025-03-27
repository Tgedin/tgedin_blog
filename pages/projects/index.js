import MainLayout from '../../layouts/MainLayout';
import Link from 'next/link';
import { getAllProjects } from '../../lib/projects';
import { formatDate } from '../../lib/date';

export default function Projects({ projects }) {
  // Group projects by status
  const completedProjects = projects
    .filter(project => project.completed)
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    
  const ongoingProjects = projects
    .filter(project => !project.completed)
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  return (
    <MainLayout 
      title="Projects" 
      description="A showcase of my work in data science, machine learning, and software development"
    >
      <h1>Projects</h1>
      <p>A collection of my work, experiments, and ongoing initiatives.</p>
      
      {/* Ongoing Projects Section */}
      {ongoingProjects.length > 0 && (
        <section className="projects-section">
          <h2 className="content-year-heading">Ongoing Projects</h2>
          <table className="content-table">
            <tbody>
              {ongoingProjects.map(project => (
                <tr key={project.id}>
                  <td className="date-cell">
                    {formatDate(project.lastUpdated).split(' ')[0]} {/* Just month */}
                    <br />
                    {formatDate(project.lastUpdated).split(' ')[1].replace(',', '')} {/* Just day number */}
                  </td>
                  <td className="content-cell">
                    <Link href={`/projects/${project.id}`}>
                      <h3>{project.title}</h3>
                      {project.description && <p>{project.description}</p>}
                    </Link>
                    <div className="project-meta-info">
                      <span className="project-update-info">Last updated: {formatDate(project.lastUpdated)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      
      {/* Completed Projects Section */}
      <section className="projects-section">
        <h2 className="content-year-heading">Completed Projects</h2>
        {completedProjects.length > 0 ? (
          <table className="content-table">
            <tbody>
              {completedProjects.map(project => (
                <tr key={project.id}>
                  <td className="date-cell">
                    {formatDate(project.lastUpdated).split(' ')[0]} {/* Just month */}
                    <br />
                    {formatDate(project.lastUpdated).split(' ')[1].replace(',', '')} {/* Just day number */}
                  </td>
                  <td className="content-cell">
                    <Link href={`/projects/${project.id}`}>
                      <h3>{project.title}</h3>
                      {project.description && <p>{project.description}</p>}
                    </Link>
                    <div className="project-meta-info">
                      <span className="project-completion-date">Completed: {formatDate(project.lastUpdated)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-state">No completed projects yet. Stay tuned!</p>
        )}
      </section>
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
