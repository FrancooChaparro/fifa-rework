/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: false,
        minimumCacheTTL: 157680000,
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
              protocol: "https",
              hostname: "w2sgtlkzlwjdaso7.public.blob.vercel-storage.com",
              port: "",
              pathname: "/**", // Asegura que se permita cualquier imagen de este dominio
            },
          ],
      },
  async headers() {
    return [
      {
        source: "/images/:path*", // Aplica a todas las imágenes en /public/images/
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 año en caché
          },
        ],
      },
    ];
  },
};

export default nextConfig;
