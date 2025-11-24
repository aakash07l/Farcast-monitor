// lib/neynarClient.js
import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

let client = null;

export function getNeynarClient() {
  if (client) return client;
  const apiKey = process.env.NEYRAR_API_KEY || process.env.NEYNAR_API_KEY;
  if (!apiKey) throw new Error("NEY(N)AR API key missing in env");
  const config = new Configuration({ apiKey });
  client = new NeynarAPIClient(config);
  return client;
}
