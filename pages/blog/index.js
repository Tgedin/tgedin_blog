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
          <h2 className="content-year-heading">{year}</h2>
          <table className="content-table">
            <tbody>
              {posts
                .filter(post => post.year === year)
                .map(post => (
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
