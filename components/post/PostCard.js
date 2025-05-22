import Link from "next/link";
import { formatDate } from "../../lib/date";
import Tag from "../Tag";
import Image from "next/image";

// Generic placeholder images for posts without a specific mapping
const DEFAULT_FEATURED_IMAGES = [
  "/the-mountains-7514392_1280.jpg",
  "/placeholder-image-1.jpg",
  "/placeholder-image-2.jpg",
];

export default function PostCard({ post, featured = false }) {
  // Redirect to Substack if this component is still used
  const postUrl = "https://theogedin.substack.com/";

  // Use a default image
  const imageUrl = DEFAULT_FEATURED_IMAGES[0];

  // Simplified tags
  const tags = ["Substack"];

  return (
    <div className={`post-card ${featured ? "featured" : ""}`}>
      <a href={postUrl} target="_blank" rel="noopener noreferrer">
        <div className="post-card-content">
          <div className="post-card-image-container">
            <div className="post-card-image-wrapper">
              <Image
                src={imageUrl}
                alt="Articles have moved to Substack"
                width={featured ? 1280 : 640}
                height={featured ? 720 : 360}
                className="post-card-image"
                priority={featured}
              />
            </div>
          </div>
          <div className="post-card-text">
            <h2 className="post-card-title">Articles Have Moved to Substack</h2>
            <div className="post-card-tags">
              {tags.map((tag) => (
                <Tag key={tag} size="small">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </a>
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
          position: relative;
        }
        :global(.post-card-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
          display: block;
        }
        .post-card:hover :global(.post-card-image) {
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
