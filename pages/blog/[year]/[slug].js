import { useRouter } from "next/router";
import ErrorPage from "next/error";
import BlogPostLayout from "../../../layouts/BlogPostLayout";
import { getPostBySlug, getAllPosts } from "../../../lib/posts";
import React, { useState, useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";

// Define problematic posts
const PROBLEMATIC_POSTS = [
  "beyond-abstractions",
  "beyond-reality-ai-worlds-and-the-paradox-of-authentic-experience",
  "ai-and-meritocracy",
];

// Simplify components to bare minimum
const components = {};

export default function BlogPost({ post, rawContent, frontMatter }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // If we have raw content but the post failed to process (problematic posts)
  if (!post && (rawContent || frontMatter)) {
    return (
      <MainLayout
        title={frontMatter?.title || "Blog Post"}
        description={frontMatter?.description || ""}
      >
        <div className="blog-container">
          <article className="blog-post">
            <header className="post-header">
              {frontMatter?.tags && frontMatter.tags.length > 0 && (
                <div className="post-tags">
                  {frontMatter.tags.map((tag) => (
                    <span key={tag} className="post-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1>{frontMatter?.title}</h1>
              <div className="post-meta">
                {frontMatter?.date && (
                  <time dateTime={frontMatter.date}>
                    {new Date(frontMatter.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
            </header>

            {frontMatter?.image && (
              <div className="featured-image-container">
                <img
                  src={frontMatter.image}
                  alt={frontMatter.title || "Featured image"}
                  className="featured-image"
                />
              </div>
            )}

            <div
              className="post-content markdown-content"
              dangerouslySetInnerHTML={{
                __html: processRawContent(rawContent),
              }}
            />
          </article>
        </div>

        <style jsx>{`
          .blog-container {
            max-width: var(--content-width);
            margin: 0 auto;
            padding: 1rem;
          }

          .featured-image-container {
            margin: 2rem 0;
          }

          .featured-image {
            width: 100%;
            border-radius: 8px;
            max-height: 500px;
            object-fit: cover;
          }

          .markdown-content {
            line-height: 1.8;
            font-size: 1.1rem;
          }

          .markdown-content h2 {
            margin-top: 2rem;
          }

          .markdown-content p {
            margin: 1.5rem 0;
          }
        `}</style>
      </MainLayout>
    );
  }

  // If no post data at all
  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  // Regular rendering for non-problematic posts
  return <BlogPostLayout post={post} components={components} />;
}

// Simple function to process raw markdown content with basic formatting
function processRawContent(content) {
  if (!content) return "";

  // Remove frontmatter section
  let processedContent = content.replace(/^---[\s\S]*?---/, "");

  // Convert markdown headings
  processedContent = processedContent.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  processedContent = processedContent.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Convert markdown images
  processedContent = processedContent.replace(
    /!\[(.*?)\]\((.*?)\)/gim,
    '<img src="$2" alt="$1" class="content-image" />'
  );

  // Convert markdown links
  processedContent = processedContent.replace(
    /\[(.*?)\]\((.*?)\)/gim,
    '<a href="$2">$1</a>'
  );

  // Convert paragraphs (simplistic approach - assumes paragraphs are separated by blank lines)
  processedContent = processedContent.replace(
    /^(?!<[h|i|u]|$)(.+)$/gim,
    "<p>$1</p>"
  );

  return processedContent;
}

export async function getStaticProps({ params }) {
  try {
    // For problematic posts, get raw content instead of MDX processing
    if (PROBLEMATIC_POSTS.includes(params.slug)) {
      const { rawContent, frontMatter } = await getPostBySlug(
        params.year,
        params.slug,
        true
      );

      return {
        props: {
          post: null,
          rawContent,
          frontMatter,
        },
        revalidate: 3600, // Revalidate every hour
      };
    }

    const post = await getPostBySlug(params.year, params.slug);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
      revalidate: 3600,
    };
  } catch (error) {
    console.error(
      `Error generating page for ${params.year}/${params.slug}:`,
      error
    );
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const posts = getAllPosts();

    // Only include non-problematic posts for static generation
    const paths = posts
      .filter((post) => !PROBLEMATIC_POSTS.includes(post.id))
      .map((post) => ({
        params: {
          year: post.year,
          slug: post.id,
        },
      }));

    console.log(
      `Generating static paths for ${paths.length} out of ${posts.length} posts`
    );

    return {
      paths,
      // Use true to completely skip SSR for paths not included above
      fallback: true,
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}
