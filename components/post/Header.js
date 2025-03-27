import { formatDate } from '../../lib/date';

export default function PostHeader({ title, date, tags, readingTime }) {
  return (
    <header className="post-header">
      {tags && tags.length > 0 && (
        <div className="post-tags">
          {tags.map(tag => (
            <span key={tag} className="post-tag">{tag}</span>
          ))}
        </div>
      )}
      <h1>{title}</h1>
      <div className="post-meta">
        <time dateTime={date}>
          {formatDate(date)}
        </time>
        {readingTime > 0 && (
          <span className="reading-time"> · {readingTime} min read</span>
        )}
      </div>
    </header>
  );
}
