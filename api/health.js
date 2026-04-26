/**
 * Endpoint health check: GET /api/health
 *
 * Folosit pentru:
 * - Monitoring uptime
 * - Verificare deploy reușit
 * - Test conectivitate din app mobile
 */

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).json({
    status: 'ok',
    service: 'numerolog-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      'POST /api/chart': 'Calculate natal chart',
      'GET /api/health': 'This endpoint',
      'GET /api/cities?q=...': 'Search Romanian cities by name',
    },
  });
}
