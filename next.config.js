const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['localhost','vespop.com','api.vespop.com','94064959ff2f2e1cdff06054b1607835.r2.cloudflarestorage.com','cloudflarestorage.com','94064959ff2f2e1cdff06054b1607835.r2.cloudflarestorage.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-c5509f5d73d4427f894c7c087f54821c.r2.dev',
                pathname: '/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

module.exports = nextConfig;
