import { getAllPosts } from "../lib/posts";

const SITE_URL = "https://tgedin.dev";

function generateRSSFeed(posts) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>From Bricks to Bytes - Théo Gédin's Blog</title>
      <link>${SITE_URL}</link>
      <description>Thoughts and insights on data science, civil engineering, and the journey between them.</description>
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
      
      ${posts
        .map((post) => {
          return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${SITE_URL}/blog/${post.year}/${post.id}</link>
          <guid isPermaLink="true">${SITE_URL}/blog/${post.year}/${
            post.id
          }</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>
            <![CDATA[${post.description || ""}]]>
          </description>
          ${
            post.tags &&
            post.tags.map((tag) => `<category>${tag}</category>`).join("")
          }
        </item>
      `;
        })
        .join("")}
    </channel>
  </rss>`;
}

export default function RSS() {
  // Empty component as this is just to generate XML
  return null;
}

export async function getServerSideProps({ res }) {
  const posts = getAllPosts();

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate the XML sitemap
  const rss = generateRSSFeed(sortedPosts);

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return {
    props: {},
  };
}
