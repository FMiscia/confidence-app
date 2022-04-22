/** @type {import('next').NextConfig} */
const rewritesConfig = [
    {
        source: "/api/:path*",
        destination: "https://dev-api.confidence.org/v2/:path*",
    },
]

const nextConfig = {
    reactStrictMode: true,
    rewrites: async () => rewritesConfig,
}

module.exports = nextConfig
