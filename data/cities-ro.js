/**
 * Listă pre-built orașe România cu coordonate și timezone.
 *
 * Sursa: GeoNames (open data, atribuit prin acest comentariu).
 * Format: { name, county (judet), country, lat, lng, timezone }
 *
 * Pentru extindere: poți adăuga manual sau importa GeoNames RO complet (~16k entries).
 * Pentru MVP, ~40 orașe principale acoperă 90% din populație.
 */

export const CITIES_RO = [
  // Mari orașe
  { name: 'București', county: 'București', country: 'România', lat: 44.4268, lng: 26.1025, tz: 'Europe/Bucharest' },
  { name: 'Cluj-Napoca', county: 'Cluj', country: 'România', lat: 46.7712, lng: 23.6236, tz: 'Europe/Bucharest' },
  { name: 'Timișoara', county: 'Timiș', country: 'România', lat: 45.7489, lng: 21.2087, tz: 'Europe/Bucharest' },
  { name: 'Iași', county: 'Iași', country: 'România', lat: 47.1585, lng: 27.6014, tz: 'Europe/Bucharest' },
  { name: 'Constanța', county: 'Constanța', country: 'România', lat: 44.1598, lng: 28.6348, tz: 'Europe/Bucharest' },
  { name: 'Craiova', county: 'Dolj', country: 'România', lat: 44.3302, lng: 23.7949, tz: 'Europe/Bucharest' },
  { name: 'Brașov', county: 'Brașov', country: 'România', lat: 45.6427, lng: 25.5887, tz: 'Europe/Bucharest' },
  { name: 'Galați', county: 'Galați', country: 'România', lat: 45.4353, lng: 28.0080, tz: 'Europe/Bucharest' },
  { name: 'Ploiești', county: 'Prahova', country: 'România', lat: 44.9469, lng: 26.0123, tz: 'Europe/Bucharest' },
  { name: 'Oradea', county: 'Bihor', country: 'România', lat: 47.0465, lng: 21.9189, tz: 'Europe/Bucharest' },
  { name: 'Brăila', county: 'Brăila', country: 'România', lat: 45.2692, lng: 27.9574, tz: 'Europe/Bucharest' },
  { name: 'Arad', county: 'Arad', country: 'România', lat: 46.1866, lng: 21.3123, tz: 'Europe/Bucharest' },
  { name: 'Pitești', county: 'Argeș', country: 'România', lat: 44.8565, lng: 24.8692, tz: 'Europe/Bucharest' },
  { name: 'Sibiu', county: 'Sibiu', country: 'România', lat: 45.7983, lng: 24.1255, tz: 'Europe/Bucharest' },
  { name: 'Bacău', county: 'Bacău', country: 'România', lat: 46.5670, lng: 26.9146, tz: 'Europe/Bucharest' },
  { name: 'Târgu Mureș', county: 'Mureș', country: 'România', lat: 46.5455, lng: 24.5625, tz: 'Europe/Bucharest' },
  { name: 'Baia Mare', county: 'Maramureș', country: 'România', lat: 47.6573, lng: 23.5681, tz: 'Europe/Bucharest' },
  { name: 'Buzău', county: 'Buzău', country: 'România', lat: 45.1500, lng: 26.8333, tz: 'Europe/Bucharest' },
  { name: 'Botoșani', county: 'Botoșani', country: 'România', lat: 47.7484, lng: 26.6694, tz: 'Europe/Bucharest' },
  { name: 'Satu Mare', county: 'Satu Mare', country: 'România', lat: 47.7919, lng: 22.8856, tz: 'Europe/Bucharest' },
  { name: 'Râmnicu Vâlcea', county: 'Vâlcea', country: 'România', lat: 45.0997, lng: 24.3692, tz: 'Europe/Bucharest' },
  { name: 'Suceava', county: 'Suceava', country: 'România', lat: 47.6635, lng: 26.2570, tz: 'Europe/Bucharest' },
  { name: 'Drobeta-Turnu Severin', county: 'Mehedinți', country: 'România', lat: 44.6364, lng: 22.6597, tz: 'Europe/Bucharest' },
  { name: 'Piatra Neamț', county: 'Neamț', country: 'România', lat: 46.9276, lng: 26.3819, tz: 'Europe/Bucharest' },
  { name: 'Târgu Jiu', county: 'Gorj', country: 'România', lat: 45.0354, lng: 23.2731, tz: 'Europe/Bucharest' },
  { name: 'Târgoviște', county: 'Dâmbovița', country: 'România', lat: 44.9336, lng: 25.4569, tz: 'Europe/Bucharest' },
  { name: 'Focșani', county: 'Vrancea', country: 'România', lat: 45.6964, lng: 27.1864, tz: 'Europe/Bucharest' },
  { name: 'Bistrița', county: 'Bistrița-Năsăud', country: 'România', lat: 47.1333, lng: 24.5000, tz: 'Europe/Bucharest' },
  { name: 'Tulcea', county: 'Tulcea', country: 'România', lat: 45.1667, lng: 28.8000, tz: 'Europe/Bucharest' },
  { name: 'Reșița', county: 'Caraș-Severin', country: 'România', lat: 45.3019, lng: 21.8889, tz: 'Europe/Bucharest' },
  { name: 'Slatina', county: 'Olt', country: 'România', lat: 44.4324, lng: 24.3686, tz: 'Europe/Bucharest' },
  { name: 'Alba Iulia', county: 'Alba', country: 'România', lat: 46.0667, lng: 23.5833, tz: 'Europe/Bucharest' },
  { name: 'Călărași', county: 'Călărași', country: 'România', lat: 44.2058, lng: 27.3306, tz: 'Europe/Bucharest' },
  { name: 'Giurgiu', county: 'Giurgiu', country: 'România', lat: 43.9000, lng: 25.9667, tz: 'Europe/Bucharest' },
  { name: 'Deva', county: 'Hunedoara', country: 'România', lat: 45.8775, lng: 22.9106, tz: 'Europe/Bucharest' },
  { name: 'Hunedoara', county: 'Hunedoara', country: 'România', lat: 45.7546, lng: 22.9000, tz: 'Europe/Bucharest' },
  { name: 'Zalău', county: 'Sălaj', country: 'România', lat: 47.1900, lng: 23.0567, tz: 'Europe/Bucharest' },
  { name: 'Sfântu Gheorghe', county: 'Covasna', country: 'România', lat: 45.8639, lng: 25.7872, tz: 'Europe/Bucharest' },
  { name: 'Roman', county: 'Neamț', country: 'România', lat: 46.9275, lng: 26.9381, tz: 'Europe/Bucharest' },
  { name: 'Bârlad', county: 'Vaslui', country: 'România', lat: 46.2275, lng: 27.6650, tz: 'Europe/Bucharest' },
  { name: 'Vaslui', county: 'Vaslui', country: 'România', lat: 46.6383, lng: 27.7297, tz: 'Europe/Bucharest' },
  { name: 'Mediaș', county: 'Sibiu', country: 'România', lat: 46.1631, lng: 24.3503, tz: 'Europe/Bucharest' },

  // Onești - cele 3 cu nume similar (relevant pentru caz-ul Sebastian!)
  { name: 'Onești', county: 'Bacău', country: 'România', lat: 46.2486, lng: 26.7575, tz: 'Europe/Bucharest' },
  { name: 'Onești', county: 'Vrancea', country: 'România', lat: 45.9667, lng: 27.0167, tz: 'Europe/Bucharest' },

  // Capitale internaționale relevante (pentru utilizatori născuți în străinătate)
  { name: 'Chișinău', county: '', country: 'Moldova', lat: 47.0105, lng: 28.8638, tz: 'Europe/Chisinau' },
  { name: 'Londra', county: '', country: 'Marea Britanie', lat: 51.5074, lng: -0.1278, tz: 'Europe/London' },
  { name: 'Paris', county: '', country: 'Franța', lat: 48.8566, lng: 2.3522, tz: 'Europe/Paris' },
  { name: 'Roma', county: '', country: 'Italia', lat: 41.9028, lng: 12.4964, tz: 'Europe/Rome' },
  { name: 'Madrid', county: '', country: 'Spania', lat: 40.4168, lng: -3.7038, tz: 'Europe/Madrid' },
  { name: 'Berlin', county: '', country: 'Germania', lat: 52.5200, lng: 13.4050, tz: 'Europe/Berlin' },
  { name: 'Viena', county: '', country: 'Austria', lat: 48.2082, lng: 16.3738, tz: 'Europe/Vienna' },
  { name: 'New York', county: '', country: 'SUA', lat: 40.7128, lng: -74.0060, tz: 'America/New_York' },
  { name: 'Los Angeles', county: '', country: 'SUA', lat: 34.0522, lng: -118.2437, tz: 'America/Los_Angeles' },
];

/**
 * Search fuzzy după nume. Return up to 10 results sorted by relevance.
 */
export function searchCities(query) {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase().trim();
  // Normalize diacritice: ă→a, ș→s, ț→t, etc.
  const qNorm = q
    .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
    .replace(/ș/g, 's').replace(/ț/g, 't');

  const matches = [];
  for (const city of CITIES_RO) {
    const nameNorm = city.name.toLowerCase()
      .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
      .replace(/ș/g, 's').replace(/ț/g, 't');
    const countyNorm = (city.county || '').toLowerCase()
      .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
      .replace(/ș/g, 's').replace(/ț/g, 't');

    let score = 0;
    if (nameNorm === qNorm) score = 100;
    else if (nameNorm.startsWith(qNorm)) score = 80;
    else if (nameNorm.includes(qNorm)) score = 50;
    else if (countyNorm.includes(qNorm)) score = 20;

    if (score > 0) {
      matches.push({ ...city, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, 10).map(({ score, ...city }) => city);
}
