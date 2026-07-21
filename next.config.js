const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['localhost','softexpertzone.com','dbarib.softexpertzone.com','94064959ff2f2e1cdff06054b1607835.r2.cloudflarestorage.com','cloudflarestorage.com','240588ae832d6c9bd3565e426bb7e224.r2.cloudflarestorage.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-e9c628df12cb482382bd87102a6f71f6.r2.dev',
                pathname: '/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

module.exports = nextConfig;
