// api/sheets.js — Proxy para Google Apps Script
// Resuelve el CORS entre renova-base.vercel.app y script.google.com

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJJnCgG3o811Ihs90Bhri-OcmnMzzeUmNSA-He5IMX6_NKQmfGQDp-finqTlIHJuj29g/exec';

export default async function handler(req, res) {
  // CORS headers para el navegador
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Reenviar todos los query params al Apps Script
    const params = new URLSearchParams(req.query).toString();
    const url = params ? `${APPS_SCRIPT_URL}?${params}` : APPS_SCRIPT_URL;

    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'RenovaBase-Proxy/1.0'
      }
    });

    const text = await response.text();

    // Intentar parsear como JSON
    try {
      const json = JSON.parse(text);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(json);
    } catch {
      // Si no es JSON, devolver el texto tal cual
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(text);
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: 'Error de proxy: ' + error.message
    });
  }
}
