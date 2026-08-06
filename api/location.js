const { connectToDatabase } = require('./db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { latitude, longitude, accuracy, timestamp } = req.body;

  if (latitude == null || longitude == null) {
    return res.status(400).json({ error: 'latitude and longitude required' });
  }

  const { db } = await connectToDatabase();
  
  const entry = {
    type: 'location',
    latitude,
    longitude,
    accuracy,
    timestamp,
    receivedAt: new Date().toISOString()
  };

  await db.collection('data').insertOne(entry);

  return res.status(200).json({ ok: true });
};
