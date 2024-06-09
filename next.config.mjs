/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
