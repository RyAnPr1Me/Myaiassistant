// pages/api/ai.js
import { getAIResponse } from '../../lib/apiAdapter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { query, model, userApiKey } = req.body;
    if (!query || !model) {
      return res.status(400).json({ error: 'Missing query or model parameter.' });
    }
    const responseText = await getAIResponse(query, model, userApiKey);
    return res.status(200).json({ response: responseText });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
