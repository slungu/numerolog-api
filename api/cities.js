/**
 * Endpoint search orașe: GET /api/cities?q=<query>
 *
 * Folosit de app pentru place picker autocomplete.
 *
 * Ex: GET /api/cities?q=ones → returnează cele 2 orașe Onești (Bacău și Vrancea)
 */

import { searchCities } from '../data/cities-ro.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const query = req.query?.q || '';

  if (!query || query.length < 2) {
    return res.status(400).json({
      error: 'Query parameter "q" required (min 2 chars)',
      example: '/api/cities?q=ones',
    });
  }

  const results = searchCities(query);

  return res.status(200).json({
    query,
    count: results.length,
    results,
  });
}
