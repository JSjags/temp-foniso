/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.f-cdn.com",
        port: "",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        port: "",
      },
    ],
  },
  //   output: "export",
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "content-type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
