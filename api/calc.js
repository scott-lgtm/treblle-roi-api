const { compute } = require('../roi-formulas');

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests for calc
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  // Optional API key authentication
  const API_KEY = process.env.ROI_API_KEY;
  if (API_KEY && req.headers['x-api-key'] !== API_KEY) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  // Rate limiting note: Vercel has built-in rate limiting, but you can add custom logic here if needed

  try {
    const result = compute(req.body || {});
    res.status(200).json({ ok: true, ...result });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ ok: false, error: String(error) });
  }
};
