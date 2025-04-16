import MainLayout from "../../layouts/MainLayout";
import { getAllPosts } from "../../lib/posts";
import PostCard from "../../components/post/PostCard";

export default function Blog({ posts }) {
  return (
    <MainLayout
      title="Blog"
      description="Articles on data science, programming, and civil engineering"
    >
      <div className="blog-container">
        <h1>Blog</h1>

        {posts.length > 0 ? (
          // Use a structure similar to the landing page's featured section
          <section className="posts-section">
            {posts.map((post) => (
              <PostCard
                key={`${post.year}-${post.id}`}
                post={post}
                featured={true} // Apply featured layout to all cards
              />
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <p>No posts published yet. Check back soon!</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .blog-container {
          /* Use content-width like featured-section */
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        h1 {
          /* Match featured-heading style */
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--color-border);
          text-align: left;
        }

        .posts-section {
          /* Container for the featured-style cards */
          display: flex;
          flex-direction: column;
          gap: 2rem; /* Keep the gap between cards */
        }

        .empty-state {
          text-align: center;
          padding: 3rem 0;
          color: var(--color-text-secondary);
        }
      `}</style>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
