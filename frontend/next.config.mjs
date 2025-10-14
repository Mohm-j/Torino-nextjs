/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: (() => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) return [];

        const { protocol, hostname, port } = new URL(baseUrl);
        return [
          {
            protocol: protocol.replace(":", ""),
            hostname,
            port: port || "",
            pathname: "/**",
          },
        ];
      } catch (err) {
        console.warn("Invalid NEXT_PUBLIC_BASE_URL in .env:", err.message);
        return [];
      }
    })(),
  },
};

export default nextConfig;
