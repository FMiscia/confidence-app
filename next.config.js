/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV !== "production"
const rewritesConfig = isDevelopment
    ? [
          {
              source: "/api/:path*",
              destination: "https://dev-api.confidence.org/v2/:path*",
          },
      ]
    : []

const nextConfig = {
    reactStrictMode: true,
    rewrites: async() => rewritesConfig
}

module.exports = nextConfig
