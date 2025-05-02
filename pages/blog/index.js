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
        <h1>Articles</h1>

        <p className="blog-intro">
          Exploring the intersection of technology and humanity, from urban
          systems to artificial intelligence. These articles document my journey
          from civil engineering to data science, examining how we might build
          systems that better serve human needs while questioning the
          philosophical implications of our technological choices. Less abstract
          thinking, more grounded experiences.
        </p>

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
          padding: 3rem 1.5rem; /* Increased padding */
        }

        h1 {
          /* Match featured-heading style */
          font-size: 2.25rem; /* Larger heading */
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--color-border);
          text-align: left;
          letter-spacing: -0.02em; /* Slight negative tracking for modern look */
          font-weight: 700; /* Bolder heading */
        }

        .blog-intro {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--color-secondary);
          margin-bottom: 3.5rem; /* More space before posts */
          font-weight: 400;
          max-width: 85%; /* Slightly narrower than container for readability */
          opacity: 0.9; /* Subtle dimming for hierarchy */
        }

        .posts-section {
          /* Container for the featured-style cards */
          display: flex;
          flex-direction: column;
          gap: 3rem; /* Increased gap between cards */
        }

        .empty-state {
          text-align: center;
          padding: 3rem 0;
          color: var(--color-text-secondary);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .blog-container {
            padding: 2rem 1rem;
          }

          h1 {
            font-size: 1.85rem;
          }

          .blog-intro {
            font-size: 1.05rem;
            max-width: 100%;
            margin-bottom: 2.5rem;
          }

          .posts-section {
            gap: 2.5rem;
          }
        }

        /* Dark mode enhancement */
        [data-theme="dark"] .blog-intro {
          opacity: 0.85; /* Adjust for dark mode readability */
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
