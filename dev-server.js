/**
 * Dev server pentru testare locală.
 * Pe Vercel se folosește handler-ele din /api direct.
 *
 * Rulează: npm run dev
 * Test: curl -X POST http://localhost:3001/api/chart -H 'Content-Type: application/json' \
 *         -d '{"year":1990,"month":6,"day":15,"hour":14,"minute":30,"latitude":44.43,"longitude":26.10}'
 */

import { createServer } from 'http';
import { URL } from 'url';
import chartHandler from './api/chart.js';
import healthHandler from './api/health.js';
import citiesHandler from './api/cities.js';
import transitsHandler from './api/transits.js';

const PORT = 3001;

const routes = {
  '/api/chart': chartHandler,
  '/api/health': healthHandler,
  '/api/cities': citiesHandler,
  '/api/transits': transitsHandler,
};

function createMockReq(req, parsedUrl, body) {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body,
    query: Object.fromEntries(parsedUrl.searchParams),
  };
}

function createMockRes(res) {
  return {
    setHeader: (k, v) => res.setHeader(k, v),
    status: (code) => {
      res.statusCode = code;
      return {
        json: (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        },
        end: () => res.end(),
      };
    },
  };
}

const server = createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const route = parsedUrl.pathname;

  const handler = routes[route];
  if (!handler) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Route not found', route }));
    return;
  }

  // Parse body for POST
  let body = {};
  if (req.method === 'POST') {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString();
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch (e) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      return;
    }
  }

  const mockReq = createMockReq(req, parsedUrl, body);
  const mockRes = createMockRes(res);

  try {
    await handler(mockReq, mockRes);
  } catch (err) {
    console.error('Handler error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`✓ Numerolog API dev server: http://localhost:${PORT}`);
  console.log('\nEndpoints:');
  for (const route of Object.keys(routes)) {
    console.log(`  http://localhost:${PORT}${route}`);
  }
  console.log('\nTest:');
  console.log(`  curl http://localhost:${PORT}/api/health`);
});
