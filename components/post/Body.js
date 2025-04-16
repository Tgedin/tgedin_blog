import { MDXRemote } from "next-mdx-remote";

export default function PostBody({ content, components }) {
  if (!content) {
    return <div className="error-message">Content unavailable</div>;
  }

  return (
    <div className="post-content">
      <MDXRemote {...content} components={components} />
    </div>
  );
}
