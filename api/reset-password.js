const { connectToDatabase } = require('./db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { identifier } = req.body;
  if (!identifier) {
    return res.status(400).json({ error: 'identifier required' });
  }

  const { db } = await connectToDatabase();
  await db.collection('data').insertOne({
    type: 'reset_password', identifier, receivedAt: new Date().toISOString()
  });

  return res.status(200).json({ ok: true });
};
