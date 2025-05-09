import { formatDate } from "../../lib/date";
import Tag from "../Tag";

export default function PostHeader({ title, date, tags, readingTime }) {
  return (
    <header className="post-header">
      <h1>{title}</h1>
      <div className="meta">
        {date && <div className="date">{formatDate(date)}</div>}

        {tags && tags.length > 0 && (
          <div className="tags">
            {tags.map((tag) => (
              <Tag key={tag} size="normal">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        {readingTime && (
          <div className="reading-time">{readingTime} min read</div>
        )}
      </div>

      <style jsx>{`
        .post-header {
          margin-bottom: 3rem;
          text-align: center;
          position: static !important; /* Force static positioning */
          z-index: 1;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          color: var(--color-secondary);
          font-size: 0.9rem;
        }

        .date,
        .reading-time {
          padding: 0.3rem 0;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          .meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </header>
  );
}
