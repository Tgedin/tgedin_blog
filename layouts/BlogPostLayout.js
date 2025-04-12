import { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import ReadingProgress from "../components/ReadingProgress";
import PostHeader from "../components/post/Header";
import PostBody from "../components/post/Body";
import PostContainer from "../components/post/Container";

// Function to estimate reading time
const calculateReadingTime = (content) => {
  // Assuming an average reading speed of 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export default function BlogPostLayout({ post }) {
  const { frontmatter, content, year, slug } = post;
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // Check if we have the required props
    if (!frontmatter || !content) {
      setError("Post content or frontmatter is missing");
      return;
    }

    // Calculate reading time
    if (content && content.compiledSource) {
      const time = calculateReadingTime(content.compiledSource);
      setReadingTime(time);
    }
  }, [frontmatter, content]);

  if (error) {
    return (
      <MainLayout title="Error" description="Error loading blog post">
        <div className="error-container">
          <h1>Error Loading Post</h1>
          <p>{error}</p>
          <div className="debug-info">
            <h2>Debug Information</h2>
            <pre>
              {JSON.stringify(
                {
                  year,
                  slug,
                  hasFrontmatter: !!frontmatter,
                  hasContent: !!content,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={frontmatter.title} description={frontmatter.description}>
      <ReadingProgress />

      <PostContainer>
        <PostHeader
          title={frontmatter.title}
          date={frontmatter.date}
          tags={frontmatter.tags}
          readingTime={readingTime}
        />
        <PostBody content={content} />
      </PostContainer>

      <style jsx>{`
        /* Add custom styles to ensure headers don't stick */
        :global(.post-header) {
          position: static !important;
          z-index: 1;
        }
      `}</style>
    </MainLayout>
  );
}
