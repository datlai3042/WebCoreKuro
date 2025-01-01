const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**", // Cho phép tất cả domain
        },
      ],
    },
    reactStrictMode: false,
  };
export default nextConfig;
