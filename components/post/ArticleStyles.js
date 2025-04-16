import { useEffect, useState } from "react";

export default function ArticleStyles({ slug, children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`article-styled-${slug}`}>
      {children}
      {isClient && (
        <style jsx global>{`
          /* Article-specific styles will be here */
          /* We render these only client-side to avoid hydration issues */
          .article-styled-${slug} img:first-of-type {
            /* These styles can be customized per article */
            border-radius: 12px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          }
        `}</style>
      )}
    </div>
  );
}
