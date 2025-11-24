// pages/api/post.js
import { getNeynarClient } from "../../lib/neynarClient";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST");

  const { text, replyToCastId } = req.body || {};

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "text required" });
  }

  try {
    const client = getNeynarClient();

    // Example using Neynar SDK: method names may differ depending on SDK version.
    // Common pattern: client.casts.create(...) or client.casts.createCast(...)
    // We'll try a safe generic call via the client request method if available.
    // Replace with exact SDK call from docs if needed.

    // >>> Replace the snippet below with the SDK's publish/post method per docs:
    const body = {
      text,
      replyTo: replyToCastId || null
    };

    // If SDK exposes `casts.create`:
    if (client.casts && typeof client.casts.create === "function") {
      const resp = await client.casts.create(body);
      return res.status(200).json({ ok: true, resp });
    }

    // fallback: some SDKs use client.createCast
    if (client.createCast && typeof client.createCast === "function") {
      const resp = await client.createCast(body);
      return res.status(200).json({ ok: true, resp });
    }

    // If neither method exists, notify user to adapt to their SDK version
    return res.status(500).json({ error: "SDK method not found — check Neynar SDK docs" });

  } catch (err) {
    console.error("post error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
