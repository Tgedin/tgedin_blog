import React from "react";
import Link from "next/link";

export default function Tag({ children, linkable = false, size = "normal" }) {
  const content = (
    <span className={`tag tag-${size}`}>
      {children}
      <style jsx>{`
        .tag {
          display: inline-block;
          background-color: var(--color-tag-bg, #e5dfd2);
          color: var(--color-primary);
          border-radius: 4px;
          font-family: var(--font-mono);
          transition: background-color 0.2s ease;
          font-weight: 500;
          white-space: nowrap;
        }

        .tag-small {
          font-size: 0.8rem;
          padding: 0.2rem 0.6rem;
        }

        .tag-normal {
          font-size: 0.9rem;
          padding: 0.3rem 0.7rem;
        }

        /* Dark mode adjustment */
        [data-theme="dark"] .tag {
          background-color: rgba(122, 182, 255, 0.1);
        }
      `}</style>
    </span>
  );

  if (linkable) {
    return (
      <Link href={`/blog/tag/${children.toLowerCase()}`} passHref>
        {content}
      </Link>
    );
  }

  return content;
}
