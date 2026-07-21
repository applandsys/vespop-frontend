
import ReactPixel from "react-facebook-pixel";
import config from "@/config";

let isInitialized = false;
let pixelId;

export async function initFacebookPixel() {
    if (isInitialized) return;

    try {
        const res = await fetch(
            `${config.apiBaseUrl}/api-integration/fb-pixel/fb-id`,
            { cache: "no-store" }
        );

        if (!res.ok) return;

        const data = await res.json();

        if (!data?.pixelId) return;

        pixelId = data.pixelId;

        ReactPixel.init(pixelId, {}, { debug: false });
        ReactPixel.pageView();

        isInitialized = true;
        console.log("✅ Facebook Pixel initialized:", pixelId);
    } catch (error) {
        console.error("❌ FB Pixel init failed", error);
    }
}

export function fbEvent(event, data ={}) {
    if (!isInitialized) {
        console.warn("FB Pixel not initialized yet");
        return;
    }

    ReactPixel.track(event, data);
}