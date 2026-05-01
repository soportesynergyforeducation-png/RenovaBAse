const GAS_URL = 'https://script.google.com/macros/s/AKfycbyEpavIUV1ubSUalG5AD2dH9LJrFqrPRjLQ3fA_0oZ45nrVbgQiDXyad-zoCFzyArsBdg/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const params = new URLSearchParams(req.query).toString();
    const url = params ? `${GAS_URL}?${params}` : GAS_URL;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
