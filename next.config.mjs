/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //  domains: ["img.freepik.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
