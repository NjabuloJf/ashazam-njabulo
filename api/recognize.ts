import { VercelRequest, VercelResponse } from '@vercel/node';
import { Shazam, s16LEToSamplesArray } from '../src/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const shazam = new Shazam();
    
    // Assuming the request body is raw PCM data (Buffer)
    const samples = s16LEToSamplesArray(req.body);
    const songData = await shazam.recognizeSong(samples);
    
    return res.status(200).json(songData);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to recognize song' });
  }
}
