import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  // Hide the Next.js dev tools indicator (bottom-left icon).
  devIndicators: false,

  // Security headers applied to every response.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents clickjacking by blocking the site from being framed.
          { key: "X-Frame-Options", value: "DENY" },
          // Legacy XSS filter (older browsers).
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Stops browsers from "sniffing" a different MIME type than declared.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limits how much referrer URL data leaks to other sites.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disables browser features the site doesn't need.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Forces HTTPS for 2 years, including subdomains.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Restricts which sources can load scripts/styles/images/etc.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js needs inline styles and 'unsafe-eval' in dev.
              "style-src 'self' 'unsafe-inline'",
              "script-src 'self' 'unsafe-inline'" +
                (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
              // Images are unrestricted so all external images/GIFs load.
              "img-src * data: blob:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
