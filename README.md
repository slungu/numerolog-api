# Numerolog API

Backend pentru calcule astrologice — folosit de aplicația mobilă Numerolog.

## Stack

- **Runtime**: Node.js 20+ (ES Modules)
- **Deployment**: Vercel Serverless Functions (free tier)
- **Astronomy**: [astronomy-engine](https://github.com/cosinekitty/astronomy) (pure JS, MIT)
- **Validation**: zod

## Endpoints

### `GET /api/health`
Verificare uptime. Returnează versiune + lista endpoint-urilor.

### `POST /api/chart`
Calculează chart-ul natal pentru o naștere.

**Input** (JSON):
```json
{
  "year": 1990,
  "month": 6,
  "day": 15,
  "hour": 14,
  "minute": 30,
  "latitude": 44.43,
  "longitude": 26.10
}
```

Important: ora trebuie să fie deja convertită la **UTC**. Conversia local→UTC e responsabilitatea clientului.

**Output**: object cu `planets`, `angles` (Asc/MC), `houses`, `metadata`.

### `GET /api/cities?q=<query>`
Caută orașe după nume. Folosit pentru place picker.

**Ex**: `GET /api/cities?q=ones` → returnează cele 2 Onești (Bacău + Vrancea).

## Local development

```bash
npm install
npm run dev
# Server: http://localhost:3001
```

Test:
```bash
curl http://localhost:3001/api/health
curl 'http://localhost:3001/api/cities?q=cluj'
curl -X POST http://localhost:3001/api/chart \
  -H 'Content-Type: application/json' \
  -d '{"year":1990,"month":6,"day":15,"hour":14,"minute":30,"latitude":44.43,"longitude":26.10}'
```

## Deploy pe Vercel

1. Push repo la GitHub
2. Vercel.com → New Project → Import GitHub repo
3. Build settings: lăsa default (Vercel detectează api/* automat)
4. Deploy → URL: `https://numerolog-api.vercel.app`

Free tier suficient: 100k function invocations/lună + 100GB bandwidth.

## Note tehnice

### House system
Folosit: **Equal Houses** (cel mai simplu). Casele 1 = ASC, fiecare următoare = +30°.

Pentru Placidus (mai precis), trebuie calcule iterative pentru cuspurile 11, 12, 2, 3 — TODO viitor.

### Precizie
`astronomy-engine` are precizie ~0.1 arc-secondă. Suficient pentru orice chart natal.
Diferența față de Swiss Ephemeris (~0.001 arc-secondă) e imperceptibilă pentru utilizatori.

### Timezone handling
Server-ul nu cunoaște timezone-uri (ar necesita TZ database mare). Clientul trebuie să convertească ora locală la UTC înainte de request:

```js
// Client-side, JS:
const localDate = new Date(year, month-1, day, hour, minute);
const utcHour = localDate.getUTCHours();
const utcMinute = localDate.getUTCMinutes();
```

## License

MIT — copyright 2026 LSC Consulting SRL
