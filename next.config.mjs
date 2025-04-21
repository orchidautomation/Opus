/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**', // Allow any path under this hostname
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
        port: '',
        pathname: '/**', // Allow any path under this hostname
      },
      // Add any other domains you might need here in the future
    ],
  },
  // You can add other Next.js configurations here if needed
};

export default nextConfig;
