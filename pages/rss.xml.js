// Since articles have been moved to Substack, the RSS feed should redirect there

export default function RSS() {
  // Empty component as this is just to generate XML
  return null;
}

export async function getServerSideProps({ res }) {
  // Generate a simple RSS feed that redirects to Substack
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>From Bricks to Bytes - Théo Gédin's Blog</title>
      <link>https://tgedin.dev</link>
      <description>Articles have moved to Substack. Please follow me there for the latest updates.</description>
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="https://tgedin.dev/rss.xml" rel="self" type="application/rss+xml" />
      
      <item>
        <title>Articles Have Moved to Substack</title>
        <link>https://theogedin.substack.com/</link>
        <guid isPermaLink="true">https://theogedin.substack.com/</guid>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <description>
          <![CDATA[All articles have moved to my Substack newsletter. Please subscribe there to continue following my content.]]>
        </description>
      </item>
    </channel>
  </rss>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return {
    props: {},
  };
}
