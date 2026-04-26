/**
 * Endpoint principal: POST /api/chart
 *
 * Calculează chart-ul natal pentru o naștere specifică.
 *
 * Input (JSON body):
 *   {
 *     "year": 1990, "month": 6, "day": 15,
 *     "hour": 14, "minute": 30,
 *     "latitude": 44.43, "longitude": 26.10,
 *     "timezone": "Europe/Bucharest"  // optional, pentru afișaj — calculul e în UTC
 *   }
 *
 * Note: ora trebuie să fie deja convertită la UTC. Conversia local→UTC e responsabilitatea clientului.
 *       (Mai simplu pentru server — TZ database e mare și greu de menținut.)
 */

import { z } from 'zod';
import { calculateChart } from '../lib/astrology.js';

const ChartInputSchema = z.object({
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timezone: z.string().optional(),
});

// CORS headers — permitem app-ul mobil + dev
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Set CORS headers pentru toate răspunsurile
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    res.setHeader(k, v);
  }

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Parse + validate input
    const parsed = ChartInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Invalid input',
        details: parsed.error.issues,
      });
    }

    const input = parsed.data;
    const chart = calculateChart(input);

    return res.status(200).json({
      success: true,
      chart,
    });
  } catch (err) {
    console.error('Chart calculation error:', err);
    return res.status(500).json({
      error: 'Internal calculation error',
      message: err.message,
    });
  }
}
