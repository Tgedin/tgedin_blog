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
  let imageUrl;
  if (FEATURED_IMAGES[post.id]) {
    imageUrl = FEATURED_IMAGES[post.id];
  } else {
    const charCode =
      (post.id.charCodeAt(0) || 0) % DEFAULT_FEATURED_IMAGES.length;
    imageUrl = DEFAULT_FEATURED_IMAGES[charCode];
  }

  // Add default tags for specific articles if only 'thoughts' is present
  let tags = post.tags || [];
  if (tags.length === 1 && tags[0].toLowerCase() === "thoughts") {
    if (
      post.id ===
      "beyond-reality-ai-worlds-and-the-paradox-of-authentic-experience"
    ) {
      tags = ["AI", "Philosophy", "Thoughts"];
    } else if (post.id === "beyond-abstractions") {
      tags = ["Civil Engineering", "Data Science", "Thoughts"];
    } else if (post.id === "ai-and-meritocracy") {
      tags = [
        "AI",
        "Meritocracy",
        "Openness",
        "Civil Engineering",
        "Data Science",
        "Thoughts",
      ];
    }
  }

  return (
    <div className={`post-card ${featured ? "featured" : ""}`}>
      <Link href={postUrl}>
        <div className="post-card-content">
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
          <div className="post-card-text">
            <h2 className="post-card-title">{post.title}</h2>
            <div className="post-card-tags">
              {tags.map((tag) => (
                <span key={tag} className="post-card-tag">
                  {tag}
                </span>
              ))}
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
          transition: transform 0.3s ease, box-shadow 0.3s ease,
            border-color 0.2s;
          margin-bottom: 2rem;
          cursor: pointer;
        }
        .post-card:hover {
          transform: translateY(-4px) scale(1.015);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          border-color: var(--color-primary);
        }
        .post-card-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .post-card-text {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .post-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .post-card-tag {
          background-color: var(--color-tag-bg, #f0e6d6);
          color: var(--color-primary);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .post-card-title {
          margin: 0;
          font-size: 1.3rem;
          color: var(--color-headings);
          font-weight: 600;
        }
        .post-card-image-container {
          width: 100%;
        }
        .post-card-image-wrapper {
          aspect-ratio: 16 / 9;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .post-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
          display: block;
        }
        .post-card:hover .post-card-image {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .post-card-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
