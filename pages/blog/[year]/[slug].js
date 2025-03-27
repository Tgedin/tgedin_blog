import { useRouter } from 'next/router'
import Head from 'next/head'
import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import BlogPostLayout from '../../../layouts/BlogPostLayout';

export default function BlogPost({ post }) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return <BlogPostLayout post={post} />;
}

export async function getStaticProps({ params }) {
  const { year, slug } = params;
  const post = await getPostBySlug(year, slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  
  const paths = posts.map((post) => ({
    params: {
      year: post.year,
      slug: post.id, // Fix: use post.id instead of post.slug
    },
  }));
  
  return {
    paths,
    fallback: 'blocking',
  };
}
