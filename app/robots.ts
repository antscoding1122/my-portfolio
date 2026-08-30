import type { MetadataRoute } from "next";

// Serve a robots.txt that tells every crawler to stay away.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
