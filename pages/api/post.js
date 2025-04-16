import { getPostBySlug } from "../../lib/posts";

export default async function handler(req, res) {
  const { year, slug } = req.query;

  if (!year || !slug) {
    return res.status(400).json({ error: "Missing year or slug parameter" });
  }

  try {
    const post = await getPostBySlug(year, slug);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Return the post data
    return res.status(200).json({ post });
  } catch (error) {
    console.error(`API error fetching post ${year}/${slug}:`, error);
    return res.status(500).json({ error: "Failed to fetch post" });
  }
}
