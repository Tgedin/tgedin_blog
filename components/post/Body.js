import { MDXRemote } from 'next-mdx-remote';

export default function PostBody({ content }) {
  return (
    <div className="post-content">
      <MDXRemote {...content} />
    </div>
  );
}
