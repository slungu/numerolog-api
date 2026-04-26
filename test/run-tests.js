/**
 * Test rapid pentru calcule astrologice.
 *
 * Folosesc date naștere cunoscute pentru a verifica rezultatele
 * față de calculatoare astrologice publice (astro.com etc.).
 *
 * Caz test 1: 1 ianuarie 2000, 12:00 UTC, București (44.43°N, 26.10°E)
 *   Așteptat (de pe astro.com):
 *     Sun: ~10° Capricorn (280° longitudine ecliptică)
 *     Moon: variabilă, dar undeva în zodii
 *     Asc/MC: depind exact de oră
 */

import { calculateChart } from '../lib/astrology.js';

console.log('='.repeat(60));
console.log('TEST 1: 1 ianuarie 2000, 12:00 UTC, București');
console.log('='.repeat(60));

const chart1 = calculateChart({
  year: 2000,
  month: 1,
  day: 1,
  hour: 12,
  minute: 0,
  latitude: 44.43,
  longitude: 26.10,
});

console.log('\nPlanete:');
for (const [name, p] of Object.entries(chart1.planets)) {
  console.log(`  ${p.label.padEnd(10)} ${p.signSymbol} ${p.degree}°${String(p.minute).padStart(2, '0')}' ${p.sign} (casa ${p.house})`);
}

console.log('\nUnghiuri:');
console.log(`  Asc: ${chart1.angles.ascendant.signSymbol} ${chart1.angles.ascendant.degree}°${String(chart1.angles.ascendant.minute).padStart(2, '0')}' ${chart1.angles.ascendant.sign}`);
console.log(`  MC:  ${chart1.angles.mc.signSymbol} ${chart1.angles.mc.degree}°${String(chart1.angles.mc.minute).padStart(2, '0')}' ${chart1.angles.mc.sign}`);

// Verificări
const sunInCapricorn = chart1.planets.sun.sign === 'Capricorn';
console.log(`\n✓ Soare în Capricorn (așteptat): ${sunInCapricorn ? 'DA' : 'NU - PROBLEMĂ'}`);

console.log('\n' + '='.repeat(60));
console.log('TEST 2: data nașterii Sebastian (exemplu)');
console.log('='.repeat(60));

// Înlocuiește cu data ta reală pentru verificare manuală
const chart2 = calculateChart({
  year: 1990,
  month: 6,
  day: 15,
  hour: 14,
  minute: 30,
  latitude: 44.43,
  longitude: 26.10,
});

console.log('\nPlanete:');
for (const [name, p] of Object.entries(chart2.planets)) {
  console.log(`  ${p.label.padEnd(10)} ${p.signSymbol} ${p.degree}°${String(p.minute).padStart(2, '0')}' ${p.sign} (casa ${p.house})`);
}

console.log('\nUnghiuri:');
console.log(`  Asc: ${chart2.angles.ascendant.signSymbol} ${chart2.angles.ascendant.degree}°${String(chart2.angles.ascendant.minute).padStart(2, '0')}' ${chart2.angles.ascendant.sign}`);
console.log(`  MC:  ${chart2.angles.mc.signSymbol} ${chart2.angles.mc.degree}°${String(chart2.angles.mc.minute).padStart(2, '0')}' ${chart2.angles.mc.sign}`);

console.log('\n' + '='.repeat(60));
console.log('TEST 3: JSON complet pentru un chart');
console.log('='.repeat(60));
console.log(JSON.stringify(chart2, null, 2).slice(0, 1500) + '...');
