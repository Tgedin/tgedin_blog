import { useRouter } from "next/router";
import ErrorPage from "next/error";
import BlogPostLayout from "../../../layouts/BlogPostLayout";
import { getPostBySlug, getAllPosts } from "../../../lib/posts";
import React from "react";

// Simplify components to bare minimum
const components = {};

export default function BlogPost({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  return <BlogPostLayout post={post} components={components} />;
}

export async function getStaticProps({ params }) {
  try {
    const post = await getPostBySlug(params.year, params.slug);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
      // Add revalidation to improve performance
      revalidate: 60 * 60, // Revalidate every hour
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

    // Filter out problematic posts that cause JSX runtime errors
    const problemPosts = [
      "beyond-abstractions",
      "beyond-reality-ai-worlds-and-the-paradox-of-authentic-experience",
      "ai-and-meritocracy",
    ];

    // Only include posts that aren't in the problem list
    const paths = posts
      .filter((post) => !problemPosts.includes(post.id))
      .map((post) => ({
        params: {
          year: post.year,
          slug: post.id,
        },
      }));

    console.log(
      `Generating static paths for ${paths.length} posts out of ${posts.length} total`
    );

    return {
      paths,
      // Change to blocking fallback - will render problematic pages on-demand instead of at build time
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}
