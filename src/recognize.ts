import { VercelRequest, VercelResponse } from '@vercel/node';
import { Shazam, s16LEToSamplesArray } from '../src/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const shazam = new Shazam();
    // Assuming you send raw PCM data in the request body
    const samples = s16LEToSamplesArray(req.body); 
    const songData = await shazam.recognizeSong(samples);
    
    return res.status(200).json(songData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to recognize song' });
  }
}
