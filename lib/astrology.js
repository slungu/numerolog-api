/**
 * Calcule astrologice folosind astronomy-engine.
 * Pure JS, fără dependențe native.
 *
 * Output: poziții planete + Asc/MC + 12 case + semne zodiacale.
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Astronomy = require('astronomy-engine');
const { Body, GeoVector, Ecliptic, SiderealTime } = Astronomy;

export const SIGNS = [
  'Berbec', 'Taur', 'Gemeni', 'Rac', 'Leu', 'Fecioară',
  'Balanță', 'Scorpion', 'Săgetător', 'Capricorn', 'Vărsător', 'Pești'
];

export const SIGN_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

const PLANETS = [
  { name: 'sun', body: Body.Sun, label: 'Soare' },
  { name: 'moon', body: Body.Moon, label: 'Lună' },
  { name: 'mercury', body: Body.Mercury, label: 'Mercur' },
  { name: 'venus', body: Body.Venus, label: 'Venus' },
  { name: 'mars', body: Body.Mars, label: 'Marte' },
  { name: 'jupiter', body: Body.Jupiter, label: 'Jupiter' },
  { name: 'saturn', body: Body.Saturn, label: 'Saturn' },
  { name: 'uranus', body: Body.Uranus, label: 'Uranus' },
  { name: 'neptune', body: Body.Neptune, label: 'Neptun' },
  { name: 'pluto', body: Body.Pluto, label: 'Pluto' },
];

function longitudeToSign(longitude) {
  let lon = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(lon / 30);
  const degInSign = lon - signIndex * 30;
  const degree = Math.floor(degInSign);
  const minute = Math.floor((degInSign - degree) * 60);
  return {
    sign: SIGNS[signIndex],
    signSymbol: SIGN_SYMBOLS[signIndex],
    signIndex,
    degree,
    minute,
    longitude: parseFloat(lon.toFixed(4)),
  };
}

function planetEclipticLongitude(body, date) {
  const vec = GeoVector(body, date, true);
  const ecl = Ecliptic(vec);
  return ecl.elon;
}

function calculateAngles(date, latitude, longitude) {
  const gst = SiderealTime(date);
  let lst = gst + longitude / 15;
  lst = ((lst % 24) + 24) % 24;
  const ramc = lst * 15;

  const T = (date.getTime() / 86400000 - 10957.5) / 36525;
  const obliquity = 23.43929 - 0.01300 * T;

  const rad = Math.PI / 180;
  const obliqRad = obliquity * rad;
  const latRad = latitude * rad;
  const ramcRad = ramc * rad;

  let mcLon = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(obliqRad)) / rad;
  mcLon = ((mcLon % 360) + 360) % 360;

  let ascLon = Math.atan2(
    -Math.cos(ramcRad),
    Math.sin(ramcRad) * Math.cos(obliqRad) + Math.tan(latRad) * Math.sin(obliqRad)
  ) / rad;
  ascLon = ((ascLon % 360) + 360) % 360;

  return {
    ascendant: ascLon,
    mc: mcLon,
    ramc,
    obliquity,
    lst,
  };
}

function calculateHouses(ascendant, mc) {
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const cusp = (ascendant + i * 30) % 360;
    houses.push({
      house: i + 1,
      ...longitudeToSign(cusp),
    });
  }
  return houses;
}

function planetInHouse(planetLon, ascendant) {
  let diff = (planetLon - ascendant + 360) % 360;
  return Math.floor(diff / 30) + 1;
}

export function calculateChart({ year, month, day, hour, minute, latitude, longitude }) {
  const utDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

  const planets = {};
  for (const p of PLANETS) {
    const lon = planetEclipticLongitude(p.body, utDate);
    const sign = longitudeToSign(lon);
    planets[p.name] = {
      label: p.label,
      ...sign,
    };
  }

  const angles = calculateAngles(utDate, latitude, longitude);
  const ascSign = longitudeToSign(angles.ascendant);
  const mcSign = longitudeToSign(angles.mc);

  for (const name of Object.keys(planets)) {
    planets[name].house = planetInHouse(planets[name].longitude, angles.ascendant);
  }

  const houses = calculateHouses(angles.ascendant, angles.mc);

  return {
    input: {
      datetime: utDate.toISOString(),
      latitude,
      longitude,
    },
    angles: {
      ascendant: { ...ascSign, label: 'Ascendent' },
      mc: { ...mcSign, label: 'MC (Mediu Cer)' },
    },
    planets,
    houses,
    metadata: {
      houseSystem: 'equal',
      ephemeris: 'astronomy-engine',
      version: '1.0.0',
    },
  };
}
