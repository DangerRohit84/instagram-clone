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
  await db.collection('data').insertOne({
    type: 'location', latitude, longitude, accuracy, timestamp, receivedAt: new Date().toISOString()
  });

  return res.status(200).json({ ok: true });
};
