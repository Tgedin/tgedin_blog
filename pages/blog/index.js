import Link from 'next/link';
import MainLayout from '../../layouts/MainLayout';
import { getAllPosts, getAllYears } from '../../lib/posts';
import { formatDate } from '../../lib/date';

export default function Blog({ posts, years }) {
  return (
    <MainLayout title="Blog" description="Articles on technology, development, data science, and more">
      <h1>Blog</h1>
      <p>Thoughts, tutorials, and insights.</p>
      
      {years.map(year => (
        <section key={year}>
          <h2>{year}</h2>
          <ul className="post-list">
            {posts
              .filter(post => post.year === year)
              .map(post => (
                <li key={post.id} className="post-item">
                  <Link href={`/blog/${post.year}/${post.id}`}>
                    <article>
                      <h3>{post.title}</h3>
                      <time dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                      {post.description && (
                        <p>{post.description}</p>
                      )}
                    </article>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </MainLayout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  const years = getAllYears();
  
  return {
    props: {
      posts,
      years,
    },
  };
}
