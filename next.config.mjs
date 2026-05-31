/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: import.meta.dirname,
  },
  serverExternalPackages: ["better-auth", "@better-auth/kysely-adapter", "kysely"],
}

export default nextConfig
