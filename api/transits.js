/**
 * Endpoint: GET /api/transits?date=YYYY-MM-DD
 *
 * Returnează poziția planetelor rapide (Soare, Lună, Mercur, Venus, Marte)
 * la o anumită dată. Folosit pentru context astrologic în mesaje zilnice.
 *
 * Dacă nu se specifică data, folosește azi.
 */

import { calculateTransits } from '../lib/astrology.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    // Parse parametrul date (YYYY-MM-DD) sau folosește azi
    const dateStr = req.query?.date;
    let year, month, day;

    if (dateStr) {
      const match = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      if (!match) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
      }
      year = parseInt(match[1], 10);
      month = parseInt(match[2], 10);
      day = parseInt(match[3], 10);
    } else {
      const now = new Date();
      year = now.getUTCFullYear();
      month = now.getUTCMonth() + 1;
      day = now.getUTCDate();
    }

    const result = calculateTransits({ year, month, day });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error('Transits error:', err);
    return res.status(500).json({
      error: 'Calculation error',
      message: err.message,
    });
  }
}
