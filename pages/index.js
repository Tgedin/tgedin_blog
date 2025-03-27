import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';
import { getAllPosts } from '../lib/posts';
import { formatDate } from '../lib/date';

export default function Home({ featuredPosts }) {
  return (
    <MainLayout>
      <div className="home-container">
        <h1 className="site-title">From Bricks to Bytes</h1>
        <p className="intro">Personal blog by Theo Gedin</p>
        
        {featuredPosts.length > 0 && (
          <section className="featured-section">
            <h2>Featured Articles</h2>
            <ul className="featured-posts">
              {featuredPosts.map(post => (
                <li key={post.id}>
                  <Link href={`/blog/${post.year}/${post.id}`}>
                    <article>
                      <h3>{post.title}</h3>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <p>{post.description}</p>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="view-all">
              <Link href="/blog">View all articles →</Link>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter(post => post.featured).slice(0, 3);
  
  return {
    props: {
      featuredPosts,
    },
  };
}
