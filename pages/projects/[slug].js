import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLayout from '../../layouts/MainLayout';
import { getProjectBySlug, getAllProjects } from '../../lib/projects';
import { formatDate } from '../../lib/date';
import { MDXRemote } from 'next-mdx-remote';
import BootcampSyllabus from '../../components/BootcampSyllabus';

const components = {
  BootcampSyllabus
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
          <p>The project you're looking for doesn't exist or has been moved.</p>
          <div className="error-actions">
            <button onClick={() => router.push('/projects')}>
              View All Projects
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const { frontmatter, content } = project;
  
  return (
    <MainLayout
      title={frontmatter.title}
      description={frontmatter.description}
    >
      <div className="project-container">
        <header className="project-header">
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="project-tags">
              {frontmatter.tags.map(tag => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
          )}
          <h1>{frontmatter.title}</h1>
          <div className="project-meta">
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            <span className="project-status">
              {frontmatter.completed ? 'Completed' : 'Ongoing'}
            </span>
          </div>
        </header>
        
        <div className="project-content">
          <MDXRemote {...content} components={components} />
        </div>
        
        <div className="project-footer">
          <Link href="/projects">
            ← Back to Projects
          </Link>
        </div>
      </div>
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
    fallback: 'blocking',
  };
}
