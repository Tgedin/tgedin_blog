import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';
import { getAllPosts } from '../lib/posts';
import { formatDate } from '../lib/date';

export default function Home({ recentPosts }) {
  return (
    <MainLayout>
      <div className="home-container">
        <h1 className="site-title">From Bricks to Bytes</h1>
        <p className="intro">Personal blog by Theo Gedin</p>
        
        {recentPosts.length > 0 && (
          <section className="featured-section">
            <h2 className="featured-heading">Recent Articles</h2>
            
            <table className="content-table">
              <tbody>
                {recentPosts.map(post => (
                  <tr key={post.id}>
                    <td className="date-cell">
                      {formatDate(post.date).split(' ')[0]} {/* Just month */}
                      <br />
                      {formatDate(post.date).split(' ')[1].replace(',', '')} {/* Just day number */}
                    </td>
                    <td className="content-cell">
                      <Link href={`/blog/${post.year}/${post.id}`}>
                        <h3>{post.title}</h3>
                        {post.description && <p>{post.description}</p>}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="view-all">
              <Link href="/blog" className="view-all-link">
                View all articles →
              </Link>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  
  // Sort posts by date (newest first) and take only the 5 most recent
  const recentPosts = allPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
  return {
    props: {
      recentPosts,
    },
  };
}
