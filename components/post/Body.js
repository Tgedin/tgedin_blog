import { MDXRemote } from "next-mdx-remote";
import { useEffect, useState } from "react";

export default function PostBody({ content, components }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Debug logging
  console.log("PostBody received content:", {
    hasContent: !!content,
    contentType: content ? typeof content : "undefined",
    isCompiled: content && content.compiledSource ? true : false,
    compiledLength:
      content && content.compiledSource ? content.compiledSource.length : 0,
  });

  if (!content) {
    return (
      <div className="error-message">
        <h2>Error: No content to display</h2>
        <p>The blog post content could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="post-content">
      {isClient ? (
        <MDXRemote {...content} components={components} />
      ) : (
        <div>Loading content...</div>
      )}

      <style jsx>{`
        .post-content {
          width: 100%;
          max-width: 100%;
          margin: 2rem 0;
        }

        .error-message {
          padding: 1rem;
          border-left: 4px solid #f44336;
          background-color: #ffebee;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
