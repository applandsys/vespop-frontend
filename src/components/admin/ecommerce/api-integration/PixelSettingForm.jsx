"use client";

import { useEffect, useState } from "react";
import config from "@/config";

export default function PixelSettingForm() {
  const [pixelId, setPixelId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [testEventId, setTestEvenId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/api-integration/fb-pixel/fb-id`)
      .then((res) => res.json())
      .then((data) => {
        setPixelId(data.pixelId);
        setAccessToken(data.metaAccesstoken);
        setTestEvenId(data.testEventId);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    await fetch(`${config.apiBaseUrl}/api-integration/fb-pixel/update/fb-id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        FB_PIXEL_ID: pixelId,
        FB_ACCESS_TOKEN: accessToken,
        TEST_EVENT_ID: testEventId,
      }),
    });

    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Facebook Pixel Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Facebook Pixel ID
          </label>
          <input
            type="text"
            value={pixelId}
            onChange={(e) => setPixelId(e.target.value)}
            placeholder="xxxxxxxxxxxx"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Facebook Access Token
          </label>
          <input
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="EAABxxxxxxxx"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Test Event Id
          </label>
          <input
              type="text"
              value={testEventId}
              onChange={(e) => setTestEvenId(e.target.value)}
              placeholder="EAABxxxxxxxx"
              className="w-full border px-3 py-2 rounded"
              required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>

        {success && (
          <p className="text-green-600 text-sm">
            Settings saved successfully ✅
          </p>
        )}
      </form>
    </div>
  );
}