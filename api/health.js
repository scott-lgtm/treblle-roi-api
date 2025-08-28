const { defaults } = require('../roi-formulas');

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

  // Only allow GET requests for health
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    res.status(200).json({ 
      ok: true, 
      defaults: defaults(),
      timestamp: new Date().toISOString(),
      service: 'treblle-roi-api'
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};
