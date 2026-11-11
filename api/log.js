export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1568460908886364362/pD_ue9r-hYvntxdg80KmtIZ6lQFHRQL_ke9_NkbAl2QJweaaIco1QKiCt5jcS0SrXBDK";

  try {
    // Ensure body payload is safely converted to string
    const payloadString = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payloadString
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error("Discord rejected request:", errorText);
      return res.status(500).json({ error: errorText });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Proxy execution error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
