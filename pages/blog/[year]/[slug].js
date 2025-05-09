import { useRouter } from "next/router";
import ErrorPage from "next/error";
import BlogPostLayout from "../../../layouts/BlogPostLayout";
import { getPostBySlug, getAllPosts } from "../../../lib/posts";
import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import { MDXRemote } from "next-mdx-remote";

// Custom components for MDX rendering
const components = {};

export default function BlogPost({ post, rawContent, frontMatter }) {
  const router = useRouter();

  // Handle loading state during fallback
  if (router.isFallback) {
    return (
      <MainLayout>
        <div className="loading">
          <p>Loading post...</p>
        </div>
        <style jsx>{`
          .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50vh;
            font-size: 1.2rem;
          }
        `}</style>
      </MainLayout>
    );
  }

  // If we have post data with serialized MDX source
  if (post?.mdxSource) {
    return (
      <BlogPostLayout
        title={post.frontMatter.title}
        description={post.frontMatter.description}
        date={post.frontMatter.date}
        tags={post.frontMatter.tags}
        image={post.frontMatter.image}
      >
        <MDXRemote {...post.mdxSource} components={components} />
      </BlogPostLayout>
    );
  }

  // Fallback to raw content if MDX serialization failed
  if (post?.rawContent || rawContent) {
    const content = post?.rawContent || rawContent;
    const meta = post?.frontMatter || frontMatter || {};

    return (
      <MainLayout
        title={meta.title || "Blog Post"}
        description={meta.description || ""}
      >
        <article className="blog-post">
          <header>
            <h1>{meta.title}</h1>
            {meta.date && <div className="post-date">{meta.date}</div>}
            {meta.tags && meta.tags.length > 0 && (
              <div className="post-tags">
                {meta.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {meta.image && (
            <div className="featured-image">
              <img src={meta.image} alt={meta.title || "Featured image"} />
            </div>
          )}

          <div className="content markdown-content">
            {content &&
              content
                .split("\n")
                .map((paragraph, i) =>
                  paragraph.trim() ? <p key={i}>{paragraph}</p> : null
                )}
          </div>
        </article>

        <style jsx>{`
          .blog-post {
            max-width: var(--content-width);
            margin: 0 auto;
            padding: 2rem 1rem;
          }

          header {
            margin-bottom: 2rem;
          }

          h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }

          .post-date {
            color: var(--color-text-secondary);
            margin-bottom: 1rem;
          }

          .post-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .tag {
            background: var(--color-bg-secondary);
            color: var(--color-text-secondary);
            padding: 0.25rem 0.75rem;
            border-radius: 2rem;
            font-size: 0.9rem;
          }

          .featured-image {
            margin-bottom: 2rem;
            border-radius: 8px;
            overflow: hidden;
          }

          .featured-image img {
            width: 100%;
            height: auto;
          }

          .content {
            font-size: 1.1rem;
            line-height: 1.6;
          }
        `}</style>
      </MainLayout>
    );
  }

  // No content available
  return <ErrorPage statusCode={404} />;
}

export async function getStaticProps({ params }) {
  try {
    console.log(`Getting post: year=${params.year}, slug=${params.slug}`);

    const post = await getPostBySlug(params.year, params.slug);

    if (!post) {
      console.error(`Post not found: ${params.year}/${params.slug}`);
      return { notFound: true };
    }

    // Make sure post data is fully serializable for Next.js
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        rawContent: null,
        frontMatter: null,
      },
      revalidate: 60, // Revalidate every minute during development
    };
  } catch (error) {
    console.error(
      `Error in getStaticProps for ${params.year}/${params.slug}:`,
      error
    );
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  const paths = posts.map((post) => ({
    params: {
      year: String(post.year),
      slug: String(post.id),
    },
  }));

  console.log(`Generated ${paths.length} static paths for posts`);

  return {
    paths,
    fallback: "blocking",
  };
}
