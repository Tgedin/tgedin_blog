import { useRouter } from "next/router";
import ErrorPage from "next/error";
import BlogPostLayout from "../../../layouts/BlogPostLayout";
import { getPostBySlug, getAllPosts } from "../../../lib/posts";
import React from "react";

// Define basic components to pass to MDXRemote
const components = {
  p: (props) => <p {...props} />,
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  h4: (props) => <h4 {...props} />,
  h5: (props) => <h5 {...props} />,
  h6: (props) => <h6 {...props} />,
  img: (props) => <img {...props} />,
  a: (props) => <a {...props} />,
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  blockquote: (props) => <blockquote {...props} />,
  code: (props) => <code {...props} />,
  pre: (props) => <pre {...props} />,
  strong: (props) => <strong {...props} />,
  em: (props) => <em {...props} />,
};

export default function BlogPost({ post }) {
  const router = useRouter();

  console.log("Post data in BlogPost:", post);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  return <BlogPostLayout post={post} components={components} />;
}

export async function getStaticProps({ params }) {
  console.log("Getting post with params:", params);

  try {
    const post = await getPostBySlug(params.year, params.slug);

    console.log(
      `Post data for ${params.slug}:`,
      post
        ? {
            id: post.id,
            hasContent: !!post.content || !!post.mdxSource,
            hasFrontMatter: !!post.frontMatter,
          }
        : "No post found"
    );

    if (!post) {
      console.error(
        `Post not found for slug: ${params.slug} in year: ${params.year}`
      );
      return { notFound: true };
    }

    return {
      props: { post },
      revalidate: 60, // Enable ISR with a 1-minute revalidation period
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const posts = getAllPosts();
    console.log(`Found ${posts.length} posts`);

    const paths = posts.map((post) => ({
      params: {
        year: post.year,
        slug: post.id,
      },
    }));

    return {
      paths,
      fallback: true, // Changed to true to handle posts that might be added later
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}
