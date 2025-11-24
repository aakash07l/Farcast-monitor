// pages/api/webhook.js
import { buffer } from "micro";
import { getNeynarClient } from "../../lib/neynarClient";

export const config = {
  api: {
    bodyParser: false, // we'll parse raw body for signature verification if needed
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  const raw = await buffer(req);
  const text = raw.toString();

  // TODO: verify signature from headers (recommended). Neynar docs show how to verify webhooks.
  // For now we trust it in this minimal example (not safe for production).
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (e) {
    return res.status(400).json({ error: "invalid json" });
  }

  // Example payload shape: { type: "notification", notification: { type: "...", cast: {...} } }
  // Adjust according to Neynar webhook schema.
  try {
    // Basic logic: when a mention arrives, respond or queue it.
    if (payload.notification?.type === "mention" || payload.type === "mention") {
      const cast = payload.notification?.cast || payload.cast;
      const fid = cast?.fid || payload.fid;
      const text = cast?.text || "";

      // Example: simply log & (optionally) auto-reply by calling our post endpoint logic
      console.log("Mention from fid:", fid, "text:", text);

      // Optionally call internal posting logic:
      // import post logic directly (avoid network call)
      // Example: auto-reply "gm" to mentions containing "gm"
      if (text?.toLowerCase().includes("gm")) {
        // simple reply body
        const replyText = `gm! @${fid} — automated reply from FarcasterMonitor_bot`;
        // call Neynar client to create cast (see pages/api/post.js for pattern)
        // Here we simply enqueue or directly post (below is simplified)
        // NOTE: keep posting rate-limited to avoid spam.
      }
    }

    // Acknowledge quickly
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("webhook handler error:", err);
    res.status(500).json({ error: "handler error" });
  }
}
