# Daily Dashboard — live prototype

This is the first live-data build of the dashboard concept.

## What is live now

- **Current location:** browser/device Geolocation API.
- **Weather:** Open-Meteo, using the device coordinates. Weather cache is 10 minutes.
- **Sky calculations:** Astronomy Engine runs locally in the browser; sunrise/sunset/moonrise/moonset also come from the live weather response.
- **Commute:** Mapbox `driving-traffic` when you add your own Mapbox **public** access token. It uses current + typical traffic, route geometry, incidents and closures.
- **Map:** MapLibre GL JS with the OpenFreeMap Liberty basemap. Tap a live route card to open the map.
- **Pollen:** optional Google Pollen API key. Google reports UPI (0–5), not grain counts, so this build never invents a grains/m³ value.

The Feeds/Reddit page is still a prototype shell; it is not connected to live feed sources in this package yet.

## Quick start on Windows

1. Clone or download this repository.
2. Double-click `start_local.bat`.
3. Your browser opens `http://localhost:8080`.
4. Allow location access.
5. Open the gear icon.
6. Paste a Mapbox **public** token (`pk...`) for traffic.
7. Enter the Westover and TRP destination addresses once. They are stored only in that browser and are not included in the app source.
8. While you are at home, press **Set home = current location** once. The app stores only coordinates locally; it never displays your home address.

`localhost` counts as a secure context in modern browsers, so browser geolocation works there. Opening `index.html` directly with `file://` is not recommended.

## Phone / home-screen shortcut

Host this folder on an HTTPS static host (GitHub Pages, Cloudflare Pages, Netlify, etc.), then open it on the phone and use **Add to Home Screen / Install App**. The included manifest and service worker make it installable as a PWA.

A true native iOS/Android home-screen widget is a separate phase; this package is the PWA/shortcut version.

## API setup

### Mapbox

Use a browser/public token, not a secret server token. Restrict the token to the domain where you host the dashboard when possible. The token is stored only in this browser's `localStorage`.

The app uses:
- Mapbox Geocoding v6 for the two work destinations.
- Mapbox Directions v5 with the `driving-traffic` profile.
- `duration_typical` for the normal-time comparison.
- route incidents / closures when returned by Mapbox.

### Google Pollen (optional)

If you add a Google Pollen API key, the Weather-at-a-Glance pollen tile shows the highest current pollen type on Google's 0–5 UPI scale. This requires Google Maps Platform billing. Leave the field blank if you do not want it.

## Privacy

- Live coordinates are sent only to the weather/traffic/pollen providers needed for the requested data.
- Home is stored as coordinates in this device's `localStorage`.
- The UI never prints your home address.
- Work destination addresses are entered at setup and stored locally; only **Westover Hills** and **TRP** are shown in the dashboard.
- API keys are stored in localStorage; do not use server-secret credentials in this front-end prototype.

## Files

- `index.html` — UI shell
- `styles.css` — dashboard styling + weather animations
- `app.js` — live data, caching, routing, maps, astronomy and adaptive pulse logic
- `manifest.webmanifest` — installable PWA metadata
- `sw.js` — app-shell offline cache
- `start_local.bat` — simple Windows localhost launcher

## Refresh behavior

- Weather: 10-minute cache.
- Pollen: 60-minute cache.
- Traffic routes: 2-minute cache while relevant.
- Location: 30-minute cached position unless manually refreshed.
- Feed design target: freshness check at 10 minutes, background refresh around 15 minutes, 24-hour dedupe history. Live feed wiring is still pending.
