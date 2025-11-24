/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // If you use environment variables exposed to the browser, prefix with NEXT_PUBLIC_
  env: {
    // Example: expose BOT_FID to client if you need it (optional)
    NEXT_PUBLIC_BOT_FID: process.env.BOT_FID || "",
  },
  api: {
    bodyParser: {
      // Webhook endpoint may need raw body (for signature verification)
      sizeLimit: '1mb',
    },
  },
  // If you deploy on Vercel and use rewrites/proxies etc, you can add here
  // rewrites: async () => [
  //   { source: '/api/webhook', destination: '/api/webhook' },
  // ],
};

module.exports = nextConfig;
