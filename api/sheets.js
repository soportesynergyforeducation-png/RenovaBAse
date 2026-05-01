// api/sheets.js — Proxy RenovaBase → Google Apps Script
// Evita CORS al hacer la petición servidor-a-servidor desde Vercel

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEpavIUV1ubSUalG5AD2dH9LJrFqrPRjLQ3fA_0oZ45nrVbgQiDXyad-zoCFzyArsBdg/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const params = new URLSearchParams(req.query).toString();
    const url = params ? `${SCRIPT_URL}?${params}` : SCRIPT_URL;

    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'RenovaBase/1.0' }
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(json);
    } catch {
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(text);
    }
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Proxy error: ' + error.message });
  }
}
