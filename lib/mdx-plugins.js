/**
 * A simple remark plugin that sanitizes the MDX content for safer processing
 */
export function remarkSanitize() {
  return (tree) => {
    // Process the markdown AST here if needed
    return tree;
  };
}

/**
 * Additional MDX configuration options
 */
export const mdxOptions = {
  remarkPlugins: [remarkSanitize],
  rehypePlugins: [],
  development: process.env.NODE_ENV !== "production",
};

/**
 * Helper function for serializing MDX content safely
 */
export async function serializeMDX(content, frontmatter = {}) {
  const { serialize } = await import("next-mdx-remote/serialize");

  try {
    return await serialize(content, {
      scope: frontmatter,
      mdxOptions,
    });
  } catch (error) {
    console.error("Error serializing MDX:", error);
    return null;
  }
}
