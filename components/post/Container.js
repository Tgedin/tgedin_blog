export default function PostContainer({ children }) {
  return (
    <div className="blog-container">
      <article className="blog-post">
        {children}
      </article>
    </div>
  );
}
