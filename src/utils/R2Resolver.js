export const getImageUrl = (url) => {
    if (!url) return "/placeholder.png";

    return url.replace(
        "https://240588ae832d6c9bd3565e426bb7e224.r2.cloudflarestorage.com",
        "https://pub-e9c628df12cb482382bd87102a6f71f6.r2.dev"
    );
};