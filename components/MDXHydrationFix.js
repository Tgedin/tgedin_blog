import { useEffect, useState } from "react";

export default function MDXHydrationFix({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During initial SSR, render the children normally.
  // After hydration, the key change will force a re-render to avoid hydration mismatch.
  return <div key={isClient ? "client" : "server"}>{children}</div>;
}
