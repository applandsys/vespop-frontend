export const getImageUrl = (url) => {
    if (!url) return "/placeholder.png";

    return url.replace(
        "https://94064959ff2f2e1cdff06054b1607835.r2.cloudflarestorage.com",
        "https://pub-c5509f5d73d4427f894c7c087f54821c.r2.dev"
    );
};