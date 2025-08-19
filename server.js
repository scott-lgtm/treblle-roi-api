// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { compute, defaults } = require('./roi-formulas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: true })); // tighten later to your domains
app.use('/api/', rateLimit({ windowMs: 60_000, max: 60 })); // 60/min per IP

// Simple API-key gate (optional but recommended)
const API_KEY = process.env.ROI_API_KEY || null;
app.use('/api', (req,res,next) => {
  if (API_KEY && req.get('x-api-key') !== API_KEY) {
    return res.status(401).json({ ok:false, error:'unauthorized' });
  }
  next();
});

// Serve your existing page (unchanged)
app.use(express.static(__dirname));
app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'index.html')));

// Health
app.get('/api/health', (req,res)=> res.json({ ok:true, defaults: defaults() }));

// Deterministic calculator API (uses identical formulas)
app.post('/api/calc', (req,res) => {
  try {
    const result = compute(req.body || {});
    res.json({ ok:true, ...result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, error:String(e) });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
