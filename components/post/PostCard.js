import Link from "next/link";
import { formatDate } from "../../lib/date";

// Featured images mapping - correct images for specific articles
const FEATURED_IMAGES = {
  // Map each article ID to its specific featured image
  "beyond-reality-ai-worlds-and-the-paradox-of-authentic-experience":
    "/the-mountains-7514392_1280.jpg",
  "ai-and-meritocracy": "/meritocracy-banner.webp",
  "beyond-abstractions": "/ahmad-odeh-KHipnBn7sdY-unsplash.jpg",
};

// Default rotation of featured images for posts without a specific mapping
const DEFAULT_FEATURED_IMAGES = [
  "/the-mountains-7514392_1280.jpg",
  "/meritocracy-banner.webp",
  "/ahmad-odeh-KHipnBn7sdY-unsplash.jpg",
];

// Removed hideDescription prop
export default function PostCard({ post, featured = false }) {
  const postUrl = `/blog/${post.year}/${post.id}`;

  // Determine the image URL with the following priority:
  // 1. Mapped featured image for this specific post ID
  // 2. A featured image from the rotation (based on some deterministic property)
  // 3. Fallback to placeholder

  let imageUrl;

  // Check if we have a specific mapping for this post
  if (FEATURED_IMAGES[post.id]) {
    imageUrl = FEATURED_IMAGES[post.id];
  }
  // If not, select one from the rotation based on the post ID's first character code
  else {
    const charCode =
      (post.id.charCodeAt(0) || 0) % DEFAULT_FEATURED_IMAGES.length;
    imageUrl = DEFAULT_FEATURED_IMAGES[charCode];
  }

  return (
    <div className={`post-card ${featured ? "featured" : ""}`}>
      <Link href={postUrl}>
        <div className="post-card-content">
          <div className="post-card-text">
            <div className="post-card-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.tags && post.tags.length > 0 && (
                <div className="post-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="post-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h2 className="post-card-title">{post.title}</h2>

            {/* Removed description paragraph */}

            <span className="post-card-read-more">Read article →</span>
          </div>

          <div className="post-card-image-container">
            <div className="post-card-image-wrapper">
              <img
                src={imageUrl}
                alt={`Cover image for ${post.title}`}
                className="post-card-image"
                loading="lazy"
                width={featured ? 1280 : 640}
                height={featured ? 720 : 360}
              />
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .post-card {
          border-radius: 12px;
          overflow: hidden;
          background-color: var(--color-card-bg);
          border: 1px solid var(--color-border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 2rem;
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        [data-theme="dark"] .post-card:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .post-card-content {
          display: flex;
          /* Keep direction based on featured, but manage image size consistently */
          flex-direction: ${featured ? "column-reverse" : "row"};
          align-items: stretch;
        }

        .post-card-text {
          padding: 1.5rem;
          flex: 1;
          display: flex; /* Added flex */
          flex-direction: column; /* Added flex direction */
          justify-content: space-between; /* Added space between */
        }

        .post-card-meta {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .post-card-tags {
          display: flex;
          flex-wrap: wrap;
          margin-left: 0.5rem;
        }

        .post-card-tag {
          background-color: var(--color-tag-bg);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          margin-left: 0.25rem;
          font-size: 0.75rem;
        }

        .post-card-title {
          margin: 0 0 0.75rem; /* Adjusted margin */
          font-size: ${featured ? "1.6rem" : "1.35rem"};
          line-height: 1.3;
          color: var(--color-text);
          flex-grow: 1; /* Allow title to grow */
        }

        /* Removed description styles */

        .post-card-read-more {
          color: var(--color-primary);
          font-weight: 500;
          font-size: 0.9rem;
          margin-top: auto; /* Push read more to bottom */
        }

        .post-card-image-container {
          /* Use flex-basis for non-featured row layout */
          flex: ${featured ? "none" : "0 0 40%"};
          position: relative;
          overflow: hidden;
          /* Remove fixed heights, let aspect-ratio control it */
        }

        .post-card-image-wrapper {
          /* Use aspect-ratio for consistent proportions */
          aspect-ratio: 16 / 9;
          width: 100%;
          /* Remove absolute positioning, let it flow naturally */
          overflow: hidden;
          position: relative; /* Keep relative for potential overlays */
        }

        .post-card-image {
          /* Ensure image covers the wrapper */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
        }

        .post-card:hover .post-card-image {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .post-card-content {
            /* Always column-reverse on mobile */
            flex-direction: column-reverse;
          }

          .post-card-image-container {
            /* Reset flex basis for column layout */
            flex: none;
            width: 100%; /* Ensure full width in column */
            /* Remove fixed heights */
          }

          .post-card-title {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </div>
  );
}
