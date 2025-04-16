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
  const post = await getPostBySlug(params.year, params.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  const paths = posts.map((post) => ({
    params: {
      year: post.year,
      slug: post.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
