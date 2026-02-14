// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost','bdhoms.com','backend.bdhoms.com'], // Allow images from localhost
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

module.exports = nextConfig;
