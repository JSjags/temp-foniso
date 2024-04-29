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
      {
        protocol: "https",
        hostname: "foniso-assets.nyc3.cdn.digitaloceanspaces.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "foniso-assets.nyc3.digitaloceanspaces.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "url%20path",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn2.f-cdn.com",
        port: "",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/random/**",
      }, //
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
