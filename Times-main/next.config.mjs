/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: true,
        serverComponentsExternalPackages: ["@prisma/client", "bcrypt"]
    },

};

export default nextConfig;
